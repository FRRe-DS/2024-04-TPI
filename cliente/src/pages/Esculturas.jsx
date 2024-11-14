import { useEffect, useState } from 'react';
import EsculturaCard from '../components/TarjetaEsculturaDetallada.jsx'; // Componente para mostrar cada escultura
import './Esculturas.css'; // Asegúrate de tener una hoja de estilos para la sección de esculturas

function EsculturasPage() {
  const [listaEsculturas, setListaEsculturas] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function obtenerTodasLasEsculturas() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/api/esculturas`, // Endpoint para obtener las esculturas
          {
            method: 'GET',
          }
        );

        const data = await response.json();
        if (data.length > 0) {
          setListaEsculturas(data); // Almacena las esculturas en el estado
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    obtenerTodasLasEsculturas();
  }, []);

  return (
    <div className="esculturasPage">
      <main className="mainContent">
        <section className="esculturasSection">
          <h2 className="esculturasTitle">Esculturas</h2>
          {loading ? (
            <p>Cargando esculturas...</p>
          ) : (
            listaEsculturas?.map(escultura => (
              <EsculturaCard key={escultura.id} escultura={escultura} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default EsculturasPage;