import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Evento.css'
import TarjetaEscultura from '../components/TarjetaEscultura'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Evento() {
    const [dataEvento, setDataEvento] = useState(null)
    const [imagenes, setImagenes] = useState(null)
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
            <article className="evento-detalle">
                {console.log(dataEvento)}

                <h1 className="evento-titulo">{dataEvento?.titulo}</h1>

                <img
                    src={dataEvento?.imagenPrincipal}
                    alt="Imagen del evento"
                    className="evento-imagen-principal"
                />

                <div className="evento-info">
                    <span>Lugar: {dataEvento?.lugar}</span>
                    <span>Fecha: {dataEvento?.fecha_inicio}</span>
                    <span>Temática: {dataEvento?.tematica}</span>
                </div>

                <p className="evento-descripcion">{dataEvento?.descripcion}</p>

                <div className="evento-galeria">
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

                <button className="evento-compartir">Compartir</button>
            </article>
            <Container>
                <Row>
                    {dataEvento?.esculturas?.map((escultura) => {
                        return (
                            <Col  key={escultura.id}>
                                <TarjetaEscultura
                                    
                                    escultura={escultura}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}

export default Evento
