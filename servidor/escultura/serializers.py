from rest_framework import serializers
from .models import Escultura, ImagenEscultura

class EsculturaSerializer(serializers.ModelSerializer):
    promedio_votos = serializers.SerializerMethodField()
    total_votos = serializers.SerializerMethodField()

    class Meta:
        model = Escultura
        fields = '__all__'
        extra_fields = ['promedio_votos', 'total_votos']

    def get_promedio_votos(self, obj):
        return obj.promedio_votos()  # Usa el método del modelo Escultura para obtener el promedio

    def get_total_votos(self, obj):
        return obj.total_votos()  # Usa el método del modelo Escultura para obtener el total de votos

class ImagenEsculturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenEscultura
        fields = ('imagen', 'etapa', 'descripcion', 'fecha_subida')