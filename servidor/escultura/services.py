from .repositories import EsculturaRepository, ImagenRepository

class EsculturaService:
    @staticmethod
    def obtener_todos():
        return EsculturaRepository.obtener_todos()

    @staticmethod
    def obtener_por_id(escultura_id):
        return EsculturaRepository.obtener_por_id(escultura_id)

    @staticmethod
    def crear_escultura(data):
        return EsculturaRepository.crear_escultura(data)

    @staticmethod
    def actualizar_escultura(escultura_id, data):
        escultura = EsculturaRepository.obtener_por_id(escultura_id)
        if escultura:
            return EsculturaRepository.actualizar_escultura(escultura, data)
        return None

    @staticmethod
    def eliminar_escultura(escultura_id):
        escultura = EsculturaRepository.obtener_por_id(escultura_id)
        if escultura:
            EsculturaRepository.eliminar_escultura(escultura)
            return True
        return False
    
    @staticmethod
    def obtener_por_escultor(escultor_id):
        return EsculturaRepository.obtener_por_escultor(escultor_id=escultor_id)

class ImagenService:
    @staticmethod
    def obtener_todos():
        return ImagenRepository.obtener_todos()

    @staticmethod
    def obtener_por_id(imagen_id):
        return ImagenRepository.obtener_por_id(imagen_id)

    @staticmethod
    def obtener_por_escultura(escultura_id):
        return ImagenRepository.obtener_por_escultura(escultura_id)

    @staticmethod
    def crear_imagen(data):
        return ImagenRepository.crear_imagen(data)

    @staticmethod
    def actualizar_imagen(imagen_id, data):
        imagen = ImagenRepository.obtener_por_id(imagen_id)
        if imagen:
            return ImagenRepository.actualizar_imagen(imagen, data)
        return None

    @staticmethod
    def eliminar_imagen(imagen_id):
        imagen = ImagenRepository.obtener_por_id(imagen_id)
        if imagen:
            ImagenRepository.eliminar_imagen(imagen)
            return True
        return False