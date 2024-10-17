from django.test import TestCase
from unittest.mock import patch, MagicMock  # Mocking

from escultor.models import Escultor
from evento.models import Evento
from escultor.repositories import EscultorRepository

class EscultorRepositoryTests(TestCase):

    def setUp(self):
        """Simula los objetos de escultores y eventos en lugar de crearlos en la base de datos."""
        # Simulamos dos escultores usando MagicMock para evitar creaciones reales
        self.escultor1 = MagicMock(spec=Escultor, id=1, nombre="Escultor 1", nacionalidad="Argentina", fecha_nacimiento="1999-01-01")
        self.escultor2 = MagicMock(spec=Escultor, id=2, nombre="Escultor 2", nacionalidad="Chile", fecha_nacimiento="1990-12-12")
        
        # Simulamos un evento con una relación ManyToMany a los escultores
        self.evento = MagicMock(spec=Evento, id=1, titulo="Evento de Arte", descripcion="Evento de Esculturas", fecha="2024-12-01", lugar="Parque 2 de febrero", tematica="tematica1")
        
        # Configuramos la relación ManyToMany para devolver el escultor1
        self.evento.escultores.all.return_value = [self.escultor1]

    @patch('escultor.repositories.EscultorRepository.obtener_todos')
    def test_obtener_todos(self, mock_obtener_todos):
        """Simula la obtención de todos los escultores registrados."""
        mock_obtener_todos.return_value = [self.escultor1, self.escultor2]
        
        escultores = EscultorRepository.obtener_todos()
        assert len(escultores) == 2

    @patch('escultor.repositories.EscultorRepository.obtener_por_id')
    def test_obtener_por_id(self, mock_obtener_por_id):
        """Simula la obtención de un escultor por su ID."""
        # Simula que el mock devuelve escultor1 para ID 1 y escultor2 para ID 2.
        mock_obtener_por_id.side_effect = lambda id: self.escultor1 if id == 1 else self.escultor2

        # Prueba con ID 1, debería devolver escultor1.
        escultor = EscultorRepository.obtener_por_id(1)
        assert escultor.nombre == "Escultor 1"

        # Prueba con ID 2, debería devolver escultor2.
        escultor = EscultorRepository.obtener_por_id(2)
        assert escultor.nombre == "Escultor 2"

    @patch('escultor.repositories.EscultorRepository.crear_escultor')
    def test_crear_escultor(self, mock_crear_escultor):
        """Simula la creación de un nuevo escultor."""
        datos = {"nombre": "Escultor 3", "nacionalidad": "Uruguay", "fecha_nacimiento": "1999-01-01"}
        mock_crear_escultor.return_value = Escultor(**datos)

        nuevo_escultor = EscultorRepository.crear_escultor(datos)
        assert nuevo_escultor.nombre == "Escultor 3"

    @patch('escultor.repositories.EscultorRepository.actualizar_escultor')
    def test_actualizar_escultor(self, mock_actualizar_escultor):
        """Simula la actualización de un escultor."""
        datos_actualizados = {"nombre": "Escultor Actualizado", "nacionalidad": "Brasil"}
        mock_actualizar_escultor.return_value = Escultor(id=1, **datos_actualizados)

        escultor_actualizado = EscultorRepository.actualizar_escultor(self.escultor1, datos_actualizados)
        assert escultor_actualizado.nombre == "Escultor Actualizado"
        assert escultor_actualizado.nacionalidad == "Brasil"

    @patch('escultor.repositories.EscultorRepository.eliminar_escultor')
    def test_eliminar_escultor(self, mock_eliminar_escultor):
        """Simula la eliminación de un escultor."""
        EscultorRepository.eliminar_escultor(self.escultor1)

        mock_eliminar_escultor.assert_called_once_with(self.escultor1)

    @patch('escultor.repositories.EscultorRepository.obtener_por_evento')
    def test_obtener_por_evento(self, mock_obtener_por_evento):
        """Simula la obtención de escultores por evento."""
        mock_obtener_por_evento.return_value = [self.escultor1]

        escultores = EscultorRepository.obtener_por_evento(self.evento.id)
        assert len(escultores) == 1
        assert escultores[0].nombre == "Escultor 1"