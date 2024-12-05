from django.db import models
from django.contrib.auth.models import AbstractUser

class Visitante(AbstractUser):
    """Modelo personalizado de usuario Visitante."""
    email = models.EmailField(unique=True, verbose_name='Correo electrónico')
    is_admin = models.BooleanField(default=False, verbose_name='¿Es administrador?')

    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 

    def __str__(self):
        return self.email