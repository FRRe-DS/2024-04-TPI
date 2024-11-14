from django.db import models
from PIL import Image
import os
from io import BytesIO
from django.core.files.base import ContentFile

from escultor.models import Escultor
from evento.models import Evento

class Escultura(models.Model):
    id = models.AutoField(primary_key=True)
    escultor = models.ForeignKey(Escultor, on_delete=models.CASCADE, related_name="esculturas")
    evento = models.ForeignKey(Evento, on_delete=models.SET_NULL, related_name="esculturas", null=True, blank=True)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(null=True, blank=True)
    tematica = models.CharField(max_length=255)
    fecha_creacion = models.DateField()
    def promedio_votos(self):
        total_votos = self.votos.aggregate(models.Avg('puntaje'))['puntaje__avg']
        return total_votos if total_votos else 0

    def total_votos(self):
        return self.votos.count()

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

    def save(self, *args, **kwargs):
        if self.imagen:
            img = Image.open(self.imagen)

            # Redimensionar la imagen
            size = (800, 800)
            img = img.resize(size, Image.LANCZOS)

            # Guardar la imagen temporalmente en memoria
            img_io = BytesIO()

            # Convertir la imagen a formato WebP solo si no es ya WebP
            if img.format != "WEBP":
                img.save(img_io, format="WEBP", quality=85)
                self.imagen.save(
                    f"{os.path.splitext(self.imagen.name)[0]}.webp",
                    ContentFile(img_io.getvalue()),
                    save=False
                )
            else:
                # Si ya es WebP, guardar la imagen redimensionada en el formato original
                img.save(img_io, format="WEBP", quality=85)
                self.imagen.save(
                    self.imagen.name,
                    ContentFile(img_io.getvalue()),
                    save=False
                )

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Imagen de {self.escultura.titulo} ({self.etapa})"