import React, { Component, useState } from "react";

export default function SignUp() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(fname, lname, email, password);
        fetch("https://backend-mxc3.onrender.com/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                fname,
                email,
                lname,
                password,
                userType,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                if (data.status == "ok") {
                    alert("Registration Successful");
                } else {
                    alert("Something went wrong");
                }
            });

    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Registro</h3>
                    <div>
                        Registrar como
                        <input
                            type="radio"
                            name="UserType"
                            value="Usuario"
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        Usuario
                        <input
                            type="radio"
                            name="UserType"
                            value="Admin"
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        Proveedor
                    </div>
                    {userType == "Proveedor" ? (
                        <div className="mb-3">
                            <label>Servicio</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Servicio"
                                onChange={(e) => setServicio(e.target.value)}
                            />
                        </div>
                    ) : null}

                    <div className="mb-3">
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Apellido"
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </div>

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
                            placeholder="Contraseña "
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Enviar
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        ¿Ya estás registrado? <a href="/sign-in"> Inicia sesión </a>
                    </p>
                </form>
            </div>
        </div>
    );
}