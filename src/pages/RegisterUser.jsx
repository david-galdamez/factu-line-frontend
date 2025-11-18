import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/BaseUrl";
import toast from "react-hot-toast";
import { verifyLogin } from "../services/VerifyLogin";

function RegisterUser() {
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (register.password !== register.confirmPassword) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {
            const dataToSend = {
                name: register.name,
                email: register.email,
                password: register.password,
                role_id: 2
            };

            const res = await fetch(`${BASE_URL}/business/register/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
                credentials: "include",
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

            toast.success(data.message || "Usuario creado exitosamente");
            navigate("/users");

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const verify = async () => {
            const loginData = await verifyLogin();
            if (!loginData) {
                navigate("/login");
            }
        };
        verify();
    }, []);

    return (
        <div className="register-container">
            <div className="register-sidebar">
                <img
                    src="/assets/logo_factuline.svg"
                    alt="FactuLine Logo"
                    className="register-logo"
                />
                <h2 className="register-brand-name">FactuLine</h2>
                <p className="register-slogan">
                    Gestión de usuarios del sistema
                </p>
            </div>

            <div className="register-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Crear Nuevo Usuario</h2>
                    <p className="register-subtitle">
                        Ingrese los datos para el nuevo empleado
                    </p>

                    <div className="form-group-register">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre completo"
                            required
                            onChange={handleChange}
                            value={register.name}
                        />
                        {zodErrors?.name && (
                            <p className="error">{zodErrors.name[0]}</p>
                        )}
                    </div>

                    <div className="form-group-register">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            required
                            onChange={handleChange}
                            value={register.email}
                        />
                        {zodErrors?.email && (
                            <p className="error">{zodErrors.email[0]}</p>
                        )}
                    </div>

                    <div className="form-group-register">
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            required
                            onChange={handleChange}
                            value={register.password}
                        />
                        {zodErrors?.password && (
                            <p className="error">{zodErrors.password[0]}</p>
                        )}
                    </div>

                    <div className="form-group-register">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            required
                            onChange={handleChange}
                            value={register.confirmPassword}
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button
                        type="submit"
                        className={`btn-register-submit ${loading ? "loading" : ""}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <i className="fa fa-spinner fa-pulse"></i>
                                <span> Creando...</span>
                            </>
                        ) : (
                            "Crear Usuario"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterUser;