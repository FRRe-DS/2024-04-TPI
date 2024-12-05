import './Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
const navItems = ['Eventos', 'Esculturas', 'Escultores'];
import logoImgUrl from '../assets/logo.png'
function Header() {
  const navigate = useNavigate()
  const {user, logoutUser} = useAuth()
  
  return (
    <header >
      <nav>
        <img src={logoImgUrl} alt="Biennale Logo" className='logo' onClick={()=>{
          navigate('/')
        }}/>
        
        {navItems.map((item)=>{
          return <Link key={item} to={`/${item.toLocaleLowerCase()}`} className='navItem'>{item}</Link>
        })}
        {user ? <button onClick={logoutUser}>Cerrar sesión</button> : <button onClick={()=>navigate('/login/')}>Iniciar sesión</button>}
        
      </nav>
    </header>
  );
}

export default Header;