import React from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute=({children})=>{
    const accessToken=localStorage.getItem("accessToken");
    const username=localStorage.getItem("username");

    const  isAdmin= accessToken && username==="admin";
    return isAdmin?children : <Navigate to="/" />
}


export default ProtectedRoute;