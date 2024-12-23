from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EscultorViewSet

router = DefaultRouter()
router.register(r'', EscultorViewSet, basename="escultores")

urlpatterns = [
    path('', include(router.urls)),
]