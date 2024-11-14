import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Evento.css'
import Container from 'react-bootstrap/Container'

import ControlesVotacion from '../components/ControlesVotacion'
import LoginModal from '../components/LoginModal'
function Evento() {
    const [dataEvento, setDataEvento] = useState(null)
    const [showModal,setShowModal] = useState(false)
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
                console.log(data)
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
                                <span className="evento-galeria-titulo">
                                    {escultura.titulo}
                                </span>
                                <img
                                    src={escultura.imagenes[0]?.imagen}
                                    alt={escultura.titulo}
                                    className="evento-galeria-imagen"
                                />

                                <span>Autor: {escultura.escultor.nombre}</span>

                                <div className="galeria-item-opciones">
                                    <b>Votar:</b>
                                    <ControlesVotacion idEscultura={escultura.id} openModal={()=>setShowModal(true)}/>

                                </div>
                            </div>
                        )
                    })}
                </div>
                <LoginModal isOpen={showModal} closeModal={()=>setShowModal(false)}/>
            </Container>
        </>
    )
}

export default Evento
