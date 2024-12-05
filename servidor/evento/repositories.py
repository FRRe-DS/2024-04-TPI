from django.utils import timezone
from .models import Evento

class EventoRepository:
    @staticmethod
    def obtener_todos():
        """Obtiene todos los eventos registrados."""
        return Evento.objects.all().order_by('-fecha_inicio')
    
    @staticmethod
    def obtener_activos():
        """Obtiene todos los eventos activos."""
        fecha_actual = timezone.now().date()  # Obtener la fecha actual (solo la fecha, sin la hora)
        
        # Filtrar eventos cuyo rango de fechas contenga la fecha actual
        eventos_activos = Evento.objects.filter(
            fecha_inicio__lte=fecha_actual,  # fecha de inicio antes o igual a la fecha actual
            fecha_fin__gte=fecha_actual      # fecha de fin después o igual a la fecha actual
        )
        return eventos_activos

    @staticmethod
    def obtener_por_id(evento_id):
        """Obtiene un evento por su ID."""
        return Evento.objects.filter(id=evento_id).first()

    @staticmethod
    def crear_evento(data):
        """Crea un nuevo evento con los datos proporcionados."""
        return Evento.objects.create(**data)

    @staticmethod
    def actualizar_evento(evento, data):
        """Actualiza un evento con los nuevos datos."""
        for key, value in data.items():
            setattr(evento, key, value)
        evento.save()
        return evento

    @staticmethod
    def eliminar_evento(evento):
        """Elimina el evento proporcionado."""
        evento.delete()

    @staticmethod
    def agregar_escultura(evento, escultura):
        escultura.evento = evento
        escultura.save()
        return escultura