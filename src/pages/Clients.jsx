import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyLogin } from "../services/VerifyLogin";
import { BASE_URL } from "../constants/BaseUrl";
import { useState } from "react";

export default function Clients() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    let navigate = useNavigate();

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/clients/list?email=${email}`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error("Error fetching clients");
            }

            const data = await res.json();
            console.log(data);
            setClients(data.data.clients);
        } catch (err) {
            console.error(err);
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
        <section className="hero hero-pages">
            <h1>Registro de Clientes</h1>
            <div>
                <form
                    className="form-group form-filter"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <input
                            type="email"
                            placeholder="Filtrar por correo electrónico"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`btn-clients-products ${loading ? "loading" : ""}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <i className="fa fa-spinner fa-pulse"></i>
                                    <span> Filtrando...</span>
                                </>
                            ) : (

                                "Filtrar"
                            )}
                        </button>
                        <Link
                            to="/clients/register"
                            className="btn-clients-products"
                        >
                            Crear Cliente
                        </Link>
                    </div>
                </form>
                {clients.length < 1 ? (
                    <div className="table-empty">
                        No hay clientes registrados
                    </div>
                ) : (
                    <div className="table-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo Electrónico</th>
                                    <th>Dui</th>
                                    <th>Direccion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id}>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.dui}</td>
                                        <td>{client.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
