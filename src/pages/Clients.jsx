import { Link } from "react-router-dom";

export default function Clients() {
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

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
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-register">
                            Filtrar
                        </button>
                        <Link to="/registerClient" className="btn btn-register">
                            Crear Cliente
                        </Link>
                        

                        
                    </div>
                </form>
                <div className="clients-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo Electrónico</th>
                                <th>Dui</th>
                                <th>Direccion</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
