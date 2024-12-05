import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Escultor.css';
import { Container, Button, Carousel } from 'react-bootstrap';
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
            const formData = new FormData();
    
            // Agrega todos los campos al FormData
            formData.append('nombre', escultorModificado.nombre);
            formData.append('nacionalidad', escultorModificado.nacionalidad);
            formData.append('biografia', escultorModificado.biografia);
            formData.append('contacto', escultorModificado.contacto);
            formData.append('fecha_nacimiento', escultorModificado.fecha_nacimiento);
    
            // Solo agregar imagen si se seleccionó una nueva
            if (escultorModificado.imagen) {
                formData.append('imagen', escultorModificado.imagen);
            }
    
            const response = await fetch(`http://127.0.0.1:8000/api/escultores/${id}/`, {
                method: 'PUT',
                body: formData, // Enviar FormData en el cuerpo
            });
    
            if (response.ok) {
                alert('Escultor modificado exitosamente');
                setShowModalModificar(false);
                await obtenerData(); // Recargar los datos después de la modificación
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
                        alert('Escultor eliminado exitosamente');
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
            {dataEscultor?.imagen && (
                        <img
                            src={`${dataEscultor.imagen}`}
                            alt={`Imagen de ${dataEscultor.nombre}`}
                            className="escultor-imagen mb-3"
                        />
            )}
            <div className="escultor-detalle">
                {console.log(dataEscultor)}
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
                            <div key={escultura.id} className="escultor-galeria-item" >
                                <div
                                    onClick={() => navigate(`/esculturas/${escultura.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span className="escultor-galeria-titulo">
                                        {escultura.titulo}
                                    </span>
                                </div>
                                {escultura.imagenes.length > 1 ? (
                                    <Carousel>
                                        {escultura.imagenes.map((img, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    src={`http://127.0.0.1:8000${img.imagen}`}
                                                    alt={`${escultura.titulo} - Imagen ${index + 1}`}
                                                    className="escultor-galeria-imagen d-block w-100"
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <img
                                        src={
                                            escultura.imagenes[0]?.imagen
                                                ? `http://127.0.0.1:8000${escultura.imagenes[0]?.imagen}`
                                                : testImg
                                        }
                                        alt={escultura.titulo}
                                        className="escultor-galeria-imagen"
                                    />
                                )}
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