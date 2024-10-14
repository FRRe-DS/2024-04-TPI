from .models import Escultura, ImagenEscultura

class EsculturaRepository:
    @staticmethod
    def obtener_todos():
        return Escultura.objects.all()

    @staticmethod
    def obtener_por_id(escultura_id):
        return Escultura.objects.filter(id=escultura_id).first()

    @staticmethod
    def crear_escultura(data):
        escultura = Escultura(**data)
        escultura.save()
        return escultura

    @staticmethod
    def actualizar_escultura(escultura, data):
        for key, value in data.items():
            setattr(escultura, key, value)
        escultura.save()
        return escultura

    @staticmethod
    def eliminar_escultura(escultura):
        escultura.delete()

    @staticmethod
    def obtener_por_escultor(escultor_id):
        return Escultura.objects.filter(escultor_id=escultor_id)

class ImagenRepository:
    @staticmethod
    def obtener_todos():
        return ImagenEscultura.objects.all()

    @staticmethod
    def obtener_por_id(imagen_id):
        return ImagenEscultura.objects.filter(id=imagen_id).first()

    @staticmethod
    def obtener_por_escultura(escultura_id):
        return ImagenEscultura.objects.filter(escultura_id=escultura_id)

    @staticmethod
    def crear_imagen(data):
        imagen = ImagenEscultura(**data)
        imagen.save()
        return imagen

    @staticmethod
    def actualizar_imagen(imagen, data):
        for key, value in data.items():
            setattr(imagen, key, value)
        imagen.save()
        return imagen

    @staticmethod
    def eliminar_imagen(imagen):
        imagen.delete()