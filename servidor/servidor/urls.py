"""
URL configuration for servidor project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Trabajo Practico Final 2024 - Grupo 4",
        default_version='v1',
        description="https://github.com/FRRe-DS/2024-04-TPI",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),

    #Documentacion de la API
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    #Rutas de apps individuales
    path('api/esculturas/', include('escultura.urls')),  # Rutas para esculturas
    path('api/escultores/', include('escultor.urls')),  # Rutas para escultores
    path('api/eventos/', include('evento.urls')), #Rutas para eventos
    path('api/visitantes/', include('visitante.urls')) #Rutas para visitantes
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)