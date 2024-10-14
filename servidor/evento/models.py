from django.db import models
from escultor.models import Escultor
from escultura.models import Escultura

class Evento(models.Model):
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    fecha = models.DateField()
    lugar = models.CharField(max_length=255)
    tematica = models.CharField(max_length=100)

    # Relación muchos a muchos con Escultor a través del modelo intermedio ParticipacionEscultor
    escultores = models.ManyToManyField(Escultor, through='ParticipacionEscultor', related_name='eventos_escultores')
    # Relación muchos a muchos con Escultura a través del modelo intermedio ParticipacionEscultura
    esculturas = models.ManyToManyField(Escultura, through='ParticipacionEscultura', related_name='eventos_esculturas')

    def __str__(self):
        return f"{self.titulo} - {self.fecha}"

class ParticipacionEscultor(models.Model):
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    escultor = models.ForeignKey(Escultor, on_delete=models.CASCADE)
    #rol = models.CharField(max_length=100, blank=True, null=True)  # Ej: Organizador, Participante

    def __str__(self):
        return f"{self.escultor} en {self.evento}"
    
    # Esto asegura que un escultor no se registre dos veces en el mismo evento
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['evento', 'escultor'],
                name='unique_escultor_por_evento'
            )
        ]

class ParticipacionEscultura(models.Model):
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    escultura = models.ForeignKey(Escultura, on_delete=models.CASCADE)
    #exposicion = models.BooleanField(default=True)  # Indicador si la escultura estuvo en exposición

    def __str__(self):
        return f"{self.escultura} en {self.evento}"
    
    # Esto asegura que una escultura este registrada en un unico evento
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['escultura'], 
                name='unique_escultura_por_evento'
            )
        ]