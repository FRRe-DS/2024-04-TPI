from .models import Escultor

class EscultorRepository:
    @staticmethod
    def obtener_todos():
        return Escultor.objects.all()

    @staticmethod
    def obtener_por_id(id):
        return Escultor.objects.filter(id=id).first()

    @staticmethod
    def crear(datos):
        return Escultor.objects.create(**datos)

    @staticmethod
    def actualizar(escultor, datos):
        for key, value in datos.items():
            setattr(escultor, key, value)
        escultor.save()
        return escultor

    @staticmethod
    def eliminar(escultor):
        escultor.delete()