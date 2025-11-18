import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../constants/BaseUrl";
import { useState, useEffect } from "react";
import { verifyLogin } from "../services/VerifyLogin";

export default function Invoice() {
    const params = useParams();
    const [invoice, setInvoice] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/invoice/${params.id}`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setInvoice(data.data.invoice))
            .catch((err) => console.error(err));

        const verify = async () => {
            const isLoggedIn = await verifyLogin();

            if (!isLoggedIn) {
                navigate("/login");
            }
        };
        verify();
    }, [params.id]);

    if (!invoice) {
        return (
            <section className="hero hero-pages">
                <div className="table-empty">
                    <p>Cargando...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="hero hero-pages">
            <div className="invoice-wrapper">
                <div className="invoice-header">
                    <div>
                        <h2>{invoice.invoiceNumber}</h2>
                        <p>
                            <strong>Cajero:</strong> {invoice.workerName}
                        </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <p>
                            <strong>Cliente:</strong> {invoice.customerName}
                        </p>
                        <p>
                            <strong>Correo:</strong> {invoice.customerEmail}
                        </p>
                    </div>
                </div>
                <div className="table-list">
                    <table className="">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.unitPrice.toFixed(2)}</td>
                                    <td>${item.subtotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="invoice-totals">
                    <div className="invoice-totals-left">
                        <p>
                            <strong>Fecha:</strong> {invoice.issueDate}
                        </p>
                    </div>

                    <div className="invoice-totals-right">
                        <p>
                            <strong>SubTotal:</strong> $
                            {invoice.subtotal.toFixed(2)}
                        </p>
                        <p>
                            <strong>IVA:</strong> ${invoice.tax.toFixed(2)}
                        </p>
                        <h3>
                            <strong>Total:</strong> ${invoice.total.toFixed(2)}
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}
