import { useEffect, useState, useContext } from 'react';
import EventCard from '../components/TarjetaEventoDetallada';
import useAuth from "../context/AuthContext";
import { Modal, Button, Form } from 'react-bootstrap';
import './Eventos.css';

function EventsPage() {
  const [listaEventos, setListaEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(useAuth);
  const [showModal, setShowModal] = useState(false);
  const [fechaError, setFechaError] = useState('');
  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    lugar: '',
    tematica: '',
  });

  // Manejo de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento((prev) => ({ ...prev, [name]: value }));
  };

  // Función para validar las fechas
  const handleFechaInicioChange = (e) => {
    handleInputChange(e);
  };

  const handleFechaFinChange = (e) => {
    handleInputChange(e);
  };

  useEffect(() => {
    if (nuevoEvento.fecha_inicio && nuevoEvento.fecha_fin) {
      if (nuevoEvento.fecha_inicio > nuevoEvento.fecha_fin) {
        setFechaError('La fecha de inicio no puede ser mayor que la fecha de fin');
      } else {
        setFechaError('');
      }
    }
  }, [nuevoEvento.fecha_inicio, nuevoEvento.fecha_fin]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fechaError) {
        return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/eventos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEvento),
      });

      if (response.ok) {
        const data = await response.json();
        setListaEventos((prev) => [...prev, data]); 
        setShowModal(false);
        setNuevoEvento({
          titulo: '',
          descripcion: '',
          fecha_inicio: '',
          fecha_fin: '',
          lugar: '',
          tematica: '',
        });

        window.location.reload();
      } else {
        console.error("Error al agregar evento");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener eventos
  useEffect(() => {
    async function obtenerTodosLosEventos() {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/eventos', {
          method: 'GET',
        });

        const data = await response.json();
        if (data.length > 0) {
          setListaEventos(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    obtenerTodosLosEventos();
  }, []);

  return (
    <div className="eventsPage">
      <main className="mainContent">
        <section className="eventsSection">
          <h2 className="eventsTitle">Eventos</h2>
          {user?.is_admin && (
            <div className="text-center mt-3">
              <Button variant="dark" onClick={handleShowModal}>
                Agregar evento
              </Button>
            </div>
          )}
          {loading ? (
            <p>Cargando eventos...</p>
          ) : (
            listaEventos?.map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))
          )}
        </section>
      </main>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nuevo evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={nuevoEvento.titulo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={nuevoEvento.descripcion}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="fecha_inicio">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                name="fecha_inicio"
                value={nuevoEvento.fecha_inicio}
                onChange={handleFechaInicioChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="fecha_fin">
              <Form.Label>Fecha de fin</Form.Label>
              <Form.Control
                type="date"
                name="fecha_fin"
                value={nuevoEvento.fecha_fin}
                onChange={handleFechaFinChange}
                required
              />
            </Form.Group>
            {fechaError && <div style={{ color: 'red' }}>{fechaError}</div>}
            <Form.Group controlId="lugar">
              <Form.Label>Lugar</Form.Label>
              <Form.Control
                type="text"
                name="lugar"
                value={nuevoEvento.lugar}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="tematica">
              <Form.Label>Temática</Form.Label>
              <Form.Control
                type="text"
                name="tematica"
                value={nuevoEvento.tematica}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div className="text-center mt-3">
              <Button variant="danger" className="mt-3 mx-2" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="success" type="submit" className="mt-3 mx-2">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EventsPage;