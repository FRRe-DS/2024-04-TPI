from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EsculturaViewSet

router = DefaultRouter()
router.register(r'', EsculturaViewSet, basename="esculturas")

urlpatterns = [
    path('', include(router.urls)),
]