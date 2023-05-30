import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ManageBlog = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("JWT")){
            navigate("/login")
        }
    })
    return (
        <div>
            <h1>ManageBlog</h1>
        </div>
    );
};

export default ManageBlog;