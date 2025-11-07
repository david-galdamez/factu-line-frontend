import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div className="termsPriv-container">
      <div className="termsPriv-content-wrapper">
        <h1 className="termsPriv-title">Términos y Condiciones</h1>
        <hr className="termsPriv-divider" />

        <p className="termsPriv-intro">
          Bienvenido(a) a <strong>FactuLine</strong>, una plataforma web destinada a la gestión y emisión de facturas electrónicas con el objetivo de facilitar la administración de datos financieros de manera sencilla y segura.
          <br /><br />
          El acceso y uso de este sitio web implica la aceptación plena de los presentes Términos y Condiciones. Si no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar el servicio.
        </p>

        <section className="termsPriv-section">
          <h2>1. Objetivo del sitio</h2>
          <p>
            El presente sitio web tiene como finalidad permitir al usuario registrar, almacenar y gestionar información relacionada con la facturación (clientes, productos, montos, monedas, etc.) en un entorno educativo y demostrativo.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>2. Uso permitido</h2>
          <p>Al utilizar esta plataforma, usted se compromete a:</p>
          <ul>
            <li>Utilizar la plataforma únicamente con fines académicos o demostrativos.</li>
            <li>No ingresar información falsa, inapropiada o que infrinja derechos de terceros.</li>
            <li>No realizar acciones que puedan dañar, sobrecargar o afectar el funcionamiento del sistema.</li>
          </ul>
          <p className="termsPriv-warning">
            El incumplimiento de estas condiciones podrá conllevar la suspensión temporal o permanente del acceso a la plataforma.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>3. Registro y datos del usuario</h2>
          <p>
            Para acceder a determinadas funciones, el usuario podrá crear una cuenta mediante un formulario de registro. El usuario es responsable de:
          </p>
          <ul>
            <li>Mantener la confidencialidad de sus credenciales.</li>
            <li>Verificar la exactitud de los datos proporcionados.</li>
            <li>Notificar cualquier uso no autorizado de su cuenta.</li>
          </ul>
          <p>
            FactuLine no se hace responsable de los daños o pérdidas derivados del uso indebido de las credenciales por parte del usuario o terceros.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>4. Propiedad intelectual</h2>
          <p>
            Todos los contenidos, diseños, logotipos, iconos y componentes de la plataforma son propiedad de FactuLine, salvo indicación contraria. El uso del sitio no otorga ningún tipo de derecho de propiedad intelectual sobre los contenidos, interfaces o funcionalidades.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>5. Privacidad y tratamiento de datos</h2>
          <p>
            Los datos ingresados por los usuarios se utilizan únicamente con fines de demostración académica. No se almacenan ni comparten con terceros. El usuario entiende que la información puede ser eliminada en cualquier momento como parte de las pruebas y mantenimiento del sistema.
          </p>
        </section>

        <section className="termsPriv-section">
          <h2>6. Limitación de responsabilidad</h2>
          <p>
            FactuLine no garantiza la disponibilidad continua del servicio ni la exactitud de los cálculos generados. El uso de esta plataforma es bajo propio riesgo del usuario, y su información puede no reflejar datos reales de facturación.
          </p>
          <p>
            La aplicación no reemplaza sistemas oficiales de facturación electrónica ni tiene validez legal ante ninguna institución gubernamental.
          </p>
        </section>

        <section className="termsPriv-section termsPriv-final-note">
          <h2>Modificaciones</h2>
          <p>
            FactuLine se reserva el derecho de modificar o actualizar los presentes Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en este sitio.
          </p>
        </section>

      </div>
    </div>
  );
}

export default Terms;