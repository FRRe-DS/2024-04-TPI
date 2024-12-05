import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Escultor.css';
import { Container, Button } from 'react-bootstrap';
import testImg from '../assets/test.jpg';
import useAuth from "../context/AuthContext";

import ModificarEscultorModal from '../components/ModificarEscultorModal';

import CompartirBoton from '../components/CompartirBoton';

function Escultor() {
    const [dataEscultor, setDataEscultor] = useState(null);
    const [esculturas, setDataEsculturas] = useState([]);
    const [showModalModificar, setShowModalModificar] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { user } = useContext(useAuth);
    const navigate = useNavigate();

    const shareUrl = `Mira el escultor "${dataEscultor?.nombre}": http://localhost:5173/escultores/${id}`;

    const obtenerData = async () => {
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
    };

    useEffect(() => {
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

    const actualizarEscultor = async (escultorModificado) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/escultores/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(escultorModificado),
            });
            console.log(escultorModificado)
            if (response.ok) {
                setShowModalModificar(false);
                await obtenerData();
            } else {
                console.error('Error al actualizar el escultor');
                setError(true);
            }
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

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
            <br /> <br />
            {user?.is_admin && (
                <div className="text-center mt-3">
                    <Button variant="dark" onClick={eliminarEscultor}>
                        Eliminar escultor
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => setShowModalModificar(true)}
                        className="mx-3"
                    >
                        Modificar escultor
                    </Button>
                </div>
            )}
            <h1 className="escultor-titulo">{dataEscultor?.nombre}</h1>
            <div className="escultor-detalle">
                <p>{dataEscultor?.biografia}</p>
                <span>
                    Fecha de nacimiento: <b>{dataEscultor?.fecha_nacimiento}</b>
                </span>
                <span>
                    Nacionalidad: <b>{dataEscultor?.nacionalidad}</b>
                </span>
                <span>
                    Contacto: <b>{dataEscultor?.contacto}</b>
                </span>
                <CompartirBoton shareUrl={shareUrl}></CompartirBoton>
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
                                <span>Fecha de creación: {escultura.fecha_creacion}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            <ModificarEscultorModal
                show={showModalModificar}
                handleClose={() => setShowModalModificar(false)}
                handleSubmit={actualizarEscultor}
                escultorActual={dataEscultor}
            />
        </Container>
    );
}

export default Escultor;