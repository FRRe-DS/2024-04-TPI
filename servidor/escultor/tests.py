from rest_framework.test import APITestCase
from rest_framework import status
from .models import Escultor
from .services import EscultorService
from .repositories import EscultorRepository
from django.urls import reverse
from django.test import TestCase
from unittest.mock import patch, MagicMock

# Test del controlador, verificacion de los codigos de las peticiones HTTP()
class EscultorViewSetTest(APITestCase):
    def test_crear_escultor(self):
        url = reverse('escultores-list')
        data = {
            "nombre": "Juan",
            "nacionalidad": "Argentina",
            "fecha_nacimiento": "1980-05-15"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Escultor.objects.count(), 1)

# Test del servicio. Se utiliza mock para no depender del repositorio que hace las llamadas a la base de datos
class EscultorServiceTest(TestCase):
    @patch('app.repositories.EscultorRepository.crear_escultor') #Intercepta la llamada a la función real EscultorRepository.crear_escultor y la reemplaza por un mock.
    def test_crear_escultor(self, mock_crear_escultor): #El argumento mock_crear_escultor hace referencia al objeto simulado inyectado en el test
        mock_escultor = MagicMock(spec=Escultor) #Crea un objeto mock_escultor que simula ser una instancia del modelo Escultor
        mock_escultor.nombre = "Juan"
        mock_crear_escultor.return_value = mock_escultor #Define que cada vez que se llame a EscultorRepository.crear_escultor, se retorne el mock_escultor

        escultor = EscultorService.crear_escultor("Juan", "Argentina", "", "", "1980-05-15")

        mock_crear_escultor.assert_called_once_with("Juan", "Argentina", "", "", "1980-05-15") #assert_called_once_with: Verifica que el método del repositorio se haya llamado una vez con los argumentos correctos.
        self.assertEqual(escultor.nombre, "Juan") #assertEqual: Comprueba que el nombre del escultor devuelto sea el esperado.

# Test del repositorio
class EscultorRepositoryTest(TestCase):
    def test_crear_escultor(self):
        escultor = EscultorRepository.crear_escultor(
            "Juan", "Argentina", "1980-05-15"
        )
        self.assertEqual(escultor.nombre, "Juan")
        self.assertEqual(Escultor.objects.count(), 1)