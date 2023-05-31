import React, { Component, useEffect, useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
import "../styles/adminHome.css";
import person from "../assets/img/person.png";

export default function UserHome({ userData }) {
    //setting state
    const [info, setInfo] = useState([]);
    const [limit, setLimit] = useState(5);
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef();

    useEffect(() => {
        currentPage.current = 1;
        // getAllUser();
        getPaginatedUsers();
    }, []);


    //logout
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };

    function getPaginatedUsers() {
        fetch(`https://backend-mxc3.onrender.com/getAllProveedor`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data[0]._id)
                setInfo(data.data);
            })
    }
    return (
        <div className="auth-wrapper" style={{ height: "auto" }}>
            <div className="auth-inner" style={{ width: "auto" }}>
                <h3>Hola, proveedor</h3>
                <div>
                    Nombre<h1>{userData.fname}</h1>
                    Email <h1>{userData.email}</h1>
                    <br />
                </div>
            </div>
            {info && info.map((i) => (
                <div key={i._id}>
                    <div className="container_adminHome">
                        <div className="card_admin">
                            <div className="img_container">
                                <img className="img_adminHome" src={person} alt="" />
                            </div>
                            <div className="info">
                                <div className="service_title">
                                    <p>{i.name}</p>
                                    <p>{i.calificacion}</p>
                                </div>
                                <div className="service_description">
                                    <p>{i.descripcion}</p>
                                    <div className="btn_admin">
                                        <p>Categoria : {i.categoria}</p>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button className="btn btn-primary">Contactar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
            <button onClick={logOut} className="btn btn-primary">
                Log Out
            </button>
        </div>

    );


}