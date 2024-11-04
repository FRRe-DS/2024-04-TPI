from rest_framework import viewsets
from .serializers import RegistroSerializer
from .models import Visitante

class RegistroView(viewsets.ModelViewSet):
    """Permite el registro de nuevos visitantes."""
    queryset = Visitante.objects.all()
    serializer_class = RegistroSerializer