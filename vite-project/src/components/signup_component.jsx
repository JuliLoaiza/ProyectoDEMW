import React, { Component } from "react";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { fname, lname, email, password } = this.state;
        console.log(fname, lname, email, password);
        fetch("http://localhost:5000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                fname, lname, email, password
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
            })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        onChange={(e) => this.setState({ fname: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Apellido</label>
                    <input type="text" className="form-control" placeholder="Apellido" onChange={(e) => this.setState({ lname: e.target.value })} />
                </div>

                <div className="mb-3">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Enviar
                    </button>
                </div>
                <p className="forgot-password text-right">
                    ¿Ya estás registrado? <a href="/sign-in">Inicia Sesión</a>
                </p>
            </form>
        );
    }
}