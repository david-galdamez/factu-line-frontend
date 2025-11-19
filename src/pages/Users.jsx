import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyLogin } from "../services/VerifyLogin";
import { verifyAdminStatus } from "../services/VerifyAdmin";
import { BASE_URL } from "../constants/BaseUrl";

export default function Users() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    let navigate = useNavigate();

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const fetchUsers = async (searchEmail = "") => {
        setLoading(true);
        try {
            const res = await fetch(
                `${BASE_URL}/business/user/list?email=${searchEmail}`,
                {
                    method: "GET",
                    credentials: "include",
                },
            );
            if (!res.ok) {
                throw new Error("Error fetching users");
            }

            const data = await res.json();

            setUsers(data.data?.users || []);
        } catch (err) {
            console.error(err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetchUsers(email);
    };

    useEffect(() => {
        const init = async () => {
            const isLoggedIn = await verifyLogin();
            const isAdmin = await verifyAdminStatus();

            if (!isAdmin) {
                navigate("/invoices");
            } else if (!isLoggedIn) {
                navigate("/login");
            } else {
                await fetchUsers();
            }
        };
        init();
    }, []);

    return (
        <section className="hero hero-pages">
            <h1>Gestión de Usuarios</h1>
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
                            value={email}
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
                            to="/users/register"
                            className="btn-clients-products"
                        >
                            Crear Usuario
                        </Link>
                    </div>
                </form>

                {users.length < 1 ? (
                    <div className="table-empty">
                        {loading
                            ? "Cargando usuarios..."
                            : "No hay usuarios registrados"}
                    </div>
                ) : (
                    <div className="table-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo Electrónico</th>
                                    <th>Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role_id === 1
                                                ? "Administrador"
                                                : "Usuario"}
                                        </td>
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
