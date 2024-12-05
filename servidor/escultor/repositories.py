from .models import Escultor

class EscultorRepository:
    @staticmethod
    def obtener_todos():
        return Escultor.objects.all().order_by('-id')

    @staticmethod
    def obtener_por_id(id):
        return Escultor.objects.filter(id=id).first()

    @staticmethod
    def crear_escultor(datos):
        return Escultor.objects.create(**datos)

    @staticmethod
    def actualizar_escultor(escultor, datos):
        for key, value in datos.items():
            setattr(escultor, key, value)
        escultor.save()
        return escultor

    @staticmethod
    def eliminar_escultor(escultor):
        escultor.delete()

    @staticmethod
    def obtener_por_evento(evento_id):
        return Escultor.objects.filter(participacionescultor__evento_id=evento_id)