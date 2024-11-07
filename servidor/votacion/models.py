from django.db import models
from escultura.models import Escultura
from visitante.models import Visitante

class Votacion(models.Model):
    escultura = models.ForeignKey(Escultura, on_delete=models.CASCADE, related_name="votos")
    visitante = models.ForeignKey(Visitante, on_delete=models.CASCADE, related_name="votos")
    puntaje = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # Valor entre 1 y 5

    class Meta:
        unique_together = ('escultura', 'visitante_id')  # Un visitante solo puede votar una vez por cada escultura

    def __str__(self):
        return f"Voto de {self.visitante.email} en {self.escultura.titulo}: {self.puntaje}"