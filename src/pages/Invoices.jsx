import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/BaseUrl.js";
import { verifyLogin } from "../services/VerifyLogin.js";

export default function Invoices() {
    let navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${BASE_URL}/invoice/`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error getting invoices");
                }
                return res.json();
            })
            .then((data) => {
                setInvoices(data.data.invoices);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });

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
            <h1>Facturas</h1>
            <div className="invoice-scroll">
                <div className="invoice-grid">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        invoices.map((invoice) => (
                            <Link
                                to={`/invoices/${invoice.id}`}
                                key={invoice.id}
                                className="invoice-card"
                            >
                                <h3>{invoice.invoice_number}</h3>
                                <p>Customer email: {invoice.email}</p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
