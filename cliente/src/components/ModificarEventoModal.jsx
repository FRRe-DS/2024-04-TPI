import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function ModificarEventoModal({ show, handleClose, handleSubmit, eventoActual }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_fin, setFechaFin] = useState('');
    const [lugar, setLugar] = useState('');
    const [fechaError, setFechaError] = useState('');

    useEffect(() => {
        if (eventoActual) {
            setTitulo(eventoActual.titulo || '');
            setDescripcion(eventoActual.descripcion || '');
            setFechaInicio(eventoActual.fecha_inicio || '');
            setFechaFin(eventoActual.fecha_fin || '');
            setLugar(eventoActual.lugar || '');
        }
    }, [eventoActual]);

    // Función para validar las fechas
    const handleFechaInicioChange = (e) => {
        const nuevaFechaInicio = e.target.value;
        setFechaInicio(nuevaFechaInicio);

        if (nuevaFechaInicio > fecha_fin) {
            setFechaError('La fecha de inicio no puede ser mayor que la fecha de fin');
        } else {
            setFechaError('');
        }
    };

    const handleFechaFinChange = (e) => {
        const nuevaFechaFin = e.target.value;
        setFechaFin(nuevaFechaFin);

        if (fecha_inicio > nuevaFechaFin) {
            setFechaError('La fecha de inicio no puede ser mayor que la fecha de fin');
        } else {
            setFechaError('');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Si hay un error en las fechas, no enviamos el formulario
        if (fechaError) {
            return;
        }

        handleSubmit({
            id: eventoActual.id,
            titulo,
            descripcion,
            fecha_inicio,
            fecha_fin,
            lugar,
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formTitulo">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Título del evento"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Descripción del evento"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFechaInicio">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control
                            type="date"
                            value={fecha_inicio}
                            onChange={handleFechaInicioChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formFechaFin">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control
                            type="date"
                            value={fecha_fin}
                            onChange={handleFechaFinChange}
                            required
                        />
                    </Form.Group>
                    {fechaError && <div style={{ color: 'red' }}>{fechaError}</div>}
                    <Form.Group controlId="formLugar">
                        <Form.Label>Lugar</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Lugar del evento"
                            value={lugar}
                            onChange={(e) => setLugar(e.target.value)}
                            required
                        />
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

export default ModificarEventoModal;