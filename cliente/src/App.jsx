import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Hero from './components/Hero'
import AñadirEventos from './pages/AñadirEvento'
import Evento from './pages/Evento'
import Eventos from './pages/Eventos'
import Home from './pages/Home'
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import EventsPage from './pages/EventsPage';
function App() {
    return (
        <Router>
            <Header/>
            <Hero/>
            <Routes>
                <Route path="/" element={<Home/>} />

                <Route path="/eventos" element={<EventsPage/>}/>
                <Route path="/añadir-evento" element={<AñadirEventos />} />

                <Route path="/eventos/:id" element={<Evento/>} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
