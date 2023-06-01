import React, { Component, useEffect, useState } from "react";
import AdminHome from "../Pages/adminHome";
import { useNavigate } from 'react-router-dom'
import UserHome from "../Pages/userHome";

export default function UserDetails() {
    const [userData, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        fetch("https://backend-mxc3.onrender.com/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data.userType);
                if (data.data.userType == "Admin") {
                    setAdmin(true);

                }

                setUserData(data.data);

                if (data.data == "token expired") {
                    alert("Token expired login again");
                    window.localStorage.clear();
                    navigate('/sign-in')
                }
            });
    }, []);
    console.log(admin)
    return admin ? <AdminHome /> : <UserHome userData={userData} />;
}

