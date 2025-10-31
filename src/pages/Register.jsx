import { Link } from 'react-router-dom';



function Register() {
  return (
    <div className="register-container">

      {/* Columna Izquierda (Sidebar) */}
      <div className="register-sidebar">
         <img src="/assets/logo_factuline.svg" alt="FactuLine Logo" className="register-logo" />
        <p className="register-slogan">Apoyando a las PYMES de El Salvador</p>
      </div>

      {/* Columna Derecha (Formulario) */}
      <div className="register-form-container">
        <form className="register-form">
          <h2>Registro</h2>
          <p className="register-subtitle">Cree su cuenta para empezar a facturar</p>

          <div className="form-group-register">
            <input type="text" placeholder="Nombre de negocio" />
          </div>
          <div className="form-group-register">
            <input type="text" placeholder='Dirección' />
          </div>
          <div className="form-group-register">
            <input type="text" placeholder="Numero de identificación del negocio" />
          </div>
          <div className="form-group-register">
            <input type="tel" placeholder="Telefono del negocio" />
          </div>
          <div className="form-group-register">
            <input type="text" placeholder="Nombre del propietario" />
          </div>
          <div className="form-group-register">
            <input type="email" placeholder="Correo electrónico" />
          </div>
          <div className="form-group-register">
            <input type="password" placeholder="Ingrese la contraseña" />
          </div>
          <div className="form-group-register">
            <input type="password" placeholder="Confirme la contraseña" />
          </div>

          <div className="terms-box">
            <p>
              Al presionar el botón de "Crear cuenta" usted acepta los
              <a href="#terminos"> Terminos y Condiciones</a> y la
              <a href="#privacidad"> Política de provacidad</a>
            </p>
          </div>

          {/* Este botón se menciona en el texto pero no está en la imagen, es necesario para un formulario */}
          <button type="submit" className="btn-register-submit">
            Crear cuenta
          </button>

          <div className="login-link">
            ¿Ya tiene cuenta? <Link to="/login">Inicie sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}




export default Register;