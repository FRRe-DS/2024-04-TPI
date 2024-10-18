from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .services import EsculturaService, ImagenService
from .serializers import EsculturaSerializer, ImagenEsculturaSerializer

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
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            escultura = EsculturaService.crear_escultura(serializer.validated_data)
            return Response(
                {"message": "Escultura creada exitosamente",
                 "data": EsculturaSerializer(escultura).data},
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
        
        serializer = self.get_serializer(escultura, data=request.data, partial=True)
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

    @action(detail=False, methods=['get'], url_path='escultor/(?P<escultor_id>[^/.]+)')
    def listar_esculturas_por_escultor(self, request, escultor_id=None):
        """ Obtener todas las esculturas asociadas a un escultor específico."""
        try:
            escultor_id = int(escultor_id)
            esculturas = EsculturaService.obtener_por_escultor(escultor_id)

            # Verifica si se encontraron esculturas
            if not esculturas:
                return Response(
                    {"detail": "No se encontraron esculturas para este escultor."},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = EsculturaSerializer(esculturas, many=True)
            return Response(serializer.data)

        except ValueError:
            return Response(
                {"detail": "ID de escultor no válido."},
                status=status.HTTP_400_BAD_REQUEST
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