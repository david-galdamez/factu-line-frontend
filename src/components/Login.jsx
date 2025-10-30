import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/BaseUrl";
import { useState } from "react";

function Login() {
    const [login, setLogin] = useState({ email: "", password: "" });
    const [formError, setFormError] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const handleChange = (event) => {
        setLogin({ ...login, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setError("");
            setFormError({ email: "", password: "" });
            const res = await fetch(`${BASE_URL}/business/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(login),
                credentials: "include", //PARA QUE ACEPTE LOS COOKIES
            });
            if (!res.ok) {
                //SIEMPRE VERIFICA SI ES UN ERROR 400, SI ES 400 ES PORQUE LOS CAMPOS DE LA REQUEST ESTAN MAL
                if (res.status === 400) {
                    const badRequest = await res.json();
                    setFormError((prevState) => ({
                        ...prevState,
                        email: badRequest.error.fieldErrors.email?.[0] || "",
                        password:
                            badRequest.error.fieldErrors.password?.[0] || "",
                    }));
                } else {
                    //PARA TODO LOS DEMAS ERRORES
                    const conflict = await res.json();
                    console.error(conflict.error);
                    setError(conflict.error);
                }
            }

            const successData = await res.json();
            if (successData.success) {
                //NAVEGAR A EL DASHBOARD
                navigate("/dashboard", {
                    state: { toastMessage: successData.message },
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        placeholder="Correo"
                    />
                    {formError.email && (
                        <p className="error">{formError.email}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Contraseña"
                    />
                    {formError.password && (
                        <p className="error">{formError.password}</p>
                    )}
                </div>

                {error && <p className="error">{error}</p>}

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
