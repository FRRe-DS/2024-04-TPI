from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegistroView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'registro', RegistroView, basename="registro")  # Registro de visitantes

urlpatterns = [
    path('', include(router.urls)),  # Rutas del router
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login JWT
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
]