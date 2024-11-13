import { useNavigate } from 'react-router-dom'
import './TarjetaEventoDetallada.css'

function EventCard({ evento }) {
    const navigate = useNavigate()
    const esculturaConImagen = evento.esculturas.find(escultura=>escultura.imagenes && escultura.imagenes.length > 0)

    const handleClick = () =>{
      navigate(`/eventos/${evento.id}`)
    }
    return (
        <article className="eventCard" onClick={handleClick}>
            <div className="imageWrapper">
                {!esculturaConImagen ? <></> :
                <img
                    src={esculturaConImagen?.imagenes[0]?.imagen}
                    alt={evento.titulo}
                    className="eventImage"
                />}
                <div className="eventName">{evento?.titulo}</div>
            </div>
            <div className="eventDetails">
                <p className="eventDescription">{evento?.descripcion}</p>
                <div className='eventDescriptionData'>
                    <span className="eventDate">
                        Fecha de Inicio: <b>{evento?.fecha_inicio}</b>
                    </span>
                    <span className="eventDate">
                        Fecha de Finalización: <b>{evento?.fecha_fin}</b>
                    </span>

                    <div className="eventLocation">
                        <span>
                            Lugar: <b>{evento?.lugar}</b>
                        </span>
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e458362ec5b01ad669b7dc5c3dfc6c8cf93e9acb25f66f480a35224a9cf7f2db?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c"
                            alt=""
                            className="locationIcon"
                        />
                    </div>
                </div>
            </div>
        </article>
    )
}

export default EventCard
