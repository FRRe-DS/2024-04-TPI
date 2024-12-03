import os
import django
import json
from django.conf import settings
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'servidor.settings')
django.setup()

from escultor.models import Escultor
from escultura.models import Escultura, ImagenEscultura
from evento.models import Evento
from visitante.models import Visitante
from votacion.models import Votacion

def cargar_datos_json(archivo):
    """Carga datos desde un archivo JSON."""
    ruta = os.path.join(settings.BASE_DIR, 'datos', archivo)
    if not os.path.exists(ruta):
        print(f"No se encontró el archivo: {archivo}")
        return []
    with open(ruta, 'r', encoding='utf-8') as f:
        return json.load(f)

def create_escultores():
    escultores = cargar_datos_json('escultores.json')
    for data in escultores:
        Escultor.objects.create(**data)
    print("Escultores creados.")

def create_eventos():
    eventos = cargar_datos_json('eventos.json')
    for data in eventos:
        Evento.objects.create(**data)
    print("Eventos creados.")

def create_esculturas():
    esculturas = cargar_datos_json('esculturas.json')
    for data in esculturas:
        escultor = Escultor.objects.get(id=data['escultor'])
        evento = Evento.objects.get(id=data['evento'])
        data['escultor'] = escultor
        data['evento'] = evento
        Escultura.objects.create(**data)
    print("Esculturas creadas.")

def create_visitantes():
    visitantes = cargar_datos_json('visitantes.json')
    for data in visitantes:
        Visitante.objects.create_user(**data, password="password123")
    print("Visitantes creados.")

def create_votaciones():
    votaciones = cargar_datos_json('votaciones.json')
    for data in votaciones:
        visitante = Visitante.objects.get(id=data['visitante'])
        escultura = Escultura.objects.get(id=data['escultura'])
        data['visitante'] = visitante
        data['escultura'] = escultura
        Votacion.objects.create(**data)
    print("Votaciones creadas.")

def create_imagenes_esculturas():
    imagenes = cargar_datos_json('imagenes_esculturas.json')
    ruta_imagenes = os.path.join(settings.BASE_DIR, 'media', 'esculturas')

    for data in imagenes:
        escultura = Escultura.objects.get(id=data['escultura'])
        data['escultura'] = escultura
        ruta_imagen = os.path.join(ruta_imagenes, data['imagen'])

        if not os.path.exists(ruta_imagen):
            print(f"La imagen no existe en la ruta: {ruta_imagen}")
            continue

        with open(ruta_imagen, 'rb') as img_file:
            imagen = ImagenEscultura(
                escultura=escultura,
                etapa=data['etapa'],
                descripcion=data.get('descripcion', '')
            )
            imagen.imagen = ContentFile(img_file.read(), name=os.path.basename(ruta_imagen))
            imagen.save()
    print("Imágenes de esculturas creadas exitosamente.")

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