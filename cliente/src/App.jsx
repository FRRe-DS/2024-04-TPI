import './App.css'
import Hero from './components/Hero'
import AñadirEventos from './pages/AñadirEvento'
import Evento from './pages/Evento'
import Eventos from './pages/Eventos'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    return (

            <Router>
            <AuthProvider>
                <Hero />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/eventos" element={<Eventos />} />
                    <Route path="/añadir-evento" element={<AñadirEventos />} />
                    <Route path="/evento/:id" element={<Evento />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </AuthProvider>
            </Router>
    )
}

export default App
