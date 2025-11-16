import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/BaseUrl";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { verifyLogin } from "../services/VerifyLogin";

function RegisterClient() {
    const [register, setRegister] = useState({
        name: "",
        dui: "",
        address: "",
        phone: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [zodErrors, setZodErrors] = useState(null);
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const handleChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setZodErrors(null);
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/clients/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(register),
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 400 && data.formErrors) {
                    setZodErrors(data.fieldErrors);
                } else {
                    throw new Error(data.error || "Algo salió mal");
                }
                return;
            }

            if (data.success) {
                //NAVEGAR A EL DASHBOARD
                toast.success(data.message);
                navigate("/clients");
                setLoading(true);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const verify = async () => {
            const isLoggedIn = await verifyLogin();

            if (!isLoggedIn) {
                navigate("/login");
            }
        };
        verify();
    }, []);

    return (
        <div className="register-container">
            {/* Columna Izquierda (Sidebar) */}
            <div className="register-sidebar">
                <img
                    src="/assets/logo_factuline.svg"
                    alt="FactuLine Logo"
                    className="register-logo"
                />
                <h2 className="register-brand-name">FactuLine</h2>
                <p className="register-slogan">
                    Apoyando a las PYMES de El Salvador
                </p>
            </div>

            {/* Columna Derecha (Formulario) */}
            <div className="register-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Registro de cliente</h2>
                    <p className="register-subtitle">
                        Ingrese los datos para el nuevo cliente
                    </p>

                    <div className="form-group-register">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            required
                            onChange={handleChange}
                        />
                        {zodErrors?.name && (
                            <p className="error">{zodErrors.name[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            type="text"
                            name="dui"
                            placeholder="DUI"
                            required
                            onChange={handleChange}
                        />
                        {zodErrors?.dui && (
                            <p className="error">{zodErrors.dui[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            type="text"
                            name="address"
                            placeholder="Dirección"
                            required
                            onChange={handleChange}
                        />
                        {zodErrors?.address && (
                            <p className="error">{zodErrors.address[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telefono"
                            required
                            onChange={handleChange}
                        />
                        {zodErrors?.phone && (
                            <p className="error">{zodErrors.phone[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            required
                            onChange={handleChange}
                        />
                        {zodErrors?.email && (
                            <p className="error">{zodErrors.email[0]}</p>
                        )}
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button
                        type="submit"
                        className={`btn-register-submit ${loading ? "disabled" : ""}`}
                    >
                        Crear Cliente
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterClient;
