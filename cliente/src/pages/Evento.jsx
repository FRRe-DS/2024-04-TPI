import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Evento.css';
import { Container, Button, Carousel } from 'react-bootstrap';
import testImg from '../assets/test.jpg';
import useAuth from "../context/AuthContext";

import AgregarEsculturasAEventoModal from '../components/AgregarEsculturasAEventoModal';
import ControlesVotacion from '../components/ControlesVotacion';
import LoginModal from '../components/LoginModal';
import ModificarEventoModal from '../components/ModificarEventoModal';

import CompartirBoton from '../components/CompartirBoton';

function Evento() {
    const [dataEvento, setDataEvento] = useState(null);
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalModificar, setShowModalModificar] = useState(false);
    const [showModalAgregar, setShowModalAgregar] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { user } = useContext(useAuth);
    const navigate = useNavigate();

    const shareUrl = `Mira el evento "${dataEvento?.titulo}": http://localhost:5173/eventos/${id}`;

    const obtenerData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://127.0.0.1:8000/api/eventos/${id}`,
                {
                    method: 'GET',
                }
            );
            const data = await response.json();
            setDataEvento(data);
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

    const actualizarEvento = async (eventoModificado) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/eventos/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventoModificado),
            });
            console.log(eventoModificado)
            if (response.ok) {
                alert('Evento modificado exitosamente');
                setShowModalModificar(false);
                await obtenerData();
            } else {
                console.error('Error al actualizar el evento');
                setError(true);
            }
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const eliminarEvento = async () => {
        const confirmacion1 = window.confirm('¿Estás seguro de que deseas eliminar este evento?');

        if (confirmacion1) {
            const confirmacion2 = window.confirm('Esta acción no se puede deshacer. ¿Deseas continuar?');

            if (confirmacion2) {
                try {
                    const response = await fetch(
                        `http://127.0.0.1:8000/api/eventos/${id}/`,
                        {
                            method: 'DELETE',
                        }
                    );

                    if (response.ok) {
                        alert('Evento eliminado exitosamente');
                        navigate('/eventos');
                    } else {
                        console.error('Error al eliminar el evento');
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

    const agregarEsculturas = async (ids) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/eventos/${id}/agregar-esculturas/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ esculturas_ids: ids }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                alert('Esculturas agregadas exitosamente.');
                await obtenerData();
            } else {
                console.error(data.detail || 'Error al agregar esculturas.');
            }
        } catch (error) {
            console.error('Error al agregar esculturas:', error);
        }
    };

    if (error) return <span>Error al cargar el evento.</span>;
    if (loading) return <span>Cargando...</span>;

    if (dataEvento && dataEvento.message)
        return <span>{dataEvento.message}</span>;

    const obtenerEsculturaMasVotada = () => {
        if (!dataEvento?.esculturas) return null;

        const esculturaMasVotada = dataEvento.esculturas.reduce((max, escultura) => {
            const puntajePromedio = escultura.promedio_votos || 0;
            return puntajePromedio > (max.promedio_votos || 0) ? escultura : max;
        }, {});

        return esculturaMasVotada;
    };

    const esculturaMasVotada = obtenerEsculturaMasVotada();
    const puntajeEsculturaMasVotada = esculturaMasVotada ? esculturaMasVotada.promedio_votos : 0;
    const cantidadVotosEsculturaMasVotada = esculturaMasVotada ? esculturaMasVotada.total_votos : 0;

    const fechaActual = new Date();
    const fechaInicio = new Date(dataEvento?.fecha_inicio);
    const fechaFin = new Date(dataEvento?.fecha_fin);
    const eventoEnCurso = fechaActual >= fechaInicio && fechaActual <= fechaFin;
    const eventoFinalizado = fechaActual > fechaFin;

    return (
        <Container>
            <br /> <br />
            {user?.is_admin && (
                <div className="text-center mt-3">
                    <Button variant="dark" onClick={eliminarEvento} className="mx-3">
                        Eliminar evento
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => setShowModalModificar(true)}
                        className="mx-3"
                    >
                        Modificar evento
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => setShowModalAgregar(true)}
                        className="mx-3"
                    >
                        Agregar esculturas
                    </Button>
                </div>
            )}
            <h1 className="evento-titulo">{dataEvento?.titulo}</h1>
            <div className="evento-detalle">
                <p>{dataEvento?.descripcion}</p>
                <span>
                    Fecha de inicio: <b>{dataEvento?.fecha_inicio}</b>
                </span>
                <span>
                    Fecha de finalización: <b>{dataEvento?.fecha_fin}</b>
                </span>
                <span>
                    Ubicación: <b>{dataEvento?.lugar}</b>
                </span>
                <CompartirBoton shareUrl={shareUrl}></CompartirBoton>
            </div>

            {eventoFinalizado && esculturaMasVotada ? (
                <div className="evento-escultura-votada">
                    <h5>Escultura más votada: {esculturaMasVotada?.titulo}</h5>
                    <h5>Escultor destacado: {esculturaMasVotada?.escultor?.nombre}</h5>
                    <p>
                        Puntaje promedio: <b>{puntajeEsculturaMasVotada?.toFixed(2)}</b>
                    </p>
                    <p>
                        Cantidad de votos: <b>{cantidadVotosEsculturaMasVotada}</b>
                    </p>
                </div>
            ) : (
                <p>Las esculturas más votadas se mostrarán una vez que el evento haya finalizado.</p>
            )}

            <h5>Esculturas del evento</h5>
            {dataEvento?.esculturas?.length === 0 ? (
                <p>Este evento no tiene esculturas disponibles.</p>
            ) : (
                <div className="evento-galeria">
                    {dataEvento?.esculturas?.map((escultura) => (
                        <div key={escultura.id} className="evento-galeria-item">
                            <div
                                    onClick={() => navigate(`/esculturas/${escultura.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span className="evento-galeria-titulo">
                                        {escultura.titulo}
                                    </span>
                            </div>
                            {escultura.imagenes.length > 1 ? (
                                    <Carousel>
                                        {escultura.imagenes.map((img, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    src={`${img.imagen}`}
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
                                                ? `${escultura.imagenes[0]?.imagen}`
                                                : testImg
                                        }
                                        alt={escultura.titulo}
                                        className="escultor-galeria-imagen"
                                    />
                                )}
                            <span>Autor: {escultura.escultor.nombre}</span>

                            <div className="galeria-item-opciones">
                                {eventoEnCurso && (
                                    <>
                                        <p>Votar:</p>
                                        <ControlesVotacion
                                            idEscultura={escultura.id}
                                            openModal={() => setShowModalLogin(true)}
                                        />
                                    </>
                                )}
                                {!eventoEnCurso && <p>No puedes votar</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <LoginModal isOpen={showModalLogin} closeModal={() => setShowModalLogin(false)} />

            <ModificarEventoModal
                show={showModalModificar}
                handleClose={() => setShowModalModificar(false)}
                handleSubmit={actualizarEvento}
                eventoActual={dataEvento}
            />

            <AgregarEsculturasAEventoModal
                show={showModalAgregar}
                handleClose={() => setShowModalAgregar(false)}
                onSubmit={agregarEsculturas}
                eventoId={id}
            />
        </Container>
    );
}

export default Evento;
