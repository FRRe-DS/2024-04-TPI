import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AgregarImagenModal({ show, handleClose, handleSubmit }) {
    const [imagen, setImagen] = useState(null);
    const [etapa, setEtapa] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!imagen || !etapa) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        const formData = new FormData();
        formData.append('imagen', imagen);
        formData.append('etapa', etapa);
        formData.append('descripcion', descripcion);
        handleSubmit(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Imagen a la Escultura</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="formImagen">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImagen(e.target.files[0])}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEtapa">
                        <Form.Label>Etapa </Form.Label>
                        <Form.Select required value={etapa} onChange={(e) => setEtapa(e.target.value)}>
                            <option value="">Selecciona una etapa</option>
                            <option value="antes">Antes del evento</option>
                            <option value="durante">Durante el evento</option>
                            <option value="despues">Después del evento</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>
                    <div className="text-center mt-3">
                        <Button variant="success" type="submit">
                            Guardar
                        </Button>
                        <Button variant="danger" onClick={handleClose} className="ms-2">
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AgregarImagenModal;
