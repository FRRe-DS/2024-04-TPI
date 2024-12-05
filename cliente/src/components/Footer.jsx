import './Footer.css';
import { useNavigate, Link } from 'react-router-dom';
import FacebookIcon from '../assets/facebook.svg'
import TwitterIcon from '../assets/twitter.svg'
import InstagramIcon from '../assets/instagram.svg'
import YoutubeIcon from '../assets/youtube.svg'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer>
      <div className='footerContent'>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff551f552aac233ecf80208718d70b8e1d84fc3ea9ac5df82b9ce2981f0db663?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c" alt="Logo" className="logo" onClick={()=>{
          navigate('/')
        }} />
        <p className="footerText">
          ® 2024 Bienal del Chaco – Terminos y Privacidad
        </p>
        <div className='social-media-icons'>
          <a href="https://www.facebook.com/bienaldelchaco"><FacebookIcon/></a>
          <a href="https://x.com/bienaldelchaco"><TwitterIcon/></a>
          <a href="https://www.instagram.com/bienaldelchaco/"><InstagramIcon/></a>
          <a href="https://www.youtube.com/BienaldelChaco"><YoutubeIcon/></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;