import React from "react";
import "./CompartirModal.css";
import ShareIcon from "../assets/share.svg"

const CompartirModal = ({ isOpen, closeModal, shareUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>x</button>
        <h2>Compartir</h2>
        <div>
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="modal-button whatsapp"><ShareIcon/> WhatsApp</a>
        </div>
        <div>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="modal-button facebook"><ShareIcon/> Facebook</a>
        </div>
        <div>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="modal-button twitter"><ShareIcon/> Twitter</a>
        </div>
      </div>
    </div>
  );
};

export default CompartirModal;