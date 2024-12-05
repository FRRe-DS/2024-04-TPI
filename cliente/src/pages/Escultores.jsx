import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import TarjetaEscultorDetallada from "../components/TarjetaEscultorDetallada";
import useAuth from "../context/AuthContext";
import { Modal, Button, Form } from "react-bootstrap";
import "./Escultores.css";

function EscultoresPage() {
  const [listaEscultores, setListaEscultores] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(useAuth);
  const [fechaError, setFechaError] = useState('');
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  
  const [nuevoEscultor, setNuevoEscultor] = useState({
    nombre: "",
    nacionalidad: "",
    biografia: "",
    contacto: "",
    fecha_nacimiento: "",
    imagen: null,
  });

  // Manejo de modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Manejo de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEscultor((prev) => ({ ...prev, [name]: value }));
  };

    // Función para validar la fecha de nacimiento
    const handleFechaNacimientoChange = (e) => {
      handleInputChange(e)
    };

  useEffect(() => {
    if (new Date(nuevoEscultor.fecha_nacimiento) > new Date()) {
      setFechaError('La fecha de nacimiento no puede ser futura');
    } else {
        setFechaError('');
    }
  }, [nuevoEscultor.fecha_nacimiento]);

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fechaError) {
        return;
    }

    try {
          const formData = new FormData();

          // Agrega los campos al FormData
          formData.append('nombre', nuevoEscultor.nombre);
          formData.append('nacionalidad', nuevoEscultor.nacionalidad);
          formData.append('biografia', nuevoEscultor.biografia);
          formData.append('contacto', nuevoEscultor.contacto);
          formData.append('fecha_nacimiento', nuevoEscultor.fecha_nacimiento);

          if (nuevoEscultor.imagen) {
              formData.append('imagen', nuevoEscultor.imagen);
          }

          const response = await fetch("http://127.0.0.1:8000/api/escultores/", {
              method: "POST",
              body: formData, // Enviar FormData en el cuerpo
          });

          if (response.ok) {
              alert('Escultor generado exitosamente');
              const data = await response.json();
              setListaEscultores((prev) => [...prev, data]); // Agregar el nuevo escultor a la lista
              setShowModal(false); // Cerrar el modal

              setNuevoEscultor({
                  nombre: "",
                  nacionalidad: "",
                  biografia: "",
                  contacto: "",
                  fecha_nacimiento: "",
                  imagen: null,
              });

              navigate(`/escultores/${data.data.id}`);
          } else {
              console.error("Error al agregar escultor");
          }
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
    async function obtenerTodosLosEscultores() {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/escultores", {
          method: "GET",
        });

        const data = await response.json();
        if (data.length > 0) {
          setListaEscultores(data);
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
          {user?.is_admin && (
            <div className="text-center mt-3">
              <Button variant="dark" onClick={handleShowModal}>
                Crear nuevo escultor
              </Button>
            </div>
          )}
          {loading ? (
            <p>Cargando escultores...</p>
          ) : (
            listaEscultores?.map((escultor) => (
              <TarjetaEscultorDetallada key={escultor.id} escultor={escultor} />
            ))
          )}
        </section>
      </main>

      {/* Modal para agregar escultor */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo escultor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nuevoEscultor.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="nacionalidad">
              <Form.Label>Nacionalidad</Form.Label>
              <Form.Control
                type="text"
                name="nacionalidad"
                value={nuevoEscultor.nacionalidad}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="biografia">
              <Form.Label>Biografía</Form.Label>
              <Form.Control
                type="text"
                name="biografia"
                value={nuevoEscultor.biografia}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="contacto">
              <Form.Label>Contacto</Form.Label>
              <Form.Control
                type="text"
                name="contacto"
                value={nuevoEscultor.contacto}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="fecha_nacimiento">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fecha_nacimiento"
                value={nuevoEscultor.fecha_nacimiento}
                onChange={handleFechaNacimientoChange}
                required
              />
            </Form.Group>
            {fechaError && <div style={{ color: 'red' }}>{fechaError}</div>}
            <Form.Group controlId="formImagen">
                <Form.Label>Foto</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setNuevoEscultor((prev) => ({
                            ...prev,
                            imagen: e.target.files[0], // Guardar el archivo seleccionado
                        }))
                    }
                />
            </Form.Group>
            <div className="text-center mt-3">
              <Button variant="danger" className="mt-3 mx-2" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="success" type="submit" className="mt-3 mx-2">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default EscultoresPage;