import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <div className="logo-image">
          <img src="/assets/logo_factuline.svg" alt="FactuLine Logo" className="register-logo" />
        </div>
      </Link>

      <nav>
        <ul>
          <li className='nav-list'><Link to="/">Inicio</Link></li>
          <li className='nav-list'><a href="#clientes">Clientes</a></li>
          <li className='nav-list'><a href="#crear-factura">Crear factura</a></li>
          <li className='nav-list'><a href="#archivo">Archivo</a></li>
          <li className='nav-list'><a href="#productos">Productos</a></li>
        </ul>
      </nav>
      
      <Link to="/Login" className="btn btn-login">
        Iniciar Sesión
      </Link>
    </header>
  );
}

export default Header;