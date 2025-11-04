import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero reveal-on-scroll">
      <h1>Simplifica la facturación de tu negocio</h1>
      <p>Crea, administra y realiza un seguimiento de tus facturas con nuestra potente solución de facturación en línea.</p>
      <Link to="/register" className="btn btn-register">Regístrate</Link>
    </section>
  );
}

export default Hero;