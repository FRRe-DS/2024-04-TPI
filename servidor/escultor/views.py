from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response

from .services import EscultorService
from .serializers import EscultorSerializer

class EscultorViewSet(viewsets.ModelViewSet):
    serializer_class = EscultorSerializer

    def get_queryset(self):
        return EscultorService.obtener_todos()

    def retrieve(self, request, *args, **kwargs):
        escultor = EscultorService.obtener_por_id(kwargs['pk'])
        if escultor is None:
            return Response(
                {"message": "Escultor no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(escultor)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            escultor = EscultorService.crear_escultor(serializer.validated_data)
            return Response(
                {"message": "Escultor creado exitosamente",
                "data": self.serializer_class(escultor).data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al crear escultor", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, partial=True)
        if serializer.is_valid():
            escultor = EscultorService.actualizar_escultor(kwargs['pk'], serializer.validated_data)
            if escultor is None:
                return Response(
                    {"message": "Escultor no encontrado"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                {"message": "Escultor actualizado exitosamente", "data": self.serializer_class(escultor).data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Error al actualizar escultor", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, *args, **kwargs):
        eliminado = EscultorService.eliminar_escultor(kwargs['pk'])
        if eliminado:
            return Response(
                {"message": "Escultor eliminado exitosamente"},
                status=status.HTTP_204_NO_CONTENT
            )
        return Response(
            {"message": "Escultor no encontrado"},
            status=status.HTTP_404_NOT_FOUND
        )