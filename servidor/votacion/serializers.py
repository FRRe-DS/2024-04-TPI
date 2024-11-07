from rest_framework import serializers
from .models import Votacion

class VotacionSerializer(serializers.ModelSerializer):
    puntaje = serializers.IntegerField(min_value=1, max_value=5)

    class Meta:
        model = Votacion
        fields = ['escultura', 'visitante', 'puntaje']
        extra_kwargs = {'visitante': {'read_only': True}}  # Se establecerá automáticamente desde la solicitud