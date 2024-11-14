import { useEffect, useState } from 'react';
import TarjetaEscultorDetallada from '../components/TarjetaEscultorDetallada'; // Componente para mostrar cada escultor
import './Escultores.css'; // Asegúrate de tener una hoja de estilos para la sección de escultores

function EscultoresPage() {
  const [listaEscultores, setListaEscultores] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function obtenerTodosLosEscultores() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/api/escultores`, // Endpoint para obtener los escultores
          {
            method: 'GET',
          }
        );

        const data = await response.json();
        if (data.length > 0) {
          setListaEscultores(data); // Almacena los escultores en el estado
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    obtenerTodosLosEscultores();
  }, []);

  return (
    <div className="escultoresPage">
      <main className="mainContent">
        <section className="escultoresSection">
          <h2 className="escultoresTitle">Escultores</h2>
          {loading ? (
            <p>Cargando escultores...</p>
          ) : (
            listaEscultores?.map(escultor => (
              <TarjetaEscultorDetallada key={escultor.id} escultor={escultor} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default EscultoresPage;