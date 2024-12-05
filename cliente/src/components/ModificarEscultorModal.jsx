import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function ModificarEscultorModal({ show, handleClose, handleSubmit, escultorActual }) {
    const [nombre, setNombre] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [biografia, setBiografia] = useState('');
    const [contacto, setContacto] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [fechaError, setFechaError] = useState('');

    useEffect(() => {
        if (escultorActual) {
            setNombre(escultorActual.nombre || '');
            setNacionalidad(escultorActual.nacionalidad || '');
            setBiografia(escultorActual.biografia || '');
            setContacto(escultorActual.contacto || '');
            setFechaNacimiento(escultorActual.fecha_nacimiento || '');
        }
    }, [escultorActual]);

    // Función para validar la fecha de nacimiento
    const handleFechaNacimientoChange = (e) => {
        const nuevaFechaNacimiento = e.target.value;
        setFechaNacimiento(nuevaFechaNacimiento);

        if (new Date(nuevaFechaNacimiento) > new Date()) {
            setFechaError('La fecha de nacimiento no puede ser futura');
        } else {
            setFechaError('');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Si hay un error en la fecha, no enviamos el formulario
        if (fechaError) {
            return;
        }

        handleSubmit({
            id: escultorActual.id,
            nombre,
            nacionalidad,
            biografia,
            contacto,
            fecha_nacimiento: fechaNacimiento,
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Escultor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre del escultor"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formNacionalidad">
                        <Form.Label>Nacionalidad</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nacionalidad del escultor"
                            value={nacionalidad}
                            onChange={(e) => setNacionalidad(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBiografia">
                        <Form.Label>Biografía</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Biografía del escultor"
                            value={biografia}
                            onChange={(e) => setBiografia(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContacto">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Contacto del escultor"
                            value={contacto}
                            onChange={(e) => setContacto(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFechaNacimiento">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control
                            type="date"
                            value={fechaNacimiento}
                            onChange={handleFechaNacimientoChange} // Usar la función de validación
                            required
                        />
                    </Form.Group>
                    {fechaError && <div style={{ color: 'red' }}>{fechaError}</div>}
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

export default ModificarEscultorModal;