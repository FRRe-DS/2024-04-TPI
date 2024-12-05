import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Escultura.css';
import { Container, Button, Carousel } from 'react-bootstrap';
import testImg from '../assets/test.jpg';
import useAuth from "../context/AuthContext";

import AgregarImagenModal from '../components/AgregarImagenModal';
import ModificarEsculturaModal from '../components/ModificarEsculturaModal';

import CompartirBoton from '../components/CompartirBoton';

function Escultura() {
    const [dataEscultura, setDataEscultura] = useState(null);
    const [evento, setEvento] = useState();
    const [imagenes, setImagenes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModalModificar, setShowModalModificar] = useState(false);
    const [showModalAgregarImagen, setShowModalAgregarImagen] = useState(false);
    const { id } = useParams();
    const { user } = useContext(useAuth);
    const navigate = useNavigate();

    const shareUrl = `Mira la escultura "${dataEscultura?.titulo}": http://localhost:5173/esculturas/${id}`;

    const obtenerData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://127.0.0.1:8000/api/esculturas/${id}`,
                {
                    method: 'GET',
                }
            );
            const data = await response.json();
            setDataEscultura(data);

            if (Array.isArray(data.imagenes)) {
                setImagenes(data.imagenes);
            } else {
                setImagenes([]);
            }
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

    const actualizarEscultura = async (esculturaModificado) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/esculturas/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(esculturaModificado),
            });
            console.log(esculturaModificado)
            if (response.ok) {
                alert('Escultura modificada exitosamente');
                setShowModalModificar(false);
                await obtenerData();
            } else {
                console.error('Error al actualizar la escultura');
                setError(true);
            }
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    useEffect(() => {
        if (dataEscultura?.evento) {
            async function obtenerEvento() {
                try {
                    setLoading(true);
                    const response = await fetch(
                        `http://127.0.0.1:8000/api/eventos/${dataEscultura.evento}`,
                        {
                            method: 'GET',
                        }
                    );
                    const data = await response.json();
                    setEvento(data);
                } catch (e) {
                    console.error(e);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }

            obtenerEvento();
        }
    }, [dataEscultura]);

    const eliminarEscultura = async () => {
        // Primer aviso de confirmación
        const confirmacion1 = window.confirm('¿Estás seguro de que deseas eliminar esta escultura?');
    
        if (confirmacion1) {
            // Segunda confirmación antes de eliminar
            const confirmacion2 = window.confirm('Esta acción no se puede deshacer. ¿Deseas continuar?');
    
            if (confirmacion2) {
                try {
                    const response = await fetch(
                        `http://127.0.0.1:8000/api/esculturas/${id}/`,
                        {
                            method: 'DELETE',
                        }
                    );
    
                    if (response.ok) {
                        alert('Escultura eliminada exitosamente');
                        navigate('/esculturas');
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

    const agregarImagen = async (formData) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/esculturas/${id}/imagenes/nueva/`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (response.ok) {
                alert('Imagen agregada exitosamente');
                setShowModalAgregarImagen(false);
                obtenerData(); // Refresca los datos de la escultura
            } else {
                alert('Error al agregar la imagen.');
            }
        } catch (error) {
            console.error(error);
            alert('Error al agregar la imagen.');
        }
    };

    if (error) return <span>Error al cargar la información de la escultura.</span>;
    if (loading) return <span>Cargando...</span>;

    if (dataEscultura && dataEscultura.message)
        return <span>{dataEscultura.message}</span>;

    return (
        <Container>
            <br /> <br />
            {user?.is_admin && (
                <div className="text-center mt-3">
                    <Button variant="dark" onClick={eliminarEscultura} className="mx-3">
                        Eliminar escultura
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => setShowModalModificar(true)}
                        className="mx-3"
                    >
                        Modificar escultura
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => setShowModalAgregarImagen(true)}
                        className="mx-3"
                    >
                        Agregar imágenes
                    </Button>
                </div>
            )}
            <h1 className="escultura-titulo">{dataEscultura?.titulo}</h1>
            <div className="escultura-detalle">
                {console.log(dataEscultura)}
                <p>{dataEscultura?.descripcion}</p>
                <span>
                    Temática: <b>{dataEscultura?.tematica}</b>
                </span>
                <span>
                    Fecha de creación: <b>{dataEscultura?.fecha_creacion}</b>
                </span>
                <span>
                    Autor: 
                            <b
                            onClick={() => navigate(`/escultores/${dataEscultura?.escultor?.id}`)}
                            style={{ cursor: 'pointer' }}
                            >
                                {" " + dataEscultura?.escultor?.nombre}
                            </b>
                </span>
                <span>
                    Evento:
                                <b
                                onClick={() => navigate(`/eventos/${evento?.id}`)}
                                style={{ cursor: 'pointer' }}
                                >
                                    {" " + evento?.titulo}
                                </b>
                </span>
                <CompartirBoton shareUrl={shareUrl}></CompartirBoton>
            </div>

            <h5>Galería de imágenes</h5>
            {imagenes.length === 0 ? (
                <p>Esta escultura no tiene imágenes disponibles.</p>
            ) : (
                <div className="escultura-galeria">
                    {console.log(imagenes)}
                    {imagenes.map((imagen) => (
                        <div key={imagen.id} className="escultura-galeria-item">
                            {console.log(imagen)}
                            <img
                                src={
                                    imagen.imagen
                                        ? `${imagen.imagen}`
                                        : testImg
                                }
                                alt={`Imagen de la etapa ${imagen.etapa}`}
                                className="escultura-galeria-imagen"
                            />
                            <span>Etapa: {imagen.etapa}</span>
                            <span>{imagen.descripcion || 'Sin descripción'}</span>
                        </div>
                    ))}
                </div>
            )}
        
            <ModificarEsculturaModal
                    show={showModalModificar}
                    handleClose={() => setShowModalModificar(false)}
                    handleSubmit={actualizarEscultura}
                    esculturaActual={dataEscultura}
                    eventoActual = {evento}
                />
            
            <AgregarImagenModal
                show={showModalAgregarImagen}
                handleClose={() => setShowModalAgregarImagen(false)}
                handleSubmit={agregarImagen}
            />
        </Container>
        
    );
}

export default Escultura;