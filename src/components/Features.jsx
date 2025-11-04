import React from 'react';

const featuresList = [
  { title: 'Generación rápida de facturas' },
  { title: 'Gestión de clientes y productos' },
  { title: 'Informe y estadísticas' }
];


function Features() {
  return (
    <section className="features reveal-on-scroll reveal-stagger">
      <h2>¿Cómo simplificamos tu negocio?</h2>
      <div className="features-container">
        {featuresList.map((feature, index) => (
          <div className="feature-card reveal-on-scroll" key={index}>
            <p>{feature.title}</p>
            <div className="image-placeholder">
              <span>Imagen</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;