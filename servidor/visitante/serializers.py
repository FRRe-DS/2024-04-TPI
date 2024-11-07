from rest_framework import serializers
from .models import Visitante

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Visitante
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        visitante = Visitante.objects.create_user(**validated_data)
        return visitante