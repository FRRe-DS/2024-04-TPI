import { useEffect, useState } from 'react'

import TarjetaEventoHome from '../components/TarjetaEventoHome'
import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
function Home() {
    const [eventosActuales, setEventosActuales] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function obtenerEventosActivos() {
            try {
                setLoading(true)
                const response = await fetch(
                    `http://127.0.0.1:8000/api/eventos`,
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
    }, [])


    return (
        <>
            <Container style={{minHeight:'240px'}}>
                <h2>Eventos</h2>
                {loading ? <span>Cargando eventos...</span> : <></>}
                <Stack direction="horizontal" gap={4}>
                    {eventosActuales?.map((ev) => {
                        return <TarjetaEventoHome key={ev.id} evento={ev} />
                    })}
                </Stack>
            </Container>
        </>
    )
}
export default Home
