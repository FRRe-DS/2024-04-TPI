import os
import django
from django.conf import settings
from random import randint
from datetime import date, timedelta
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'servidor.settings')
django.setup()

from escultor.models import Escultor
from escultura.models import Escultura, ImagenEscultura
from evento.models import Evento
from visitante.models import Visitante
from votacion.models import Votacion

def create_escultores():
    escultores = [
        {"nombre": "Ana Perez", "nacionalidad": "Argentina", "biografia": "Escultora reconocida", "fecha_nacimiento": date(1975, 4, 12)},
        {"nombre": "Carlos Gomez", "nacionalidad": "Colombiano", "biografia": "Artista del mármol", "fecha_nacimiento": date(1980, 9, 23)},
    ]
    for data in escultores:
        Escultor.objects.create(**data)
    print("Escultores creados.")

def create_eventos():
    eventos = [
        {"titulo": "Bienal de Escultura 2024", "descripcion": "Evento anual de escultores", "fecha_inicio": date.today(), "fecha_fin": date.today() + timedelta(days=30), "lugar": "Centro Cultural", "tematica": "Abstracto"},
        {"titulo": "Festival de Arte Urbano", "descripcion": "Esculturas en espacio público", "fecha_inicio": date.today() + timedelta(days=30), "fecha_fin":date.today() + timedelta(days=60), "lugar": "Plaza Central", "tematica": "Moderno"},
    ]
    for data in eventos:
        Evento.objects.create(**data)
    print("Eventos creados.")

def create_esculturas():
    escultor1 = Escultor.objects.first()
    evento1 = Evento.objects.first()
    esculturas = [
        {"escultor": escultor1, "evento": evento1, "titulo": "El Pensador", "descripcion": "Escultura de bronce", "tematica": "Reflexión", "fecha_creacion": date(2020, 5, 10)},
        {"escultor": escultor1, "evento": evento1, "titulo": "La Libertad", "descripcion": "Simboliza la libertad", "tematica": "Política", "fecha_creacion": date(2021, 6, 15)},
    ]
    for data in esculturas:
        Escultura.objects.create(**data)
    print("Esculturas creadas.")

def create_visitantes():
    visitantes = [
        {"username": "visitante1", "email": "visitante1@example.com", "is_admin": False},
        {"username": "visitante2", "email": "visitante2@example.com", "is_admin": False},
    ]
    for data in visitantes:
        Visitante.objects.create_user(**data, password="password123")
    print("Visitantes creados.")

def create_votaciones():
    visitante1 = Visitante.objects.first()
    escultura1 = Escultura.objects.first()
    votaciones = [
        {"escultura": escultura1, "visitante": visitante1, "puntaje": randint(1, 5)},
        {"escultura": escultura1, "visitante": Visitante.objects.last(), "puntaje": randint(1, 5)},
    ]
    for data in votaciones:
        Votacion.objects.create(**data)
    print("Votaciones creadas.")

def create_imagenes_esculturas():
    # Obtén una escultura para asociarla
    escultura = Escultura.objects.first()
    if not escultura:
        print("No hay esculturas disponibles.")
        return

    # Definimos las imágenes con sus datos iniciales
    imagenes = [
        {"escultura": escultura, "etapa": "antes", "descripcion": "Preparación de la escultura"},
        {"escultura": escultura, "etapa": "durante", "descripcion": "Exposición en evento"},
    ]

    # Ruta de la imagen de origen
    ruta_imagen = os.path.join(settings.BASE_DIR, 'media', 'esculturas', 'escultura.jpg')
    
    # Verificar si la imagen existe en la ruta especificada
    if not os.path.exists(ruta_imagen):
        print(f"La imagen no existe en la ruta: {ruta_imagen}")
        return

    try:
        for data in imagenes:
            # Abre la imagen, conviértela a WEBP y guárdala en memoria
            with open(ruta_imagen, 'rb') as img_file:
                # Se crea la instancia del modelo sin guardar aún
                imagen = ImagenEscultura(**data)
                
                # Asignar la imagen al campo `imagen` del modelo
                imagen.imagen = ContentFile(img_file.read(), name=os.path.basename(img_file.name))
                
                # Llamar al `save` para que se ejecute la lógica de conversión a webp
                imagen.save()

        print("Imágenes de esculturas creadas exitosamente.")

    except Exception as e:
        print("Error al crear imágenes de esculturas:", e)

def populate():
    create_escultores()
    create_eventos()
    create_esculturas()
    create_visitantes()
    create_votaciones()
    create_imagenes_esculturas()
    print("Datos iniciales cargados exitosamente.")

if __name__ == "__main__":
    populate()