import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ManageSick = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("JWT")){
            navigate("/login")
        }
    })
    return (
        <div>
            <h1>ManageSick</h1>
        </div>
    );
};

export default ManageSick;