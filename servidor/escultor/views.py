from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .services import EscultorService
from .serializers import EscultorSerializer

class EscultorViewSet(viewsets.ModelViewSet):
    queryset = EscultorService.obtener_todos()
    serializer_class = EscultorSerializer