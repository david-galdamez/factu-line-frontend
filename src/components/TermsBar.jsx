import React from 'react';
import { Link } from 'react-router-dom';

function TermsBar() {
  return (
    <div className="terms-bar">
      <div className="terms-bar-content">
        <span>¿Necesitas más información legal?</span>
        <Link to="/terms" className="termsPriv-link">
          Consulta nuestros Términos y Condiciones
        </Link>
      </div>
    </div>
  );
}

export default TermsBar;