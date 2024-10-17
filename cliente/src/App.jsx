import './App.css'
import AñadirEventos from './pages/AñadirEvento'
import Eventos from './pages/Eventos'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />

                <Route path="/eventos" element={<Eventos/>}/>
                <Route path="/añadir-evento" element={<AñadirEventos />} />
            </Routes>
        </Router>
    )
}

export default App
