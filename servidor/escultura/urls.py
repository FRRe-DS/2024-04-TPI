from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EsculturaViewSet, GenerarQR

router = DefaultRouter()
router.register(r'', EsculturaViewSet, basename="esculturas")

urlpatterns = [
    path('', include(router.urls)),
    path('generar-qr/<int:escultura_id>/', GenerarQR.as_view(), name='generar-qr'),  # Nueva ruta para la vista GenerarQR
]