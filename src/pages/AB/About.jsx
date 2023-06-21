import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { getInfo } from '../../services/userService';

const About = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login")
        }
        console.log(process.env);
        setToken(localStorage.getItem("JWT"));
        if (token !== "") {
            getInfoUser(token);
        }
    })
    async function getInfoUser(token) {
        getInfo({
            jwtToken: token,
        })
            .then(async res => {
                if (!res.data.message) {
                    setEmail(res.data.user.email);
                    setName(res.data.user.fullName);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    async function handleLogOut() {
        await localStorage.clear("JWT");
        localStorage.setItem("isLogin", false);
        navigate("/login");
    }
    return (
        <div>
            <h1>
                <div style={{ fontFamily: "", justifyContent: 'center', display: 'flex', flexDirection: "column", padding: "20px 100px" }}>
                    <h1>Tên : {name}</h1>
                    <h1>Gmail : {email}</h1>
                    <h1>Role : Administrator</h1>
                    <button style={{ fontFamily: "'Anton', sans-serif", width: 400 }} onClick={(event) => {
                        handleLogOut(event);
                    }}>Đăng xuất </button>
                </div>
            </h1>
        </div>
    );
};

export default About;