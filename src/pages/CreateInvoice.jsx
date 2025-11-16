import { useState, useEffect } from "react";
import Select from "react-select";
import { BASE_URL } from "../constants/BaseUrl";
import toast from "react-hot-toast";
import { verifyLogin } from "../services/VerifyLogin";
import { useNavigate } from "react-router-dom";

export default function CreateInvoice() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [error, setError] = useState("");
    const [zodErrors, setZodErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [invoiceProducts, setInvoiceProducts] = useState([]);

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setZodErrors(null);
        setLoading(true);
        console.log(invoiceProducts);
        try {
            const res = await fetch(`${BASE_URL}/invoice/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: selectedCustomer.value,
                    products: invoiceProducts.map((product) => ({
                        product_id: product.id,
                        quantity: product.quantity,
                    })),
                }),
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

            toast.success(data.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch(`${BASE_URL}/clients/list`, { credentials: "include" })
            .then((response) => {
                if (!response.ok)
                    throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data) => {
                const options = data.data.clients.map((c) => ({
                    value: c.id,
                    label: c.email,
                }));

                setCustomers(options);
            })
            .catch((error) => setError(error));

        fetch(`${BASE_URL}/products/list`, { credentials: "include" })
            .then((response) => {
                if (!response.ok)
                    throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data) => {
                const options = data.data.products.map((p) => ({
                    value: p.id,
                    label: p.name,
                }));

                setProducts(options);
            })
            .catch((error) => setError(error));

        const verify = async () => {
            const isLoggedIn = await verifyLogin();

            if (!isLoggedIn) {
                navigate("/login");
            }
        };
        verify();
    }, []);

    const handleAddProduct = () => {
        if (!selectedProduct || quantity < 1) return;

        setInvoiceProducts([
            ...invoiceProducts,
            {
                id: selectedProduct.value,
                name: selectedProduct.label,
                quantity,
            },
        ]);

        setSelectedProduct(null);
        setQuantity(1);
    };

    const handleRemove = (id) => {
        setInvoiceProducts(invoiceProducts.filter((p) => p.id !== id));
    };

    return (
        <section className="hero hero-pages">
            <h1>Registrar Factura</h1>
            <div>
                <form className="invoice-form" onSubmit={handleSubmit}>
                    <div className="invoice-layout">
                        <div className="invoice-left">
                            <div className="form-group">
                                <label>Cliente:</label>

                                <Select
                                    classNamePrefix="react-select"
                                    placeholder="Buscar y seleccionar cliente..."
                                    options={customers}
                                    value={selectedCustomer}
                                    onChange={setSelectedCustomer}
                                    isSearchable={true}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: "10px",
                                            padding: "4px",
                                        }),
                                        option: (base) => ({
                                            ...base,
                                            color: "black",
                                        }),
                                    }}
                                />
                            </div>
                            {zodErrors?.client_id && (
                                <p className="error">
                                    {zodErrors.client_id[0]}
                                </p>
                            )}
                            <div className="form-group">
                                <label>Selecciona un producto</label>

                                <div className="product-row">
                                    <Select
                                        classNamePrefix="react-select"
                                        value={selectedProduct}
                                        onChange={setSelectedProduct}
                                        options={products}
                                        placeholder="Buscar producto..."
                                        isSearchable={true}
                                        styles={{
                                            container: (base) => ({
                                                ...base,
                                                width: "100%",
                                            }),
                                            control: (base) => ({
                                                ...base,
                                                borderRadius: "10px",
                                                minHeight: "38px",
                                            }),
                                            option: (base) => ({
                                                ...base,
                                                color: "black",
                                            }),
                                        }}
                                    />

                                    <input
                                        type="number"
                                        className="input-like-select"
                                        value={quantity}
                                        min={1}
                                        onChange={(e) =>
                                            setQuantity(
                                                parseInt(e.target.value),
                                            )
                                        }
                                        placeholder="Cantidad"
                                    />
                                    {zodErrors?.products && (
                                        <p className="error">
                                            {zodErrors.products[0]}
                                        </p>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-edit"
                                        onClick={handleAddProduct}
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="invoice-right">
                            {invoiceProducts.length > 0 && (
                                <div className="table-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoiceProducts.map((p) => (
                                                <tr key={p.id}>
                                                    <td>{p.name}</td>
                                                    <td>{p.quantity}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-edit"
                                                            onClick={() =>
                                                                handleRemove(
                                                                    p.id,
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                    {error && <p className="error">Error: {error.message}</p>}
                    <div className="submit-container">
                        <button
                            type="submit"
                            className={`btn-register-submit ${loading ? "loading" : ""}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <i className="fa fa-spinner fa-pulse"></i>
                                    <span> Loading...</span>
                                </>
                            ) : (
                                "Registrar"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
