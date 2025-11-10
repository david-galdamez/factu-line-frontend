import imgFacturas from '/assets/feature-facturas.png';
import imgClientes from '/assets/feature-clientes.png';
import imgEstadisticas from '/assets/feature-estadisticas.png';


const featuresList = [
  { 
    title: 'Generación rápida de facturas', 
    image: imgFacturas,
    description: 'Crea facturas profesionales en segundos y envíalas automáticamente a tus clientes.'
  },
  { 
    title: 'Gestión de clientes y productos', 
    image: imgClientes ,
    description: 'Mantén tu base de datos organizada y accede rápidamente a la información de tus contactos.'
  },
  { 
    title: 'Informe y estadísticas', 
    image: imgEstadisticas,
    description: 'Obtén información valiosa sobre el rendimiento de tu negocio con informes detallados.'
  }
];

function Features() {
  
  return (
    
    <section className="features">
      <h2>¿Cómo simplificamos tu negocio?</h2>


      <div className="features-container">
        {featuresList.map((feature, index) => (
          <div className="card" key={index}>
            <div className='card-inner'>
              <div className="card-front">
                <div className="image-container">
                                  <p>{feature.title}</p>

                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="feature-img" 
                  />
                </div>
              </div>

              <div className="card-back">
              <p>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;