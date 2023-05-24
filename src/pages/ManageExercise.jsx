import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageExercise = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("JWT")){
            navigate("/login")
        }
    })
    return (
        <div>
            <h1>ManageExercise</h1>
        </div>
    );
};

export default ManageExercise;