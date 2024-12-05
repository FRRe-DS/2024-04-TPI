import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';


function RegistrarVisitante() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/visitantes/registro/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            if (response.ok) {
                setSuccess('Registro exitoso');
                e.target.reset();
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                const data = await response.json();
                setError(data.detail || 'Error en el registro');
            }
        } catch (error) {
            setError('Ocurrió un error al intentar registrar el visitante.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <h3 className="text-center mb-4">Regístrate</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Ingresa tu correo"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formUsername" className="mt-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Ingresa tu usuario"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword" className="mt-3">
                            <Form.Label>Repetir contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Repite tu contraseña"
                                required
                            />
                        </Form.Group>

                        <Button variant="dark" type="submit" className="w-100 mt-4">
                            Registrar
                        </Button>
                    </Form>
                    <br />
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <div className="text-center mt-3">
                        <p>
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" style={{ color: '#007bff' }}>Ingresar</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RegistrarVisitante;
