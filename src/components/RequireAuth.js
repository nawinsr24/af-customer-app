import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

function RequireAuth() {
    const { ctxtUser } = useAuthContext();

    const location = useLocation();
    return (
        ctxtUser?.token ? <Outlet /> :
            <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth