from django.db import models

from escultor.models import Escultor
from evento.models import Evento

class Escultura(models.Model):
    id = models.AutoField(primary_key=True)
    escultor = models.ForeignKey(Escultor, on_delete=models.CASCADE, related_name="esculturas")
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE, related_name="esculturas")
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(null=True, blank=True)
    tematica = models.CharField(max_length=255)
    fecha_creacion = models.DateField()

    def __str__(self):
        return f"{self.titulo} - {self.escultor.nombre}"


class ImagenEscultura(models.Model):
    ETAPAS_CHOICES = [
        ('antes', 'Antes del evento'),
        ('durante', 'Durante el evento'),
        ('despues', 'Después del evento'),
    ]

    id = models.AutoField(primary_key=True)
    escultura = models.ForeignKey(Escultura, on_delete=models.CASCADE, related_name="imagenes")
    imagen = models.ImageField(upload_to="esculturas/") 
    etapa = models.CharField(max_length=10, choices=ETAPAS_CHOICES)
    descripcion = models.TextField(null=True, blank=True)
    fecha_subida = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Imagen de {self.escultura.titulo} ({self.etapa})"