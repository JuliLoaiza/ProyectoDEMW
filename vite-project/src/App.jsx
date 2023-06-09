import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import AdminHome from "./Pages/adminHome";

function App() {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    return (
        <BrowserRouter>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}>
                            DEMW
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}>
                                        Log In
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}>
                                        Registro
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="auth-wrapper">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/sign-in" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/proveedor" element={<AdminHome />} />
                        <Route path="/userDetails" element={<UserDetails />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
