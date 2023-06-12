import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login")
        }
        console.log(process.env);
    })
    async function handleLogOut() {
        await localStorage.clear("JWT");
        localStorage.setItem("isLogin", false);
        navigate("/login");
    }
    return (
        <div>
            <h1>
                <div style={{ fontFamily: "", justifyContent: 'center', display: 'flex', flexDirection: "column", padding: "20px 100px" }}>
                    <button style={{ fontFamily: "'Anton', sans-serif" }} onClick={(event) => {
                        handleLogOut(event);
                    }}>Đăng xuất </button>
                </div>
            </h1>
        </div>
    );
};

export default About;