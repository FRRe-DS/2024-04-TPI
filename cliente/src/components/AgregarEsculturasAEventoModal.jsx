import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AgregarEsculturasAEventoModal = ({ show, handleClose, onSubmit, eventoId }) => {
    const [esculturas, setEsculturas] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);

    useEffect(() => {
        // Carga la lista de esculturas disponibles
        const fetchEsculturas = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/esculturas/');
                const data = await response.json();
                setEsculturas(data);
            } catch (error) {
                console.error('Error al cargar esculturas:', error);
            }
        };

        fetchEsculturas();
    }, []);

    const toggleSeleccion = (id) => {
        setSeleccionadas((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleConfirmar = () => {
        onSubmit(seleccionadas);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Esculturas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {esculturas.map((escultura) => (
                        <Form.Check
                            key={escultura.id}
                            type="checkbox"
                            label={escultura.titulo}
                            checked={seleccionadas.includes(escultura.id)}
                            onChange={() => toggleSeleccion(escultura.id)}
                        />
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleConfirmar}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AgregarEsculturasAEventoModal;
