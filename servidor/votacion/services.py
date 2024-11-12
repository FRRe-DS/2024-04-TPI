from django.utils import timezone
from .models import Votacion, Escultura

class VotacionService:
    @staticmethod
    def crear_votacion(escultura_id, visitante, puntaje):
        # Verificar que la escultura existe y está en un evento
        escultura = Escultura.objects.filter(id=escultura_id).first()
        if not escultura:
            raise ValueError("Escultura no encontrada.")

        evento = escultura.evento
        if not evento:
            raise ValueError("La escultura no está asociada a ningún evento.")

        # Verificar que el evento está activo
        fecha_actual = timezone.now().date()
        if not (evento.fecha_inicio <= fecha_actual <= evento.fecha_fin):
            raise ValueError("La escultura no está en un evento activo en esta fecha.")

        # Verificar que el visitante no haya votado antes esta escultura
        if Votacion.objects.filter(escultura=escultura, visitante=visitante).exists():
            raise ValueError("El visitante ya ha votado por esta escultura.")

        # Crear Votacion
        return Votacion.objects.create(escultura=escultura, visitante=visitante, puntaje=puntaje)