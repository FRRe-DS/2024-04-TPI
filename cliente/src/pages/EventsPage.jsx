import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import './EventsPage.css';

const eventsData = [
  {
    id: 1,
    name: 'Nombre evento',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2a505df5d5e7edabcde55ed879375f736efd8be100708ab72f4ed12c6941afa8?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    date: '10/12/2024',
    location: 'Resistencia'
  },
  {
    id: 2,
    name: 'Nombre evento',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2a505df5d5e7edabcde55ed879375f736efd8be100708ab72f4ed12c6941afa8?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    date: '10/12/2024',
    location: 'Resistencia'
  },
  {
    id: 3,
    name: 'Nombre evento',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2a505df5d5e7edabcde55ed879375f736efd8be100708ab72f4ed12c6941afa8?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    date: '10/12/2024',
    location: 'Resistencia'
  },
  {
    id: 4,
    name: 'Nombre evento',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2a505df5d5e7edabcde55ed879375f736efd8be100708ab72f4ed12c6941afa8?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    date: '10/12/2024',
    location: 'Resistencia'
  },
  {
    id: 5,
    name: 'Nombre evento',
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2a505df5d5e7edabcde55ed879375f736efd8be100708ab72f4ed12c6941afa8?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    date: '10/12/2024',
    location: 'Resistencia'
  }
];

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
    }, [])
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