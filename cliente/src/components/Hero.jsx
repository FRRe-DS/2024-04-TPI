import StoneFaceImg from '../assets/stone-face.png'

function Hero() {
    return (
        <div className="hero-container">
            <h1 className="hero-title">
                Bienal Internacional de Escultura del Chaco
            </h1>
            <img src={StoneFaceImg} className="hero-img" />
        </div>
    )
}

export default Hero