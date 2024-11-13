import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Hero from './components/Hero'
import AñadirEventos from './pages/AñadirEvento'
import Evento from './pages/Evento'
import Home from './pages/Home'
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Eventos from './pages/Eventos';
function App() {
    return (
        <Router>
            <div>
            <Header/>
            <Hero/>

            </div>
            <Routes>
                <Route path="/" element={<Home/>} />

                <Route path="/eventos" element={<Eventos/>}/>
                <Route path="/añadir-evento" element={<AñadirEventos />} />

                <Route path="/eventos/:id" element={<Evento/>} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
