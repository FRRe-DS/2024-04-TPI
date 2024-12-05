from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError
from rest_framework.views import APIView
import qrcode
from io import BytesIO
from django.http.response import HttpResponse
from datetime import datetime

from .services import EsculturaService, ImagenService
from .serializers import EsculturaSerializer, ImagenEsculturaSerializer, CrearEsculturaSerializer
from votacion.services import VotacionService
from votacion.serializers import VotacionSerializer

class EsculturaViewSet(viewsets.ModelViewSet):
    serializer_class = EsculturaSerializer

    def get_queryset(self):
        return EsculturaService.obtener_todos()

    def retrieve(self, request, *args, **kwargs):
        escultura = EsculturaService.obtener_por_id(kwargs['pk'])
        if not escultura:
            return Response(
                {"message": "Escultura no encontrada"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(escultura)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = CrearEsculturaSerializer(data=request.data)
        if serializer.is_valid():
            escultura = EsculturaService.crear_escultura(serializer.validated_data)
            return Response(
                {"message": "Escultura creada exitosamente",
                 "data": CrearEsculturaSerializer(escultura).data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al crear escultura", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def update(self, request, *args, **kwargs):
        escultura = EsculturaService.obtener_por_id(kwargs['pk'])
        if not escultura:
            return Response(
                {"message": "Escultura no encontrada"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = CrearEsculturaSerializer(data=request.data)
        if serializer.is_valid():
            escultura_actualizada = EsculturaService.actualizar_escultura(kwargs['pk'], serializer.validated_data)
            return Response(
                {"message": "Escultura actualizada exitosamente",
                 "data": EsculturaSerializer(escultura_actualizada).data}
            )
        return Response(
            {"message": "Error al actualizar escultura", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, *args, **kwargs):
        eliminado = EsculturaService.eliminar_escultura(kwargs['pk'])
        if eliminado:
            return Response(
                {"message": "Escultura eliminada exitosamente"},
                status=status.HTTP_204_NO_CONTENT
            )
        return Response(
            {"message": "Escultura no encontrada"},
            status=status.HTTP_404_NOT_FOUND
        )

    @action(detail=True, methods=['get'], url_path='imagenes')
    def list_imagenes(self, request, pk=None):
        """ Obtener todas las imágenes asociadas a una escultura específica. """
        escultura = EsculturaService.obtener_por_id(pk)
        if escultura is None:
            return Response(
                {"detail": "Escultura no encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        imagenes = ImagenService.obtener_por_escultura(pk)
        serializer = ImagenEsculturaSerializer(imagenes, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='imagenes/nueva')
    def create_imagen(self, request, pk=None):
        """ Crear una nueva imagen asociada a una escultura específica. """
        escultura = EsculturaService.obtener_por_id(pk)
        if escultura is None:
            return Response(
                {"detail": "Escultura no encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ImagenEsculturaSerializer(data=request.data)
        if serializer.is_valid():
            imagen = ImagenService.crear_imagen({**serializer.validated_data, 'escultura': escultura})
            return Response(
                {"message": "Imagen creada exitosamente",
                 "data": ImagenEsculturaSerializer(imagen).data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='votar')
    @permission_classes([IsAuthenticated])  # Requiere autenticación solo en esta acción
    def votar(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "No está autenticado para realizar esta acción."},
                status=status.HTTP_403_FORBIDDEN
            )
        escultura = EsculturaService.obtener_por_id(pk)
        if escultura is None:
            return Response(
                {"detail": "Escultura no encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        puntaje = request.data.get('puntaje')
        if not puntaje:
            return Response(
                {"detail": "Debe proporcionar un puntaje."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            visitante = request.user
            voto = VotacionService.crear_votacion(pk, visitante, puntaje)
            return Response(
                {"detail": "Voto registrado exitosamente.",
                 "data": VotacionSerializer(voto).data},
                status=status.HTTP_201_CREATED
            )
        except ValueError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except IntegrityError:
            return Response(
                {"detail": "Error al intentar registrar el voto."},
                status=status.HTTP_400_BAD_REQUEST
            )

class GenerarQR(APIView):
    def get(self, request, escultura_id):
        if not escultura_id:
            return Response(
                {"error": "Debe proporcionar un ID válido de la escultura."},
                status=status.HTTP_400_BAD_REQUEST
            )

        escultura = EsculturaService.obtener_por_id(escultura_id)

        if not escultura:
            return Response(
                {"error": "Escultura no encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Obtener el minuto actual para incluirlo en la URL
        minuto_actual = datetime.now().strftime("%Y%m%d%H%M")  # Ejemplo: '202412031345' (AAAAmmddHHMM)
        
        # Construcción de la URL para la escultura
        # escultura_url = f"http://localhost:5173/validar/{escultura_id}?timestamp={minuto_actual}"

        escultura_url = f"http://localhost:5173/eventos/{escultura.evento.id}?escultura=${escultura_id}"
        
        # Generación del QR
        qr = qrcode.QRCode(version=1, error_correction=qrcode.ERROR_CORRECT_L, box_size=30, border=2)
        qr.add_data(escultura_url)
        qr.make(fit=True)
        
        img = qr.make_image(fill="black", back_color="white")
        
        # Enviamos la imagen del QR como respuesta
        buffer = BytesIO()
        img.save(buffer, format="PNG", optimize=True)
        buffer.seek(0)

        return HttpResponse(buffer, content_type="image/png", status=status.HTTP_200_OK)