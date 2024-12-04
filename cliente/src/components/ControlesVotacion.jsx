import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import GenerarQR from "./GenerarQR"; // Asegúrate de importar GenerarQR
import './ControlesVotacion.css';

function ControlesVotacion({ idEscultura, openModal }) {
    const { authTokens } = useAuth();
    const [votado, setVotado] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkVotacion = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/votaciones/votaciones-visitante`, 
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                }
            );
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    openModal();
                } else {
                    throw new Error("Error en la consulta de votaciones.");
                }
            } else {
                const yaVoto = data.some((votacion) => votacion.escultura === idEscultura);
                setVotado(yaVoto);
            }
        } catch (error) {
            console.error("Error al obtener las votaciones:", error);
            setVotado(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkVotacion();
    }, [idEscultura]);

    const handleClick = async (value) => {
        const confirmVote = window.confirm("¿Estás seguro de que deseas votar con este puntaje?");
        
        if (!confirmVote) {
            // Si el usuario cancela, no se realiza la votación.
            return;
        }
    
        try {
            const bodyJSON = { puntaje: value };
            const response = await fetch(
                `http://127.0.0.1:8000/api/esculturas/${idEscultura}/votar/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                    body: JSON.stringify(bodyJSON),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401) {
                    openModal();
                } else if (response.status === 400) {
                    window.alert(data.detail);
                } else {
                    throw new Error(`Error en la solicitud: ${response.status} ${data.detail || response.statusText}`);
                }
            } else {
                window.alert(data.detail);
                setVotado(true);
            }
        } catch (e) {
            console.error("Error en la solicitud:", e);
            openModal();
        }
    };
    

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="controles-votacion">
            {votado ? (
                <div>Ya has votado por esta escultura</div>
            ) : (
                <>
                    <div className="botones-votacion">
                        <button onClick={() => handleClick(1)}>1</button>
                        <button onClick={() => handleClick(2)}>2</button>
                        <button onClick={() => handleClick(3)}>3</button>
                        <button onClick={() => handleClick(4)}>4</button>
                        <button onClick={() => handleClick(5)}>5</button>
                    </div>
                    <div className="qr-votacion">
                        <GenerarQR esculturaId={idEscultura} />
                    </div>
                </>
            )}
        </div>
    );
}

export default ControlesVotacion;