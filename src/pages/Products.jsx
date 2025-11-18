import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/BaseUrl";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../services/VerifyLogin";
import ModalComponent from "../components/ModalComponent";
import EditProduct from "../components/EditProduct";

export default function Products() {
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    let navigate = useNavigate();

    const handleChange = (event) => {
        setNombre(event.target.value);
    };

    const fetchProducts = async (searchTerm = "") => {
        setLoading(true); 
        try {
            const res = await fetch(
                `${BASE_URL}/products/list?name=${searchTerm}`,
                {
                    method: "GET",
                    credentials: "include",
                },
            );
            if (!res.ok) {
                throw new Error("Error fetching products");
            }

            const data = await res.json();
            setProducts(data.data?.products || []);
        } catch (err) {
            console.error(err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetchProducts(nombre);
    };

    useEffect(() => {
        const verify = async () => {
            const isLoggedIn = await verifyLogin();

            if (!isLoggedIn) {
                navigate("/login");
            } else {
                await fetchProducts(); 
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
                            type="text"
                            placeholder="Filtrar por nombre producto"
                            onChange={handleChange}
                            value={nombre}
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
                        <ModalComponent onProductRegister={() => fetchProducts()} />
                    </div>
                </form>

                {products.length < 1 ? (
                    <div className="table-empty">
                         {loading ? "Cargando productos..." : "No hay productos registrados"}
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.product_number}</td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>${product.unit_price}</td>
                                        <td>
                                            <EditProduct
                                                product={product}
                                                onProductUpdated={() => fetchProducts(nombre)}
                                            />
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