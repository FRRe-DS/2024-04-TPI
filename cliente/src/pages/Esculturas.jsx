import { useEffect, useState, useContext } from "react";
import useAuth from "../context/AuthContext";
import EsculturaCard from '../components/TarjetaEsculturaDetallada.jsx';
import { Modal, Button, Form } from "react-bootstrap";
import './Esculturas.css';
import AgregarEsculturaModal from '../components/AgregarEsculturaModal';

function EsculturasPage() {
  const [listaEsculturas, setListaEsculturas] = useState();
  const [loading, setLoading] = useState(false);
  const [showModalEscultura, setShowModalEscultura] = useState(false);
  const { user } = useContext(useAuth);

  useEffect(() => {
    async function obtenerTodasLasEsculturas() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/api/esculturas`,
          {
            method: 'GET',
          }
        );

        const data = await response.json();
        if (data.length > 0) {
          setListaEsculturas(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    obtenerTodasLasEsculturas();
  }, []);

  const handleSubmitEscultura = async (data) => {
      try {
          const response = await fetch('http://127.0.0.1:8000/api/esculturas/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ...data,
              }),
          
          });
          if (response.ok) {
              const nuevaEscultura = await response.json();
              console.log("Escultura creada:", nuevaEscultura);

              setShowModalEscultura(false);
              window.location.reload();
          } else {
              console.error("Error al crear la escultura");
          }
      } catch (error) {
          console.error("Error al enviar los datos", error);
      }
  };

  return (
    <div className="esculturasPage">
      {console.log(listaEsculturas)}
      <main className="mainContent">
        <section className="esculturasSection">
          <h2 className="esculturasTitle">Esculturas</h2>
          {user?.is_admin && (
                <div className="text-center mt-3">
                    <Button variant="dark" onClick={() => setShowModalEscultura(true)} className="mx-3">
                        Agregar Escultura
                    </Button>
                </div>
            )}
          {loading ? (
            <p>Cargando esculturas...</p>
          ) : (
            listaEsculturas?.map(escultura => (
              <EsculturaCard key={escultura.id} escultura={escultura} />
            ))
          )}
        </section>
      </main>

      <AgregarEsculturaModal 
                show={showModalEscultura} 
                handleClose={() => setShowModalEscultura(false)} 
                handleSubmit={handleSubmitEscultura}
                
      />
    </div>
  );
}

export default EsculturasPage;