from .repositories import EscultorRepository

class EscultorService:
    @staticmethod
    def obtener_todos():
        return EscultorRepository.obtener_todos()

    @staticmethod
    def obtener_por_id(id):
        return EscultorRepository.obtener_por_id(id)

    @staticmethod
    def crear_escultor(datos):
        return EscultorRepository.crear_escultor(datos)

    @staticmethod
    def actualizar_escultor(id, datos):
        escultor = EscultorRepository.obtener_por_id(id)
        if not escultor:
            return None
        return EscultorRepository.actualizar_escultor(escultor, datos)

    @staticmethod
    def eliminar_escultor(id):
        escultor = EscultorRepository.obtener_por_id(id)
        if escultor:
            EscultorRepository.eliminar_escultor(escultor)
            return True
        return False
    
    @staticmethod
    def obtener_por_evento(evento_id):
        return EscultorRepository.obtener_por_evento(evento_id=evento_id)