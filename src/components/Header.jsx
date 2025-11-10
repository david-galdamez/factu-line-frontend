import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { verifyLogin } from "../services/VerifyLogin";
import { useState } from "react";
import { BASE_URL } from "../constants/BaseUrl";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const logged = await verifyLogin();
            setIsLoggedIn(logged);
        };
        verify();
    }, []);

    const logOut = () => {
        fetch(`${BASE_URL}/business/logout`, {
            method: "POST",
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    setIsLoggedIn(false);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <header className="header">
            <Link to="/" className="logo">
                <div className="logo-image">
                    <img
                        src="/assets/logo_factuline.svg"
                        alt="FactuLine Logo"
                        className="register-logo"
                    />
                </div>
            </Link>

            <nav>
                <ul>
                    <li className="nav-list">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/clients">Clientes</Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/invoices/create">Crear factura</Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/invoices">Archivo</Link>
                    </li>
                    <li className="nav-list">
                        <Link to="/products">Productos</Link>
                    </li>
                </ul>
            </nav>

            {isLoggedIn ? (
                <button className="btn btn-login" onClick={logOut}>
                    Cerrar Sesión
                </button>
            ) : (
                <Link to="/login" className="btn btn-login">
                    Iniciar Sesión
                </Link>
            )}
        </header>
    );
}

export default Header;
