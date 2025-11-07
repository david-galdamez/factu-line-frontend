// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <footer className="footer">
      

      <div className="footer-content">
        

        <div className="footer-brand-section">
          <div className="footer-logo-container">
             <span className="footer-brand-name">FactuLine</span>
          </div>
          <p className="footer-description">
            Tu socio en transformación digital, conecta a los mejores profesionales 
            para ofrecer soluciones ágiles de facturación electrónica en El Salvador.
          </p>
          
          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">in</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">IG</a>
          </div>
        </div>

        <div className="footer-contact-section">
          <h3>Contáctanos</h3>
          <a href="mailto:info@factuline.com" className="contact-email">
            <span className="email-icon">✉️</span> 
            info@factuline.com
          </a>
        </div>

      </div>

      <div className="footer-copyright">
        <p>© 2025 FactuLine - Todos los derechos reservados.</p>
      </div>

    </footer>
  );
}

export default Footer;