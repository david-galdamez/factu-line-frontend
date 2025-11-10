import {Link} from "react-router-dom";

function RegisterClient() {
    return (
       <div className="register-container">

      {/* Columna Izquierda (Sidebar) */}
      <div className="register-sidebar">
        <img src="/assets/logo_factuline.svg" alt="FactuLine Logo" className="register-logo" />
        <h2 className="register-brand-name">FactuLine</h2>
        <p className="register-slogan">Apoyando a las PYMES de El Salvador</p>
      </div>

      {/* Columna Derecha (Formulario) */}
      <div className="register-form-container">
        <form className="register-form">
          <h2>Registro de cliente</h2>
          <p className="register-subtitle">Ingrese los datos para el nuevo cliente</p>

          <div className="form-group-register">
            <input type="text" placeholder="Nombre" />
          </div>
          <div className="form-group-register">
            <input type="text" placeholder='DUI' />
          </div>
          <div className="form-group-register">
            <input type="text" placeholder="Dirección" />
          </div>
          <div className="form-group-register">
            <input type="tel" placeholder="Telefono" />
          </div>
          <div className="form-group-register">
            <input type="email" placeholder="Correo electrónico" />
          </div>



          <button type="submit" className="btn-register-submit">
            Crear Cliente
          </button>


        </form>
      </div>
    </div>
  );
}




export default RegisterClient;