import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="logo"> 
        Factuline
      </div>
      <nav>
        <ul>
          <li className='nav-list'><a href="#inicio">Inicio</a></li>
          <li className='nav-list'><a href="#clientes">Clientes</a></li>
          <li className='nav-list'><a href="#crear-factura">Crear factura</a></li>
          <li className='nav-list'><a href="#archivo">Archivo</a></li>
          <li className='nav-list'><a href="#productos">Productos</a></li>
        </ul>
      </nav>
      <button className="btn btn-login">Iniciar Sesión</button>
    </header>
  );
}

export default Header;