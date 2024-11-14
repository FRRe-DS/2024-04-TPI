import './Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
const navItems = ['Eventos', 'Esculturas', 'Escultores'];

function Header() {
  const navigate = useNavigate()
  const userContext = useAuth()
  console.log(userContext)
  return (
    <header >
      <nav>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff551f552aac233ecf80208718d70b8e1d84fc3ea9ac5df82b9ce2981f0db663?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c" alt="Biennale Logo" className='logo' onClick={()=>{
          navigate('/')
        }}/>
        
        {navItems.map((item)=>{
          return <Link key={item} to={`/${item.toLocaleLowerCase()}`} className='navItem'>{item}</Link>
        })}
        {userContext.authTokens ? <button>Cerrar sesión</button> : <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f24694e27ccc4885e652c75170782aac661dd9e72ce330a4db559cdee1fa8a82?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c" alt="Menu" className={'menuIcon'} />}
        
      </nav>
    </header>
  );
}

export default Header;