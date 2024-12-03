import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Escultor.css';
import { Container, Button } from 'react-bootstrap';
import testImg from '../assets/test.jpg';
import useAuth from "../context/AuthContext";

function Escultor() {
    const [dataEscultor, setDataEscultor] = useState(null);
    const [esculturas, setDataEsculturas] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { user } = useContext(useAuth);
    const navigate = useNavigate();

    useEffect(() => {
        async function obtenerData() {
            try {
                setLoading(true);
                const response = await fetch(
                    `http://127.0.0.1:8000/api/escultores/${id}`,
                    {
                        method: 'GET',
                    }
                );
                const data = await response.json();
                setDataEscultor(data);
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        obtenerData();
    }, [id]);

    useEffect(() => {
        async function obtenerEsculturas() {
            try {
                setLoading(true);
                const response = await fetch(
                    `http://127.0.0.1:8000/api/escultores/${id}/esculturas/`,
                    {
                        method: 'GET',
                    }
                );
                const data = await response.json();
                if (Array.isArray(data)) {
                    setDataEsculturas(data);
                } else {
                    setDataEsculturas([]);
                }
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        obtenerEsculturas();
    }, [id]);

    const eliminarEscultor = async () => {
        // Primer aviso de confirmación
        const confirmacion1 = window.confirm('¿Estás seguro de que deseas eliminar este escultor?');
    
        if (confirmacion1) {
            // Segunda confirmación antes de eliminar
            const confirmacion2 = window.confirm('Esta acción no se puede deshacer. ¿Deseas continuar?');
    
            if (confirmacion2) {
                try {
                    const response = await fetch(
                        `http://127.0.0.1:8000/api/escultores/${id}/`,
                        {
                            method: 'DELETE',
                        }
                    );
    
                    if (response.ok) {
                        // Redirigir después de la eliminación
                        navigate('/escultores');
                    } else {
                        console.error('Error al eliminar el escultor');
                        setError(true);
                    }
                } catch (error) {
                    console.error(error);
                    setError(true);
                }
            } else {
                alert('Eliminación cancelada.');
            }
        } else {
            alert('Eliminación cancelada.');
        }
    };

    if (error) return <span>Error al cargar la información del escultor o eliminarlo.</span>;
    if (loading) return <span>Cargando...</span>;

    if (dataEscultor && dataEscultor.message)
        return <span>{dataEscultor.message}</span>;

    return (
        <Container>
            <h1 className="escultor-titulo">{dataEscultor?.nombre}</h1>
            <div className="escultor-detalle">
                <p>{dataEscultor?.biografia}</p>
                <span>
                    Fecha de Nacimiento: <b>{dataEscultor?.fecha_nacimiento}</b>
                </span>
                <span>
                    Nacionalidad: <b>{dataEscultor?.nacionalidad}</b>
                </span>
                <button className="escultor-compartir">Compartir</button>
            </div>

            <h5>Esculturas de {dataEscultor?.nombre}</h5>
            {esculturas.length === 0 ? (
                <p>Este escultor no tiene esculturas disponibles.</p>
            ) : (
                <div className="escultor-galeria">
                    {esculturas.map((escultura) => {
                        return (
                            <div key={escultura.id} className="escultor-galeria-item">
                                <span className="escultor-galeria-titulo">
                                    {escultura.titulo}
                                </span>
                                <img
                                    src={
                                        escultura.imagenes[0]?.imagen
                                            ? `http://127.0.0.1:8000${escultura.imagenes[0]?.imagen}`
                                            : testImg
                                    }
                                    alt={escultura.titulo}
                                    className="escultor-galeria-imagen"
                                />
                                <span>Fecha de Creación: {escultura.fecha_creacion}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {user?.is_admin && (
                <div className="text-center mt-3">
                    <Button variant="dark" onClick={eliminarEscultor}>
                        Eliminar Escultor
                    </Button>
                </div>
            )}
        </Container>
    );
}

export default Escultor;