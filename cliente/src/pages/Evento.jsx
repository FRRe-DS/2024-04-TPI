import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Evento.css';
import Container from 'react-bootstrap/Container';
import testImg from '../assets/test.jpg';

import ControlesVotacion from '../components/ControlesVotacion';
import LoginModal from '../components/LoginModal';

import CompartirBoton from '../components/CompartirBoton';


function Evento() {
    const [dataEvento, setDataEvento] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const shareUrl = `Mira el evento "${dataEvento?.titulo}": http://localhost:5173/eventos/${id}`;

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
                console.log(data);
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

    return (
        <Container>
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
                <CompartirBoton shareUrl={shareUrl}></CompartirBoton>
            </div>

            {/* Mostrar detalles de la escultura más votada solo si el evento ha finalizado */}
            {eventoFinalizado && esculturaMasVotada ? (
                <div className="evento-escultura-votada">
                    <h5>Escultura más votada: {esculturaMasVotada.titulo}</h5>
                    <h5>Escultor destacado: {esculturaMasVotada.escultor.nombre}</h5>
                    <p>
                        Puntaje Promedio: <b>{puntajeEsculturaMasVotada.toFixed(2)}</b>
                    </p>
                    <p>
                        Cantidad de votos: <b>{cantidadVotosEsculturaMasVotada}</b>
                    </p>
                </div>
            ) : (
                <p>Las esculturas más votadas se mostrarán una vez que el evento haya finalizado.</p>
            )}

            <h5>Esculturas del evento</h5>
            <div className="evento-galeria">
                {dataEvento?.esculturas?.map((escultura) => {
                    return (
                        <div
                            key={escultura.id}
                            className="evento-galeria-item"
                        >
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
                                        <b>Votar:</b>
                                        <ControlesVotacion idEscultura={escultura.id} openModal={() => setShowModal(true)} />
                                    </>
                                )}
                                {!eventoEnCurso && <p>No puedes votar</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
            <LoginModal isOpen={showModal} closeModal={() => setShowModal(false)} />
        </Container>
    );
}

export default Evento;