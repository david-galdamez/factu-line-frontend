import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyLogin } from "../services/VerifyLogin";
import { BASE_URL } from "../constants/BaseUrl";

export default function Users() { // 1. Cambiamos el nombre del componente
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]); // 2. Estado para usuarios
    let navigate = useNavigate();

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const fetchUsers = async (searchEmail = "") => {
        setLoading(true);
        try {
            // 3. CAMBIO DE ENDPOINT: 
            // Asegúrate de tener creada esta ruta en tu backend (GET /business/users)
            const res = await fetch(`${BASE_URL}/business/users?email=${searchEmail}`, {
                method: "GET",
                credentials: "include",
            });
            
            if (!res.ok) {
                throw new Error("Error fetching users");
            }

            const data = await res.json();
            
            // 4. Ajustamos para leer la data de usuarios
            // (Asegúrate de que tu backend devuelva { data: { users: [...] } })
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

            if (!isLoggedIn) {
                navigate("/login");
            } else {
                await fetchUsers(); 
            }
        };
        init();
    }, []);

    return (
        <section className="hero hero-pages">
            {/* 5. Título actualizado */}
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

                {/* 7. Mensajes y Tabla actualizados */}
                {users.length < 1 ? (
                    <div className="table-empty">
                        {loading ? "Cargando usuarios..." : "No hay usuarios registrados"}
                    </div>
                ) : (
                    <div className="table-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo Electrónico</th>
                                    {/* Quitamos DUI y Dirección, agregamos Rol si lo deseas */}
                                    <th>Rol</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        {/* Lógica simple para mostrar el rol */}
                                        <td>
                                            {user.role_id === 1 ? "Administrador" : "Usuario"}
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