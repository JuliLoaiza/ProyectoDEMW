import React, { Component, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { useRef } from "react";
import Swal from "sweetalert2";
import "../styles/adminHome.css";
import person from "../assets/img/person.png";
import { useNavigate } from 'react-router-dom'

export default function AdminHome({ userData }) {
    const navigate = useNavigate()
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
        navigate('/')
    };

    //deleting user
    const handleDeleteClick = (id) => {
        Swal.fire({
            title: 'Eliminar Proveedor',
            text: '¿Estás seguro de que quieres eliminar este proveedor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`https://backend-mxc3.onrender.com/proveedor/${id}`, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El proveedor ha sido eliminado.',
                    icon: 'success'
                }).then(() => {
                    window.location.reload();
                });
            }
        });
    };

    const handleEditClick = (id) => {
        console.log(id);
        Swal.fire({
            title: 'Editar Servicio',
            html:
                '<input id="name" class="swal2-input" placeholder="Nombre" autocapitalize="off">' +
                '<input id="descripcion" class="swal2-input" placeholder="Descripción">' +
                '<input id="categoria" class="swal2-input" placeholder="Categoría">' +
                '<input id="calificacion" class="swal2-input" placeholder="Calificación">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value;
                const descripcion = Swal.getPopup().querySelector('#descripcion').value;
                const categoria = Swal.getPopup().querySelector('#categoria').value;
                const calificacion = Swal.getPopup().querySelector('#calificacion').value;

                return fetch(`https://backend-mxc3.onrender.com/proveedor/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        descripcion,
                        categoria,
                        calificacion
                    })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Actualización exitosa',
                    text: 'El servicio ha sido actualizado.',
                    icon: 'success'
                }).then(() => {
                    window.location.reload();
                });
            }
        });
    };

    const handleSubmitClick = () => {
        Swal.fire({
            title: 'Crear Nuevo Servicio',
            html:
                '<input id="name" class="swal2-input" placeholder="Nombre" autocapitalize="off">' +
                '<input id="descripcion" class="swal2-input" placeholder="Descripción">' +
                '<input id="categoria" class="swal2-input" placeholder="Categoría">' +
                '<input id="calificacion" class="swal2-input" placeholder="Calificación">',

            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value;
                const descripcion = Swal.getPopup().querySelector('#descripcion').value;
                const categoria = Swal.getPopup().querySelector('#categoria').value;
                const calificacion = Swal.getPopup().querySelector('#calificacion').value;

                return fetch("http://localhost:5000/proveedor", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        descripcion,
                        categoria,
                        calificacion,
                    }),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(`Request failed: ${error}`)
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Añadido exiosamente`,
                }).then(() => {
                    window.location.reload();
                });
            }
        })
    }

    function getPaginatedUsers() {
        fetch(`http://localhost:5000/getAllProveedor`, {
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
                <button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>
                    Anadir Nuevo servicio
                </button>
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
                                            <button className="btn btn-primary" onClick={() => handleEditClick(i._id)}>Editar</button>
                                            <button className="btn btn-primary" onClick={() => handleDeleteClick(i._id)}>Eliminar</button>
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
