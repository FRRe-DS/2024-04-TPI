from rest_framework import serializers
from .models import Visitante
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Visitante
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        visitante = Visitante.objects.create_user(**validated_data)
        return visitante

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        print("es admin?:", user.is_admin)  # Verifica si el usuario tiene grupos
        token = super().get_token(user)
        # Agregar el rol del usuario al token
        token['is_admin'] = user.is_admin
        return token