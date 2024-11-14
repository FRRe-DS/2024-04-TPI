import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem("authTokens") ? 
        JSON.parse(localStorage.getItem("authTokens"))
        : null
    );

    const [user, setUser] = useState(
        localStorage.getItem("authTokens") ? 
        jwtDecode(localStorage.getItem("authTokens"))
        : null
    );

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        try {
            let url = "http://127.0.0.1:8000/api/visitantes/token/";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
            console.log(data);
    
            if (response.status === 200) {
                setAuthTokens(data);
                const decodedUser = jwtDecode(data.access);
                setUser(decodedUser);
                localStorage.setItem("authTokens", JSON.stringify(data));
    
                // Redirigir a la página según el rol del usuario
                console.log(decodedUser)
                const userRole = decodedUser.is_admin;
                if (userRole === true) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
    
                Swal.fire({
                    title: "Sesión iniciada correctamente",
                    icon: "success",
                    toast: true,
                    timer: 1300,
                    position: 'top',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            } else {
                setError(data.message || "Error al iniciar sesión");
                Swal.fire({
                    title: 'No se pudo iniciar sesión',
                    text: 'Usuario o contraseña incorrecta',
                    icon: 'error',
                    toast: true,
                    timer: 8000,
                    position: 'top',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            // Verificar si el error es de conexión
            if (error.message.includes('Failed to fetch') || error.message.includes('net::ERR_CONNECTION_REFUSED')) {
                Swal.fire({
                    title: 'No se pudo iniciar sesión',
                    text: 'Usuario o contraseña incorrecta',
                    icon: 'error',
                    toast: true,
                    timer: 8000,
                    position: 'top',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            } else {
                // Manejar otros errores
                Swal.fire({
                    title: 'No se pudo iniciar sesión',
                    text: 'Usuario o contraseña incorrecta',
                    icon: 'error',
                    toast: true,
                    timer: 8000,
                    position: 'top',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
        }
    };

    const refreshToken = async () => {
        const url = "http://127.0.0.1:8000/api/visitantes/token/refresh/";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refresh: authTokens.refresh })
            });
    
            if (response.ok) {
                const data = await response.json();
    
                const updatedTokens = {
                    access: data.access,
                    refresh: authTokens.refresh
                };
    
                setAuthTokens(updatedTokens);
                setUser(jwtDecode(data.access)); 
                localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
            } else {
                logoutUser();
            }
        } catch (error) {
            console.error("Error al refrescar el token:", error);
            logoutUser();
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate(0);
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        loginUser,
        logoutUser,
        refreshToken
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (authTokens) {
                const { exp } = jwtDecode(authTokens.access);
                const expirationTime = exp * 1000;
                const currentTime = Date.now();

                if (expirationTime - currentTime < 5 * 60 * 1000) {
                    refreshToken();
                }
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [authTokens, refreshToken]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (authTokens) {
                const { exp } = jwtDecode(authTokens.access);
                const expirationTime = exp * 1000;
                const currentTime = Date.now();

                if (expirationTime < currentTime) {
                    logoutUser();
                }
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [authTokens, logoutUser]);

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

// Export default AuthContext
export default AuthContext;

// Export useAuth hook
export const useAuth = () => useContext(AuthContext);