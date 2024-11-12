from rest_framework import serializers
from .models import Evento
from escultura.serializers import EsculturaSerializer

class EventoSerializer(serializers.ModelSerializer):
    esculturas = EsculturaSerializer(many=True, read_only=True)

    class Meta:
        model = Evento
        fields = '__all__'