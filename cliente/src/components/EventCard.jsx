import'./EventCard.css';

function EventCard({evento}) {
  return (
    <article className='eventCard'>
      <div className="imageWrapper">
        <img src={evento?.esculturas[0]?.imagenes[0]?.imagen} alt={evento.titulo} className="eventImage" />
        <div className="eventName">{evento?.titulo}</div>
      </div>
      <div className="eventDetails">
        <p className="eventDescription">{evento?.descripcion}</p>
        <p className="eventDate">Fecha de Inicio: {evento?.fecha_inicio}</p>
        <div className="eventLocation">
          <span>Lugar: {evento?.lugar}</span>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e458362ec5b01ad669b7dc5c3dfc6c8cf93e9acb25f66f480a35224a9cf7f2db?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c" alt="" className="locationIcon" />
        </div>
      </div>
    </article>
  );
}

export default EventCard;