import React from 'react';

function Login() {
  return (
    <div className="login-container">
        
      <form className="login-card">
        
        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Correo" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Contraseña" 
          />
        </div>

        <button type="submit" className="btn-login-submit">
          Sign In
        </button>

        <a href="#forgot" className="forgot-password">
          ¿Olvidaste tu contraseña?
        </a>
      </form>
    </div>
  );
}

export default Login;