import './Footer.css';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '../assets/facebook.svg'
import TwitterIcon from '../assets/twitter.svg'
import InstagramIcon from '../assets/instagram.svg'
import YoutubeIcon from '../assets/youtube.svg'
import logoImgUrl from '../assets/logo.png'
function Footer() {
  const navigate = useNavigate()

  return (
    <footer>
      <div className='footerContent'>
        <img src={logoImgUrl} alt="Logo" className="logo" onClick={()=>{
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