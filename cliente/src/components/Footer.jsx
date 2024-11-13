import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className='footerContent'>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff551f552aac233ecf80208718d70b8e1d84fc3ea9ac5df82b9ce2981f0db663?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c" alt="Logo" className="footerLogo" />
        <p className="footerText">
          ® 2024 Bienal del Chaco – Terminos y Privacidad
        </p>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8f03fe93853e0f65c9f4daa150009cd7956247a32054cc462df29834ddb84f3?placeholderIfAbsent=true&apiKey=30d7ef0f40b54a82bd2a50ed0795d71c" alt="Social Media Icons" className="socialIcons" />
      </div>
    </footer>
  );
}

export default Footer;