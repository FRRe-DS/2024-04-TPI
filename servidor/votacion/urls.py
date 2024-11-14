from django.urls import path
from .views import VotacionesPorVisitante

urlpatterns = [
    path('votaciones-visitante/', VotacionesPorVisitante.as_view(), name='votaciones_por_visitante'),
]