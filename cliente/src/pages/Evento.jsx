import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Evento.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'

function Evento() {
    const [dataEvento, setDataEvento] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        async function obtenerData() {
            try {
                setLoading(true)
                const response = await fetch(
                    `http://127.0.0.1:8000/api/eventos/${id}`,
                    {
                        method: 'GET',
                    }
                )
                const data = await response.json()
                setDataEvento(data)
            } catch (e) {
                console.error(e)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        obtenerData()
    }, [id])

    if (error) return <span>Error al cargar el evento.</span>
    if (loading) return <span>Cargando...</span>

    if (dataEvento && dataEvento.message)
        return <span>{dataEvento.message}</span>

    return (
        <>
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
                    <button className="evento-compartir">Compartir</button>
                </div>

                <h5>Esculturas del evento</h5>
                <div className="evento-galeria">
                    {dataEvento?.esculturas?.map((escultura) => {
                        return (
                            <div
                                key={escultura.id}
                                className="evento-galeria-item"
                            >
                                <img
                                    src={escultura.imagenes[0]?.imagen}
                                    alt={escultura.titulo}
                                    className="evento-galeria-imagen"
                                />
                                
                                    <p className="evento-galeria-titulo">
                                        {escultura.titulo}
                                    </p>
                                    <div className='galeria-item-opciones'>
                                    <Link className="galeria-item-btn" to={`/esculturas/${escultura.id}`}>
                                        Detalle
                                    </Link>
                                        
                                        <div className='galeria-item-votacion'>
                                            ⭐⭐⭐⭐⭐</div>
                                    </div>

                            </div>
                        )
                    })}
                </div>
            </Container>
        </>
    )
}

export default Evento
