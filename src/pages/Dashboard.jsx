import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("JWT")){
            navigate("/login")
        }
    })
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default Dashboard;