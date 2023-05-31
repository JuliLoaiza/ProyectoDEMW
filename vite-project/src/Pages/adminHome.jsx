import React, { Component, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { useRef } from "react";
import "../styles/adminHome.css";
import person from "../assets/img/person.png";
export default function AdminHome({ userData }) {
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

    //fetching all user
    const getAllUser = () => {
        fetch("http://localhost:5000/getAllProveedor", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setData(data.data);
            });
    };

    //logout
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };

    //deleting user
    const deleteUser = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            fetch("http://localhost:5000/deleteUser", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userid: id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.data);
                    getAllUser();
                });
        } else {
        }
    };

    //pagination
    function handlePageClick(e) {
        console.log(e);
        currentPage.current = e.selected + 1;
        getPaginatedUsers();
    }
    function changeLimit() {
        currentPage.current = 1;
        getPaginatedUsers();
    }

    function getPaginatedUsers() {
        fetch(`http://localhost:5000/getAllProveedor`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data[0])
                setInfo(data.data);
            })
    }
    return (
        <div className="auth-wrapper" style={{ height: "auto" }}>
            <div className="auth-inner" style={{ width: "auto" }}>
                <h3>Hola, proveedor</h3>
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
                                        <button className="btn btn-primary">Editar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
