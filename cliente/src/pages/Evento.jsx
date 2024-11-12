import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Evento.css';

function Evento() {
    const [dataEvento, setDataEvento] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

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
                console.log(data);
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

    if (dataEvento && dataEvento.message) return <span>{dataEvento.message}</span>;

    return (
        <article className="evento-detalle">
            {console.log(dataEvento)}
            {/* Encabezado */}
            <h1 className="evento-titulo">{dataEvento?.titulo}</h1>

            {/* Imagen Principal */}
            <img src={dataEvento?.imagenPrincipal} alt="Imagen del evento" className="evento-imagen-principal" />

            {/* Información del Evento */}
            <div className="evento-info">
                <span>Lugar: {dataEvento?.lugar}</span>
                <span>Fecha: {dataEvento?.fecha}</span>
                <span>Temática: {dataEvento?.tematica}</span>
            </div>

            {/* Descripción */}
            <p className="evento-descripcion">{dataEvento?.descripcion}</p>

            {/* Galería de Imágenes */}
            <div className="evento-galeria">
                {dataEvento?.galeria && dataEvento.galeria.map((item, index) => (
                    <div key={index} className="evento-item">
                        <img src={item.imagen} alt={`Imagen ${index + 1}`} className="evento-imagen-galeria" />
                        <p className="evento-descripcion-galeria">{item.descripcion}</p>
                    </div>
                ))}
            </div>

            {/* Botón Compartir */}
            <button className="evento-compartir">
                Compartir
            </button>
        </article>
    );
}

export default Evento;