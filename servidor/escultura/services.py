from .repositories import EsculturaRepository, ImagenRepository
from escultor.services import EscultorService

class EsculturaService:
    @staticmethod
    def obtener_todos():
        return EsculturaRepository.obtener_todos()

    @staticmethod
    def obtener_por_id(escultura_id):
        return EsculturaRepository.obtener_por_id(escultura_id)

    @staticmethod
    def crear_escultura(data):
        #Controlar que el escultor esté registrado en el evento
        escultor = data['escultor']
        escultores_del_evento = EscultorService.obtener_por_evento(data['evento'].id)
        # Verificar si el escultor está en la lista de escultores del evento
        if escultor not in escultores_del_evento:
            return None  # Retorna None si el escultor no está en los escultores del evento
        
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
    
    @staticmethod
    def obtener_por_evento(evento_id):
        return EsculturaRepository.obtener_por_evento(evento_id=evento_id)

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