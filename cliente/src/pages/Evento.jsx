import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
            }finally{
                setLoading(false)
            }
        }
        obtenerData()
    }, [])

    if(error) return <span>Error...</span>
    if(loading) return <span>Cargando...</span>

    if (dataEvento && dataEvento.message) return <span>{dataEvento.message}</span>

    return (
        <>
            <h1>{dataEvento?.titulo}</h1>
            <p>{dataEvento?.descripcion}</p>
            <span>Fecha: {dataEvento?.fecha}</span>
            <span>Lugar: {dataEvento?.lugar}</span>
            <span>Temática: {dataEvento?.tematica}</span>
        </>
    )
}

export default Evento
