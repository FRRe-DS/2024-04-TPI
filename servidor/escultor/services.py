from .repositories import EscultorRepository

class EscultorService:
    @staticmethod
    def obtener_todos():
        return EscultorRepository.obtener_todos()

    @staticmethod
    def obtener_por_id(id):
        return EscultorRepository.obtener_por_id(id)

    @staticmethod
    def crear(datos):
        return EscultorRepository.crear(datos)

    @staticmethod
    def actualizar(id, datos):
        escultor = EscultorRepository.obtener_por_id(id)
        if not escultor:
            return None
        return EscultorRepository.actualizar(escultor, datos)

    @staticmethod
    def eliminar(id):
        escultor = EscultorRepository.obtener_por_id(id)
        if escultor:
            EscultorRepository.eliminar(escultor)
            return True
        return False