import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form>
                <h3>Log In</h3>

                <div className="mb-3">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Ingresa tu email"
                    />
                </div>

                <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Ingresa tu contraseña"
                    />
                </div>

                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Recuérdame
                        </label>
                    </div>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Enviar
                    </button>
                </div>
                <p className="forgot-password text-right">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </p>
            </form>
        );
    }
}
