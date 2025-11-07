import React from 'react';
import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div className="termsPriv-container">
      <div className="termsPriv-content-wrapper">
        <h1 className="termsPriv-title">Políticas de Privacidad</h1>
        <hr className="termsPriv-divider" />

        <p className="termsPriv-intro">
          En <strong>FactuLine</strong>, valoramos la privacidad de nuestros usuarios y reconocemos la importancia de proteger su información personal. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos los datos proporcionados al utilizar nuestro sitio web o aplicación con fines académicos.
        </p>

        <section className="termsPriv-section">
          <h2>1. Información que recopilamos</h2>
          <p>
            Durante el uso de la plataforma, podemos recopilar información que el
            usuario proporciona voluntariamente, como:
          </p>
          <ul>
            <li>Nombre, correo electrónico o datos de contacto.</li>
            <li>
              Información relacionada con facturas, clientes, productos y montos
              ingresados.
            </li>
            <li>Datos técnicos como dirección IP o tipo de navegador.</li>
          </ul>
          <p className="mb-6">
            Todos los datos recopilados se utilizan exclusivamente con fines de
            prueba, demostración y aprendizaje, **sin ningún propósito comercial o
            de almacenamiento permanente**.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>2. Uso de la información</h2>
          <p>
            La información proporcionada se utiliza únicamente para el correcto
            funcionamiento y demostración del sistema. Los fines principales son:
          </p>
          <ul>
            <li>Permitir el acceso y uso de las funciones de facturación.</li>
            <li>Simular procesos académicos de registro y almacenamiento.</li>
            <li>Mejorar la experiencia del usuario dentro del entorno educativo.</li>
          </ul>
        </section>

        <section className="termsPriv-section">
          <h2>3. Protección de los datos </h2>
          <p>
            Implementamos medidas razonables de seguridad para proteger la
            información del usuario contra accesos no autorizados, pérdida o
            alteración. Sin embargo, el usuario reconoce que **ningún sistema es
            completamente seguro** y que los datos pueden eliminarse en cualquier
            momento como parte del mantenimiento o pruebas del sistema.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>4. Divulgación de información a terceros</h2>
          <p>
            <strong>FactuLine</strong> no comparte, vende ni divulga información de
            los usuarios a terceros. Los datos se utilizan únicamente dentro del
            ámbito académico y no se emplean con fines publicitarios ni
            comerciales.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>5. Uso de cookies y tecnologías similares</h2>
          <p>
            El sitio puede utilizar cookies o herramientas similares para mejorar la
            experiencia del usuario, recordar preferencias de sesión o recopilar
            estadísticas de navegación. El usuario puede deshabilitar las cookies
            desde la configuración de su navegador sin afectar el acceso general a
            la plataforma.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>6. Enlaces a sitios externos </h2>
          <p>
            Nuestro sitio puede contener enlaces a páginas externas. No somos
            responsables de las prácticas de privacidad ni del contenido de dichos
            sitios. Se recomienda leer las políticas de privacidad de cada sitio
            visitado.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>
            7. Derechos del usuario
          </h2>
          <p>
            El usuario tiene derecho a solicitar la eliminación de su información de
            prueba en cualquier momento. Dado que el propósito de la plataforma es
            educativo, los datos pueden ser eliminados de forma automática sin
            previo aviso.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>
            8. Cambios a esta política
          </h2>
          <p>
            Nos reservamos el derecho de modificar o actualizar esta Política de
            Privacidad en cualquier momento. Las modificaciones serán publicadas en
            esta página con la fecha correspondiente.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>
            9. Contactos
          </h2>
          <p>
            Si tienes dudas o sugerencias sobre esta Política de Privacidad, puedes
            comunicarte con nosotros al correo:
          </p>
          <a href="mailto:info@factuline.com" className="contact-email">
            <span className="email-icon">✉️</span>
            info@factuline.com
          </a>
        </section>


        <section className="termsPriv-section termsPriv-final-note">
          <p>
            ⚠️ Esta política ha sido elaborada con fines exclusivamente académicos,
            para simular una Política de Privacidad en un entorno de desarrollo web.
          </p>
        </section>

      </div>
    </div>
  );
}

export default Privacy;