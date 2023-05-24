import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageFood = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("JWT")){
            navigate("/login")
        }
    })
    return (
        <div>
            <h1>ManageFood</h1>
        </div>
    );
};

export default ManageFood;