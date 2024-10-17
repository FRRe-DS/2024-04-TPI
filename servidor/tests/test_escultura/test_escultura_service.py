from django.test import TestCase
from unittest.mock import patch, MagicMock
from escultura.services import EsculturaService
from escultor.models import Escultor
from evento.models import Evento

class TestEsculturaService(TestCase):

    @patch('escultor.services.EscultorService.obtener_por_evento')
    @patch('escultura.repositories.EsculturaRepository.crear_escultura')
    def test_crear_escultura_escultor_valido(self, mock_crear_escultura, mock_obtener_por_evento):
        # Mock de un escultor válido para el evento
        mock_escultor = MagicMock(spec=Escultor, id=1)  # Escultor registrado en el evento
        mock_evento = MagicMock(spec=Evento, id=1)  # Evento con ID = 1

        # Datos de entrada simulados con el escultor válido
        data = {
            'titulo': 'Escultura 1',
            'descripcion': 'Descripción de prueba',
            'tematica': 'Arte Moderno',
            'fecha_creacion': '2024-10-01',
            'escultor': mock_escultor,
            'evento': mock_evento
        }

        # Configuración del mock: el escultor está en la lista de escultores del evento
        mock_obtener_por_evento.return_value = [mock_escultor]

        # Llamada a la función a probar
        result = EsculturaService.crear_escultura(data)

        # Verificaciones
        mock_crear_escultura.assert_called_once_with(data)  # Se debe llamar una vez
        self.assertIsNotNone(result)  # El resultado no debe ser None

    @patch('escultor.services.EscultorService.obtener_por_evento')
    @patch('escultura.repositories.EsculturaRepository.crear_escultura')
    def test_crear_escultura_escultor_no_valido(self, mock_crear_escultura, mock_obtener_por_evento):
        # Mock de dos escultores, pero solo uno será válido para el evento
        mock_escultor1 = MagicMock(spec=Escultor, id=1)  # Escultor NO registrado en el evento
        mock_escultor2 = MagicMock(spec=Escultor, id=2)  # Escultor registrado en el evento
        mock_evento = MagicMock(spec=Evento, id=1)  # Evento con ID = 1

        # Datos de entrada simulados con el escultor no registrado en el evento
        data = {
            'titulo': 'Escultura 1',
            'descripcion': 'Descripción de prueba',
            'tematica': 'Arte Moderno',
            'fecha_creacion': '2024-10-01',
            'escultor': mock_escultor1,  # Escultor no válido
            'evento': mock_evento
        }

        # Configuración del mock: solo el escultor2 está registrado en el evento
        mock_obtener_por_evento.return_value = [mock_escultor2]

        # Llamada a la función a probar
        result = EsculturaService.crear_escultura(data)

        # Verificaciones
        mock_crear_escultura.assert_not_called()  # No se debe llamar a crear_escultura
        self.assertIsNone(result)  # El resultado debe ser None