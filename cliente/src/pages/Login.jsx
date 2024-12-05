import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import useAuth from '../context/AuthContext';

function Login() {
    const [error, setError] = useState('');
    const { loginUser } = useContext(useAuth);

    const handleSubmit = (e) => {
        console.log(e.target.email.value, e.target.password.value);
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
  
        loginUser(email, password);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
                    <h3 className="text-center mb-4">Iniciar Sesión</h3>
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

                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                        </Form.Group>

                        <Button variant="dark" type="submit" className="w-100 mt-4">
                            Iniciar Sesión
                        </Button>
                    </Form>
                    <br />
                    {error && <Alert variant="danger">{error}</Alert>}

                    <div className="text-center mt-3">
                        <p>
                            ¿No tienes una cuenta?{' '}
                            <Link to="/registrar" style={{ color: '#007bff' }}>Regístrate</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;