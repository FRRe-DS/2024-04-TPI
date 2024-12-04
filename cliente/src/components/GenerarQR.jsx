import { useState, useEffect } from 'react';

function GenerarQR({ esculturaId }) {
    const [qrImage, setQrImage] = useState(null);

    useEffect(() => {
        if (esculturaId) {
            const obtenerQR = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/esculturas/generar-qr/${esculturaId}`);
                    if (response.ok) {
                        const qrBlob = await response.blob();
                        const qrUrl = URL.createObjectURL(qrBlob);
                        setQrImage(qrUrl);
                    } else {
                        console.error('Error al obtener QR');
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            };
            obtenerQR();
        }
    }, [esculturaId]);

    return (
        <div>
            {qrImage ? (
                <img src={qrImage} alt="QR de la escultura" />
            ) : (
                <p>Generando QR...</p>
            )}
        </div>
    );
}

export default GenerarQR;