from .repositories import EscultorRepository

class EscultorService:
    @staticmethod
    def crear_escultor(nombre, nacionalidad, fecha_nacimiento):
        return EscultorRepository.crear_escultor(nombre, nacionalidad, fecha_nacimiento)

    @staticmethod
    def obtener_todos():
        return EscultorRepository.obtener_todos()