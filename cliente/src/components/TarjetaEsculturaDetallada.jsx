import { useNavigate } from 'react-router-dom';
import './TarjetaEsculturaDetallada.css'; // Asegúrate de tener los estilos adecuados
import testImg from '../assets/test.jpg'; // Imagen por defecto

function EsculturaCard({ escultura }) {
  const navigate = useNavigate();

  // Comprobar si la escultura tiene imágenes asociadas
  const esculturaConImagen = escultura.imagenes && escultura.imagenes.length > 0;
  const imageUrl = esculturaConImagen ? escultura.imagenes[0].imagen : testImg;

  // Obtener los detalles de la escultura
  const { titulo, descripcion, escultor, fecha_creacion, tematica } = escultura;

  // Manejar la acción de hacer clic en la tarjeta
  const handleClick = () => {
    navigate(`/esculturas/${escultura.id}`); // Redirigir a la página de detalles de la escultura
  };

  return (
    <article className="esculturaCard" onClick={handleClick}>
      <div className="imageWrapper">
        <img
          src={imageUrl}
          alt={titulo}
          className="esculturaImage"
        />
        <div className="esculturaName">{titulo}</div>
      </div>
      <div className="esculturaDetails">
        <p className="esculturaDescription">{descripcion}</p>
        <div className="esculturaDescriptionData">
          <span className="esculturaDate">
            Fecha de Creación: <b>{fecha_creacion}</b>
          </span>
          <span className="esculturaAuthor">
            Autor: <b>{escultor.nombre}</b>
          </span>

          <div className="esculturaLocation">
            <span>
              Temática: <b>{tematica}</b>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EsculturaCard;