import testImg from '../assets/test.jpg'
import { Link } from 'react-router-dom'
function TarjetaEvento({ evento }) {

    return (
        <article className="tarjeta-evento">
            <img src={testImg} alt='Imagen evento'/>
            <h4>{evento.titulo}</h4>
            <p className="tarjeta-evento-descripcion">{evento.descripcion}</p>
            <Link to={`/evento/${evento.id}`}>Ver evento</Link>
        </article>
    )
}


export default TarjetaEvento
