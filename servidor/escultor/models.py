from django.db import models

class Escultor(models.Model):
    nombre = models.CharField(max_length=255)
    nacionalidad = models.CharField(max_length=255)
    biografia = models.CharField(max_length=255, null=True, blank=True)
    contacto = models.CharField(max_length=255, null=True, blank=True)
    fecha_nacimiento = models.DateField()

    def __str__(self):
        return self.nombre