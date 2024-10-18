from django.db import models
from escultor.models import Escultor

class Evento(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    fecha = models.DateField()
    lugar = models.CharField(max_length=255)
    tematica = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.titulo} - {self.fecha}"