import { useState } from "react";
import Modal from "react-modal";
import { BASE_URL } from "../constants/BaseUrl";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

export default function ModalComponent() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [registerProduct, setRegisterProduct] = useState({
        name: "",
        description: "",
        unit_price: 0,
    });
    const [error, setError] = useState("");
    const [zodErrors, setZodErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setZodErrors(null);
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/products/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerProduct),
                credentials: "incude",
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
            setModalIsOpen(false);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openModal = () => {
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
            <button
                className="btn btn-register"
                type="button"
                onClick={openModal}
            >
                Crear Producto
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Registrar Producto"
                style={customStyles}
            >
                <h2 className="title">Registrar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group-register">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" required />
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
                        />
                        {zodErrors?.description && (
                            <p className="error">{zodErrors.description[0]}</p>
                        )}
                    </div>
                    <div className="form-group-register">
                        <label htmlFor="price">Precio:</label>
                        <input type="number" id="price" name="price" required />
                        {zodErrors?.unit_price && (
                            <p className="error">{zodErrors.unit_price[0]}</p>
                        )}
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="button-container">
                        <button
                            className={`btn-register-submit ${loading ? "disabled" : ""}`}
                            type="submit"
                        >
                            Registrar
                        </button>
                        <button
                            className="btn-register-cancel"
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
