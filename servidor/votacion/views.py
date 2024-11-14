from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from visitante.models import Visitante
from .models import Votacion
from .serializers import VotacionSerializer

class VotacionesPorVisitante(APIView):
    
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Usuario no autenticado"}, status=401)
        try:
            visitante = request.user
            votaciones = Votacion.objects.filter(visitante=visitante).select_related('escultura')
            serializer = VotacionSerializer(votaciones, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Visitante.DoesNotExist:
                # Si el alumno no existe, devolver un error personalizado
                return Response(
                    {"error": "Alumno no encontrado"},
                    status=status.HTTP_404_NOT_FOUND
                )