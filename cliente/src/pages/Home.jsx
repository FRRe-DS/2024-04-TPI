import { useEffect, useState } from 'react'
import MockEventos from '../mocks/eventos.json'
import TarjetaEvento from '../components/TarjetaEvento'

function Home() {
    const [eventosActuales, setEventosActuales] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function obtenerEventosActivos() {
            try {
                setLoading(true)
                const response = await fetch(
                    `http://127.0.0.1:8000/api/eventos/activos`,
                    {
                        method: 'GET',
                    }
                )

                const data = await response.json()
                if(data.length > 0){
                    setEventosActuales(data)

                }
                
            } catch (e) {
                console.error(e)
            }finally{
                setLoading(false)
            }
        }
        obtenerEventosActivos()
    }, [])

    useEffect(()=>{
        console.log(eventosActuales)
    },[eventosActuales])

    return (
        <>
            <section id="seccion-eventos">
                <h2>Eventos</h2>
                <div className="home-eventos-container">
                    {loading ? <span>Cargando eventos...</span> : <></>}
                    {eventosActuales?.map((ev) => {
                        
                        return (
                            <div
                                key={ev.id}
                                className="tarjeta-evento-container"
                            >
                                <time>{ev.fecha_inicio}  {ev.fecha_fin}</time>
                                <TarjetaEvento evento={ev} />
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
export default Home
