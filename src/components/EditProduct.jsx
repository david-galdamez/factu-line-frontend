import { useState } from "react";
import Modal from "react-modal";
import { BASE_URL } from "../constants/BaseUrl";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

export default function EditProduct({ product, onProductUpdated }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editProduct, setEditProduct] = useState({
        name: "",
        description: "",
        unit_price: "",
    });
    const [error, setError] = useState("");
    const [zodErrors, setZodErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError("");
        setZodErrors(null);
        setLoading(true);
        try {
            editProduct.unit_price = parseFloat(editProduct.unit_price);
            const res = await fetch(
                `${BASE_URL}/products/update/${product.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editProduct),
                    credentials: "include",
                },
            );

            const data = await res.json();
            if (!res.ok) {
                if (res.status === 400 && data.formErrors) {
                    setZodErrors(data.fieldErrors);
                } else {
                    throw new Error(
                        data.error || "Introduzca correctamente los datos",
                    );
                }
                return;
            }

            toast.success(data.message);
            if (onProductUpdated) {
                await onProductUpdated();
            }
            setModalIsOpen(false);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setEditProduct({
            ...editProduct,
            [e.target.name]: e.target.value,
        });
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openModal = () => {
        setEditProduct({
            name: product.name,
            description: product.description,
            unit_price: String(product.unit_price),
        });
        setModalIsOpen(true);
    };

    const customStyles = {
        content: {
            width: "400px", // tamaño reducido
            height: "auto",
            margin: "auto",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            backgroundColor: "#fff",
            inset: "50% auto auto 50%",
            transform: "translate(-50%, -50%)",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    };

    return (
        <>
            <button className="btn btn-edit" type="button" onClick={openModal}>
                Editar
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Registrar Producto"
                style={customStyles}
            >
                <h2 className="title">Registrar Producto</h2>
                <div onSubmit={handleSubmit}>
                    <div className="form-group-register">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            onChange={handleChange}
                            value={editProduct.name}
                        />
                        {zodErrors?.name && (
                            <p className="error">{zodErrors.name[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <label htmlFor="description">Descripción:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            required
                            onChange={handleChange}
                            value={editProduct.description}
                        />
                        {zodErrors?.description && (
                            <p className="error">{zodErrors.description[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <label htmlFor="price">Precio:</label>
                        <input
                            type="text"
                            id="price"
                            name="unit_price"
                            placeholder="3.99..."
                            required
                            onChange={handleChange}
                            value={editProduct.unit_price}
                        />
                        {zodErrors?.unit_price && (
                            <p className="error">{zodErrors.unit_price[0]}</p>
                        )}
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="button-container">
                        <button
                            type="submit"
                            className={`btn-register-submit ${loading ? "loading" : ""}`}
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? (
                                <>
                                    <i className="fa fa-spinner fa-spin"></i>{" "}
                                    Editando...
                                </>
                            ) : (
                                "Editar"
                            )}
                        </button>
                        <button
                            className="btn-register-cancel"
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
