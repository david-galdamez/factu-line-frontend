import React from 'react';

function ContentSection() {
  return (
    <section className="content-section">
      <link rel="stylesheet" href="3d.css" />
      
      <div className="content-text">
        <h2>Facturación electrónica en El Salvador: Innovación Tributaria y Ventajas Sostenibles</h2>
        <p>
          La Factura Electrónica es la representación digital de los Documentos Tributarios Electrónicos (DTE) que se ajusta a las normativas establecidas por la Ley del Impuesto IVA y el Código Tributario. A través de esta iniciativa, la Dirección General de Impuestos Internos (DGII) tiene como objetivo modernizar los procedimientos tributarios, ampliar la base tributaria para alcanzar a más contribuyentes, y minimizar la evasión y elusión fiscal. Todo esto contribuye a optimizar la recaudación de impuestos del estado.
        </p>
      </div>
      <div className="content-image">
        <img 
          src="/public/assets/factura.png" 
          alt="Facturación electrónica" 
        />
      </div>
    </section>
  );
}

export default ContentSection;