import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Evento.css';
import {Container, Button} from 'react-bootstrap';
import testImg from '../assets/test.jpg';
import useAuth from "../context/AuthContext";

import ControlesVotacion from '../components/ControlesVotacion';
import LoginModal from '../components/LoginModal';
import AgregarEsculturaModal from '../components/AgregarEsculturaModal';

function Evento() {
    const [dataEvento, setDataEvento] = useState(null);
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalEscultura, setShowModalEscultura] = useState(false);
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
        }

        obtenerData();
    }, [id]);

    if (error) return <span>Error al cargar el evento.</span>;
    if (loading) return <span>Cargando...</span>;

    if (dataEvento && dataEvento.message)
        return <span>{dataEvento.message}</span>;

    // Función para obtener la escultura más votada
    const obtenerEsculturaMasVotada = () => {
        if (!dataEvento?.esculturas) return null;
        
        // Ordenar las esculturas por puntaje promedio de votos
        const esculturaMasVotada = dataEvento.esculturas.reduce((max, escultura) => {
            const puntajePromedio = escultura.promedio_votos || 0;
            return puntajePromedio > (max.promedio_votos || 0) ? escultura : max;
        }, {});
        
        return esculturaMasVotada;
    };

    const esculturaMasVotada = obtenerEsculturaMasVotada();
    const puntajeEsculturaMasVotada = esculturaMasVotada ? esculturaMasVotada.promedio_votos : 0;
    const cantidadVotosEsculturaMasVotada = esculturaMasVotada ? esculturaMasVotada.total_votos : 0;

    // Verificar si el evento ha comenzado y si ha finalizado
    const fechaActual = new Date();
    const fechaInicio = new Date(dataEvento?.fecha_inicio);
    const fechaFin = new Date(dataEvento?.fecha_fin);
    const eventoEnCurso = fechaActual >= fechaInicio && fechaActual <= fechaFin;
    const eventoFinalizado = fechaActual > fechaFin;

    const eliminarEvento = async () => {
        // Primer aviso de confirmación
        const confirmacion1 = window.confirm('¿Estás seguro de que deseas eliminar este evento?');
    
        if (confirmacion1) {
            // Segunda confirmación antes de eliminar
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
                        // Redirigir después de la eliminación
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

    const handleSubmitEscultura = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/esculturas/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    evento: dataEvento.id,
                }),
            
            });
            if (response.ok) {
                const nuevaEscultura = await response.json();
                console.log("Escultura agregada:", nuevaEscultura);
                setDataEvento((prevData) => ({
                    ...prevData,
                    esculturas: [...prevData.esculturas, nuevaEscultura],
                }));
                setShowModalEscultura(false);
                window.location.reload();
            } else {
                console.error("Error al agregar la escultura");
            }
        } catch (error) {
            console.error("Error al enviar los datos", error);
        }
    };

    return (
        <Container>
            <br /> <br />
            {user?.is_admin && (
                <div className="text-center mt-3">
                    <Button variant="dark" onClick={eliminarEvento} className="mx-3">
                        Eliminar Evento
                    </Button>
                    <Button variant="dark" onClick={() => setShowModalEscultura(true)} className="mx-3">
                        Agregar Escultura
                    </Button>
                </div>
            )}
            <h1 className="evento-titulo">{dataEvento?.titulo}</h1>
            <div className="evento-detalle">
                <p>{dataEvento?.descripcion}</p>
                <span>
                    Fecha de Inicio: <b>{dataEvento?.fecha_inicio}</b>
                </span>
                <span>
                    Fecha de Finalización: <b>{dataEvento?.fecha_fin}</b>
                </span>
                <span>
                    Ubicación: <b>{dataEvento?.lugar}</b>
                </span>
                <button className="evento-compartir">Compartir</button>
            </div>

            {eventoFinalizado && esculturaMasVotada ? (
                <div className="evento-escultura-votada">
                    <h5>Escultura más votada: {esculturaMasVotada?.titulo}</h5>
                    <h5>Escultor destacado: {esculturaMasVotada?.escultor?.nombre}</h5>
                    <p>
                        Puntaje Promedio: <b>{puntajeEsculturaMasVotada?.toFixed(2)}</b>
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
                    {dataEvento?.esculturas?.map((escultura) => {
                        return (
                            <div
                                key={escultura.id}
                                className="evento-galeria-item"
                            >
                                {console.log(escultura)}
                                <span className="evento-galeria-titulo">
                                    {escultura.titulo}
                                </span>
                                <img
                                    src={escultura.imagenes[0]?.imagen ? escultura.imagenes[0]?.imagen : testImg}
                                    alt={escultura.titulo}
                                    className="evento-galeria-imagen"
                                />
                                <span>Autor: {escultura.escultor.nombre}</span>

                                <div className="galeria-item-opciones">
                                    {eventoEnCurso && (
                                        <>
                                            <p>Votar:</p>
                                            <ControlesVotacion idEscultura={escultura.id} openModal={() => setShowModalLogin(true)} />
                                        </>
                                    )}
                                    {!eventoEnCurso && <p>No puedes votar</p>}
                                </div>
                            </div>
                        );
                    })}
                    
                </div>
            )}
            <AgregarEsculturaModal 
                show={showModalEscultura} 
                handleClose={() => setShowModalEscultura(false)} 
                handleSubmit={handleSubmitEscultura}
                
            />
            <LoginModal isOpen={showModalLogin} closeModal={() => setShowModalLogin(false)} />
        </Container>
    );
}

export default Evento;