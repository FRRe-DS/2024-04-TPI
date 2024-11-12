from .repositories import EventoRepository
from escultura.services import EsculturaService

class EventoService:
    @staticmethod
    def obtener_todos():
        """Obtiene todos los eventos registrados."""
        return EventoRepository.obtener_todos()

    @staticmethod
    def obtener_activos():
        """Obtiene todos los eventos activos."""
        return EventoRepository.obtener_activos()

    @staticmethod
    def obtener_por_id(evento_id):
        """Obtiene un evento por su ID."""
        return EventoRepository.obtener_por_id(evento_id)

    @staticmethod
    def crear_evento(data):
        """Crea un nuevo evento con los datos proporcionados."""
        return EventoRepository.crear_evento(data)

    @staticmethod
    def actualizar_evento(evento_id, data):
        """Actualiza los datos de un evento existente."""
        evento = EventoRepository.obtener_por_id(evento_id)
        if evento:
            return EventoRepository.actualizar_evento(evento, data)
        return None

    @staticmethod
    def eliminar_evento(evento_id):
        """Elimina un evento por su ID."""
        evento = EventoRepository.obtener_por_id(evento_id)
        if evento:
            EventoRepository.eliminar_evento(evento)
            return True
        return False
    
    @staticmethod
    def agregar_escultura_a_evento(evento, escultor_id):
        escultura = EsculturaService.obtener_por_id(escultor_id)
        if not escultura:
            raise ValueError("Escultura no encontrada.")
        
        return EventoRepository.agregar_escultura(evento, escultura)