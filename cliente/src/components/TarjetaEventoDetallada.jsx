import { useNavigate } from 'react-router-dom';
import './TarjetaEventoDetallada.css';
import testImg from '../assets/test.jpg'

function EventCard({ evento }) {
    const navigate = useNavigate();
    
    const esculturaConImagen = evento.esculturas?.find(escultura=>escultura.imagenes && escultura.imagenes.length > 0)
    const imageUrl = esculturaConImagen?.imagenes[0]?.imagen ? esculturaConImagen?.imagenes[0]?.imagen : testImg

    // Obtener la fecha actual
    const currentDate = new Date();

    // Comparar la fecha actual con las fechas de inicio y fin del evento
    const fechaInicio = new Date(evento?.fecha_inicio);
    const fechaFin = new Date(evento?.fecha_fin);

    // Determinar el estado del evento
    let estadoEvento = '';
    if (fechaInicio > currentDate) {
        estadoEvento = 'Proximamente';
    } else if (fechaInicio <= currentDate && fechaFin >= currentDate) {
        estadoEvento = 'En curso';
    } else {
        estadoEvento = 'Finalizado'
    }

    const handleClick = () => {
        navigate(`/eventos/${evento.id}`);
    };

    return (
        <article className="eventCard" onClick={handleClick}>
            <div className="imageWrapper">
                <img
                    src={imageUrl}
                    alt={evento.titulo}
                    className="eventImage"
                />
                <div className="eventName">{evento?.titulo}</div>
            </div>
            <div className="eventDetails">
                <p className="eventDescription">{evento?.descripcion}</p>
                <div className='eventDescriptionData'>
                    <span className="eventDate">
                        Fecha de inicio: <b>{evento?.fecha_inicio}</b>
                    </span>
                    <span className="eventDate">
                        Fecha de finalización: <b>{evento?.fecha_fin}</b>
                    </span>

                    <div className="eventLocation">
                        <span>
                            Lugar: <b>{evento?.lugar}</b>
                        </span>
                    </div>
                </div>
                <div className="eventStatus">
                    <b>{estadoEvento}</b>
                </div>
            </div>
        </article>
    );
}

export default EventCard;
