from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import IntegrityError

from .services import EventoService
from escultura.services import EsculturaService

from .serializers import EventoSerializer
from escultura.serializers import EsculturaSerializer

class EventoViewSet(viewsets.ModelViewSet):
    serializer_class = EventoSerializer

    def get_queryset(self):
        return EventoService.obtener_todos()

    def retrieve(self, request, *args, **kwargs):
        evento = EventoService.obtener_por_id(kwargs['pk'])
        if not evento:
            return Response(
                {"message": "Evento no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(evento)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            evento = EventoService.crear_evento(serializer.validated_data)
            return Response(
                {"message": "Evento creado exitosamente",
                 "data": EventoSerializer(evento).data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al crear evento", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def update(self, request, *args, **kwargs):
        evento = EventoService.obtener_por_id(kwargs['pk'])
        if not evento:
            return Response(
                {"message": "Evento no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(evento, data=request.data, partial=True)
        if serializer.is_valid():
            evento_actualizado = EventoService.actualizar_evento(kwargs['pk'], serializer.validated_data)
            return Response(
                {"message": "Evento actualizado exitosamente",
                 "data": EventoSerializer(evento_actualizado).data}
            )
        return Response(
            {"message": "Error al actualizar evento", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, *args, **kwargs):
        eliminado = EventoService.eliminar_evento(kwargs['pk'])
        if eliminado:
            return Response(
                {"message": "Evento eliminado exitosamente"},
                status=status.HTTP_204_NO_CONTENT
            )
        return Response(
            {"message": "Evento no encontrado"},
            status=status.HTTP_404_NOT_FOUND
        )

    @action(detail=True, methods=['get'], url_path='esculturas')
    def listar_esculturas(self, request, pk=None):
        """ Listar todas las esculturas asociadas a un evento. """
        evento = EventoService.obtener_por_id(pk)
        if not evento:
            return Response(
                {"detail": "Evento no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )

        esculturas = EsculturaService.obtener_por_evento(pk)
        if not esculturas:
            return Response(
                {"detail": "No se encontraron esculturas para este evento."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = EsculturaSerializer(esculturas, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='agregar-escultura')
    def agregar_escultura(self, request, pk=None):
        """ Agregar un escultura a un evento. """
        evento = EventoService.obtener_por_id(pk)
        if not evento:
            return Response(
                {"detail": "Evento no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        escultura_id = request.data.get('escultura_id')
        if not escultura_id:
            return Response(
                {"detail": "Es necesario un id de escultura válido."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            EventoService.agregar_escultura_a_evento(evento, escultura_id)
            return Response(
                {"detail": "Escultura agregada exitosamente al evento."},
                status=status.HTTP_201_CREATED
            )
        except IntegrityError:
            return Response(
                {"detail": "La escultura ya está registrado en este evento."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=["get"], url_path='activos')
    def obtener_activos(self, request, pk=None):
        eventos_activos = EventoService.obtener_activos()
        
        if not eventos_activos:
            return Response(
                {"detail": "No existen eventos activos."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = EventoSerializer(eventos_activos, many=True)
        return Response(serializer.data)