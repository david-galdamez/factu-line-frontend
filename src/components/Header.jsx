import { useEffect, useState } from "react"; // <-- Importa useState
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyLogin } from "../services/VerifyLogin";
import { verifyAdminStatus } from "../services/VerifyAdmin";
import { BASE_URL } from "../constants/BaseUrl";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- 1. Estado para el menú
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const logged = await verifyLogin();
            const admin = await verifyAdminStatus();
            setIsLoggedIn(logged);
            setIsAdmin(admin);
        };
        verify();
    }, [location]);

    // 2. Funciones para controlar el menú
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const logOut = () => {
        fetch(`${BASE_URL}/business/logout`, {
            method: "POST",
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    setIsLoggedIn(false);
                    closeMenu(); // <-- Cierra el menú al cerrar sesión
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <header className="header">
            {/* Contenedor principal para logo y botón de menú */}
            <div className="header-main">
                <Link to="/" className="logo" onClick={closeMenu}>
                    <div className="logo-image">
                        <img
                            src="/assets/logo_factuline.svg"
                            alt="FactuLine Logo"
                            className="register-logo"
                        />
                    </div>
                </Link>

                {/* 3. Botón de Hamburguesa (solo visible en móvil) */}
                <button
                    className="hamburger-btn"
                    onClick={toggleMenu}
                    aria-label="Abrir menú"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* 4. Contenedor de navegación (se colapsa) */}
            <div className={`nav-container ${isMenuOpen ? "nav-open" : ""}`}>
                <nav>
                    <ul>
                        {/* 5. Se añade 'onClick={closeMenu}' para cerrar al navegar */}
                        <li className="nav-list">
                            <Link to="/" onClick={closeMenu}>
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-list">
                            <Link to="/clients" onClick={closeMenu}>
                                Clientes
                            </Link>
                        </li>
                        {isAdmin && (
                            <li className="nav-list">
                                <Link to="/users" onClick={closeMenu}>
                                    Users
                                </Link>
                            </li>
                        )}
                        <li className="nav-list">
                            <Link to="/invoices/create" onClick={closeMenu}>
                                Crear factura
                            </Link>
                        </li>
                        <li className="nav-list">
                            <Link to="/invoices" onClick={closeMenu}>
                                Archivo
                            </Link>
                        </li>
                        <li className="nav-list">
                            <Link to="/products" onClick={closeMenu}>
                                Productos
                            </Link>
                        </li>
                        <li className="nav-list">
                            <Link to="/users" onClick={closeMenu}>
                                Usuarios
                            </Link>
                        </li>
                    </ul>
                </nav>

                {isLoggedIn ? (
                    <button className="btn btn-login" onClick={logOut}>
                        Cerrar Sesión
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="btn btn-login"
                        onClick={closeMenu}
                    >
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
