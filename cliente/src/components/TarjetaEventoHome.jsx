import testImg from '../assets/test.jpg'
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card'

function TarjetaEvento({ evento }) {
    const esculturaConImagen = evento.esculturas.find(escultura=>escultura.imagenes && escultura.imagenes.length > 0)
    
    const imageUrl = esculturaConImagen?.imagenes[0]?.imagen ? `http://127.0.0.1:8000${esculturaConImagen?.imagenes[0]?.imagen}` : testImg

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/eventos/${evento.id}`)
    }
    return (
        <Card
            className="bg-dark text-white max-h-[50px] tarjeta-evento"
            onClick={handleClick}
        >
            <Card.Img src={imageUrl} alt="Tarjeta Evento" />
            <Card.ImgOverlay>
                <Card.Title>{evento.titulo}</Card.Title>
                <Card.Text>{evento.descripcion}</Card.Text>
            </Card.ImgOverlay>
            <Card.Footer>
                <Card.Text>
                    Fecha de Inicio: <b>{evento.fecha_inicio}</b>
                </Card.Text>
                <Card.Text>
                    Fecha de Finalización: <b>{evento.fecha_fin}</b>
                </Card.Text>
            </Card.Footer>
        </Card>
    )
}

export default TarjetaEvento
