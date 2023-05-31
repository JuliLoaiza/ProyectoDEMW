import React, { Component, useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        console.log(email, password);
        fetch("https://backend-mxc3.onrender.com/login-user", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                if (data.status == "ok") {
                    alert("login successful");
                    window.localStorage.setItem("token", data.data);
                    window.localStorage.setItem("loggedIn", true);
                    window.location.href = "./userDetails";
                }
            });
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Log In</h3>

                    <div className="mb-3">
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo electrónico"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}
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
                        <a href="/sign-up">Regístrate</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
