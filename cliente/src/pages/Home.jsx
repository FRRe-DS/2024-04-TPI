import { useEffect, useState } from 'react'

import TarjetaEventoHome from '../components/TarjetaEventoHome'

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
                if (data.length > 0) {
                    setEventosActuales(data)
                }
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        obtenerEventosActivos()
    },[])


    return (
        <>
            <div className='home-eventos-container'>
                <h2>Eventos en curso</h2>
                {loading ? <span>Cargando eventos...</span> : <></>}
                <div className='eventos-tarjetas-container'>
                    {eventosActuales?.map((ev) => {
                        return <TarjetaEventoHome key={ev.id} evento={ev} />
                    })}
                </div>
            </div>
        </>
    )
}
export default Home
