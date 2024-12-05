import { useState } from 'react';
import CompartirModal from './CompartirModal';

// Este componente renderiza el botón de compartir y muestra el modal cuando se hace click
const CompartirBoton = ({ shareUrl }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => setModalOpen(true);

  // Función para cerrar el modal
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <button onClick={openModal} className="evento-compartir">Compartir</button>

      {/* Modal de Compartir */}
      <CompartirModal isOpen={modalOpen} closeModal={closeModal} shareUrl={shareUrl} />
    </>
  );
};

export default CompartirBoton;
