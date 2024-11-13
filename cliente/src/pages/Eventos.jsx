import { useEffect, useState } from "react"
import Stack from 'react-bootstrap/Stack';
function Eventos() {
    const [eventos,setEventos] = useState(null)

    useEffect(()=>{
        async function obtenerEventos(){
            const response = await fetch('http://127.0.0.1:8000/api/eventos/',{
                method:'GET'
            })


            const data = await response.json()
            setEventos(data)
        }
        obtenerEventos()
    },[])
    
    return (
        <>
            <Stack direction="horizontal" gap={3}>
                {eventos?.map(evento=>{
                    
                    return <div key={evento.id}>
                        <h1>{evento.titulo}</h1>
                        <p>{evento.descripcion}</p>
                        <span>Fecha: {evento.fecha}</span>
                        <span>Lugar: {evento.lugar}</span>
                        <span>Temática: {evento.tematica}</span>
                    </div>
                })}
            </Stack>
        </>
    )
}

export default Eventos
