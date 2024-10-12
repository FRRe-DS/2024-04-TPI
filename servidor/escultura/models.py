from django.db import models
from escultor.models import Escultor

class Escultura(models.Model):
    escultor = models.ForeignKey(Escultor, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255)
    estilo = models.CharField(max_length=255)
    descripcion = models.TextField(null=True)
    fecha_creacion = models.DateField()

    def __str__(self):
        return self.titulo