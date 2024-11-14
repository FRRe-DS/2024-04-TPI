import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Hero from './components/Hero'
import AñadirEventos from './pages/AñadirEvento'
import Evento from './pages/Evento'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Login'
import Esculturas from './pages/Esculturas'
import Escultores from './pages/Escultores'
import { AuthProvider } from './context/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Eventos from './pages/Eventos';
import RegistrarVisitante from './pages/RegistrarVisitante';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div>
                    <Header />
                    <Hero />

                </div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/eventos" element={<Eventos />} />
                    <Route path="/esculturas" element={<Esculturas />} />
                    <Route path="/escultores" element={<Escultores />} />
                    <Route path="/añadir-evento" element={<AñadirEventos />} />
                    <Route path="/eventos/:id" element={<Evento />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registrar" element={<RegistrarVisitante />} />
                </Routes>
                <Footer />
            </AuthProvider>
        </Router>
    )
}

export default App
