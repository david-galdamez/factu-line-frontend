import { useState } from "react";
import { BASE_URL } from "../constants/BaseUrl";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verifyLogin } from "../services/VerifyLogin";
import ModalComponent from "../components/ModalComponent";

export default function Products() {
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    let navigate = useNavigate();

    const handleChange = (event) => {
        setNombre(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(
                `${BASE_URL}/products/list?nombre=${nombre}`,
                {
                    method: "GET",
                    credentials: "include",
                },
            );
            if (!res.ok) {
                throw new Error("Error fetching clients");
            }

            const data = await res.json();
            console.log(data);
            setProducts(data.data.products);
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
            <h1>Registro de Productos</h1>
            <div>
                <form
                    className="form-group form-filter"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <input
                            type="email"
                            placeholder="Filtrar por nombre producto"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`btn btn-register ${loading ? "disabled" : ""}`}
                        >
                            Filtrar
                        </button>
                        <ModalComponent />
                    </div>
                </form>
                {products.length < 1 ? (
                    <div className="table-empty">
                        No hay productos registrados
                    </div>
                ) : (
                    <div className="table-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Unit Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.product_number}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>${product.unit_price}</td>
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
