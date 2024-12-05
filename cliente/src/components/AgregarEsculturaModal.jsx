import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function AgregarEsculturaModal({ show, handleClose, handleSubmit }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tematica, setTematica] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [escultor, setEscultor] = useState('');
    const [evento, setEvento] = useState('');
    const [escultores, setEscultores] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [fechaError, setFechaError] = useState('');

    useEffect(() => {
        async function obtenerEscultores() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/escultores/');
                const data = await response.json();
                setEscultores(data);
            } catch (error) {
                console.error("Error al cargar escultores", error);
            }
        }

        obtenerEscultores();
    }, []);

    useEffect(() => {
        async function obtenerEventos() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/eventos/');
                const data = await response.json();
                setEventos(data);
            } catch (error) {
                console.error("Error al cargar eventos", error);
            }
        }

        obtenerEventos();
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Si hay un error en la fecha, no enviamos el formulario
        if (fechaError) {
            return;
        }

        handleSubmit({
            titulo,
            descripcion,
            tematica,
            fecha_creacion: fechaCreacion,
            escultor,
            evento
        });
    };

    // Función para validar la fecha de creación
    const handleFechaCreacionChange = (e) => {
        const nuevaFechaCreacion = e.target.value;
        setFechaCreacion(nuevaFechaCreacion);

        if (new Date(nuevaFechaCreacion) > new Date()) {
            setFechaError('La fecha de creación no puede ser futura');
        } else {
            setFechaError('');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crear nueva escultura</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formTitulo">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Título de la escultura"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            placeholder="Descripción de la escultura"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formTematica">
                        <Form.Label>Temática</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Temática de la escultura"
                            value={tematica}
                            onChange={(e) => setTematica(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formFechaCreacion">
                        <Form.Label>Fecha de creación</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={fechaCreacion}
                            onChange={handleFechaCreacionChange}
                            required
                        />
                    </Form.Group>
                    {fechaError && <div style={{ color: 'red' }}>{fechaError}</div>}
                    <Form.Group controlId="formEscultor">
                        <Form.Label>Escultor</Form.Label>
                        <Form.Control 
                            as="select"
                            value={escultor}
                            onChange={(e) => setEscultor(e.target.value)} 
                            required
                        >
                            <option value="">Seleccionar escultor</option>
                            {escultores.map((escultor) => (
                                <option key={escultor.id} value={escultor.id}>
                                    {escultor.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formEscultor">
                        <Form.Label>Evento</Form.Label>
                        <Form.Control 
                            as="select"
                            value={evento}
                            onChange={(e) => setEvento(e.target.value)} 
                        >
                            <option value="">Seleccionar evento</option>
                            {eventos.map((evento) => (
                                <option key={evento.id} value={evento.id}>
                                    {evento.titulo}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <div className="text-center mt-3">
                        <Button variant="danger" onClick={handleClose} className="mx-3">
                            Cancelar
                        </Button>
                        <Button variant="success" type="submit" className="mx-3">
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AgregarEsculturaModal;