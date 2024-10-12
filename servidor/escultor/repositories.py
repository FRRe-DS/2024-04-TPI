from .models import Escultor

class EscultorRepository:
    @staticmethod
    def obtener_todos():
        return Escultor.objects.all()

    @staticmethod
    def crear_escultor(nombre, nacionalidad, fecha_nacimiento):
        return Escultor.objects.create(nombre=nombre, nacionalidad=nacionalidad, fecha_nacimiento=fecha_nacimiento)