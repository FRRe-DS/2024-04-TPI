import { useNavigate } from 'react-router-dom';
import './TarjetaEscultorDetallada.css'; // Asegúrate de tener los estilos adecuados
import testImg from '../assets/testImgEscultor.jpg'; // Imagen por defecto

function TarjetaEscultorDetallada({ escultor }) {
  const navigate = useNavigate();

  // Comprobar si el escultor tiene una imagen asociada
  const escultorConImagen = escultor.imagen ? true : false;
  const imageUrl = escultorConImagen ? escultor.imagen : testImg;

  // Obtener los detalles del escultor
  const { nombre, biografia, fecha_nacimiento, nacionalidad, contacto} = escultor;

  // Manejar la acción de hacer clic en la tarjeta
  const handleClick = () => {
    navigate(`/escultores/${escultor.id}`); // Redirigir a la página de detalles del escultor
  };

  return (
    <article className="escultorCard" onClick={handleClick}>
      <div className="imageWrapper">
        <img
          src={imageUrl}
          alt={nombre}
          className="escultorImage"
        />
        <div className="escultorName">{nombre}</div>
      </div>
      <div className="escultorDetails">
        <p className="escultorBio">{biografia}</p>
        <div className="escultorDescriptionData">
        <span className="escultorBirthDate">
            Fecha de Nacimiento: <b>{fecha_nacimiento}</b>
          </span>
          <span className="escultorNacionalidad">
            País de Nacimiento: <b>{nacionalidad}</b>
          </span>
          <span className="escultorDeathDate">
            Contacto: <b>{contacto}</b>
          </span>
        </div>
      </div>
    </article>
  );
}

export default TarjetaEscultorDetallada;