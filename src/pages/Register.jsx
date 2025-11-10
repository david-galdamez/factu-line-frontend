// src/pages/Register.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/BaseUrl";
import toast from "react-hot-toast";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        tax_id: "",
        address: "",
        phone: "",
        user_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [zodErrors, setZodErrors] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setZodErrors(null);
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const dataToSend = { ...formData };
            delete dataToSend.confirmPassword;

            const res = await fetch(`${BASE_URL}/business/register/business`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
                credentials: "omit",
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 400 && data.error?.formErrors) {
                    setZodErrors(data.error.fieldErrors);
                } else {
                    throw new Error(data.error || "Algo salió mal");
                }
                return;
            }

            toast.success(data.message);
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-sidebar">
                <img
                    src="/assets/logo_factuline.svg"
                    alt="FactuLine Logo"
                    className="register-logo"
                />
                <p className="register-slogan">
                    Apoyando a las PYMES de El Salvador
                </p>
            </div>

            <div className="register-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Registro</h2>
                    <p className="register-subtitle">
                        Cree su cuenta para empezar a facturar
                    </p>

                    <div className="form-group-register">
                        <input
                            name="name"
                            type="text"
                            placeholder="Nombre de negocio"
                            onChange={handleChange}
                            required
                            value={formData.name}
                        />
                        {zodErrors?.name && (
                            <p className="error">{zodErrors.name[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            name="address"
                            type="text"
                            placeholder="Dirección"
                            onChange={handleChange}
                            required
                            value={formData.address}
                        />
                        {zodErrors?.address && (
                            <p className="error">{zodErrors.address[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            name="tax_id"
                            type="text"
                            placeholder="Numero de identificación del negocio"
                            onChange={handleChange}
                            required
                            value={formData.tax_id}
                        />
                        {zodErrors?.tax_id && (
                            <p className="error">{zodErrors.tax_id[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Telefono del negocio"
                            onChange={handleChange}
                            required
                            value={formData.phone}
                        />
                        {zodErrors?.phone && (
                            <p className="error">{zodErrors.phone[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            name="user_name"
                            type="text"
                            placeholder="Nombre del propietario"
                            onChange={handleChange}
                            required
                            value={formData.user_name}
                        />
                        {zodErrors?.user_name && (
                            <p className="error">{zodErrors.user_name[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            name="email"
                            type="email"
                            placeholder="Correo electrónico"
                            onChange={handleChange}
                            required
                            value={formData.email}
                        />
                        {zodErrors?.email && (
                            <p className="error">{zodErrors.email[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            name="password"
                            type="password"
                            placeholder="Ingrese la contraseña"
                            onChange={handleChange}
                            required
                            value={formData.password}
                        />
                        {zodErrors?.password && (
                            <p className="error">{zodErrors.password[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirme la contraseña"
                            onChange={handleChange}
                            required
                            value={formData.confirmPassword}
                        />
                    </div>

                    {error && (
                        <p
                            className="error"
                            style={{ color: "red", textAlign: "center" }}
                        >
                            {error}
                        </p>
                    )}

                    <div className="terms-box">
                        <p>
                            Al presionar el botón de "Crear cuenta" usted acepta
                            los
                            <Link to="/terms" className="termsPriv-link">
                                Términos y Condiciones
                            </Link>{" "}
                            y la
                            <Link to="/privacy" className="termsPriv-link">
                                {" "}
                                Política de Privacidad
                            </Link>
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn-register-submit ${loading ? "disabled" : ""}`}
                    >
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
