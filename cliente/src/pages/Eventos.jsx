import { useEffect, useState } from 'react';
import EventCard from '../components/TarjetaEventoDetallada';
import './Eventos.css';

function EventsPage() {
  const [listaEventos, setListaEventos] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function obtenerTodosLosEventos() {
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
                  setListaEventos(data)
                }
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        obtenerTodosLosEventos()
    },[])
  return (
    <div className='eventsPage'>
      <main className='mainContent'>
        <section className='eventsSection'>
          <h2 className='eventsTitle'>Eventos</h2>
          {listaEventos?.map(event => (
            <EventCard key={event.id} evento={event} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default EventsPage;