from rest_framework import serializers
from .models import Escultor

class EscultorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultor
        fields = '__all__'