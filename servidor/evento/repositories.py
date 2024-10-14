from .models import Evento, ParticipacionEscultor, ParticipacionEscultura

class EventoRepository:
    @staticmethod
    def obtener_todos():
        """Obtiene todos los eventos registrados."""
        return Evento.objects.all()

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
    def agregar_escultor(evento, escultor):
        participacion = ParticipacionEscultor.objects.create(evento=evento, escultor=escultor)
        return participacion
    
    @staticmethod
    def agregar_escultura(evento, escultura):
        participacion = ParticipacionEscultura.objects.create(evento=evento, escultura=escultura)
        return participacion