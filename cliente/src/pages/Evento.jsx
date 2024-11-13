import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Evento.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Carousel from 'react-bootstrap/Carousel';
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
                console.log(data)
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
                
                <div className="evento-galeria">
                    <h5>Esculturas del evento</h5>
                    {dataEvento?.galeria &&
                        dataEvento.galeria.map((item, index) => (
                            <div key={index} className="evento-item">
                                <img
                                    src={item.imagen}
                                    alt={`Imagen ${index + 1}`}
                                    className="evento-imagen-galeria"
                                />
                                <p className="evento-descripcion-galeria">
                                    {item.descripcion}
                                </p>
                            </div>
                        ))}
                </div>
                
                <Container>
                <Row>
                    {dataEvento?.esculturas?.map((escultura) => {
                        return (
                            <Col key={escultura.id}>
                                <Carousel.Item>

                                </Carousel.Item>
                            </Col>
                        )
                    })}
                </Row>

                </Container>
            </Container>
        </>
    )
}

export default Evento
