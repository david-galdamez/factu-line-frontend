import React from 'react';

function ContentSection() {
  return (
    <section className="content-section">



      <div className="content-image-mac">
        <img 
          src="/public/assets/macbook-muckup.png" 
          alt="Facturación electrónica" 
        />
      </div>

      <div className="content-text">
        <h2>Accede desde cualquier lugar</h2>
        <p>
         FactuLine es una plataforma de facturación electrónica que te brinda la comodidad y flexibilidad de acceder desde cualquier dispositivo, ya sea que estés en tu computadora de escritorio, tu laptop o tu dispositivo móvil. Con FactuLine, no importa dónde te encuentres, puedes gestionar tus facturas de manera eficiente y cumplir con tus obligaciones fiscales sin importar el dispositivo que prefieras utilizar.
        </p>
      </div>
    
    </section>
  );
}

export default ContentSection;