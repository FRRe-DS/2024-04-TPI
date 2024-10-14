from rest_framework import serializers
from .models import Escultura, ImagenEscultura

class EsculturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultura
        fields = '__all__'

class ImagenEsculturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenEscultura
        fields = '__all__'