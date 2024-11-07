import StoneFaceImg from '../assets/stone-face.png'
function Home() {
    return (
        <>
            <div className="home-container">
                <h1 className='home-title'>Bienal Internacional de Escultura del Chaco</h1>
                <img src={StoneFaceImg} className="home-img" />
            </div>
        </>
    )
}
export default Home
