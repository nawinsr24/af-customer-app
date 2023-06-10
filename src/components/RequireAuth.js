import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

function RequireAuth({ allowedRoles }) {
    const { ctxtUser } = useAuthContext();

    const location = useLocation();
    return (
        (ctxtUser?.type === 'sa' && allowedRoles?.includes('sa')) ? <Outlet /> :
        (ctxtUser?.type === 'staff' && allowedRoles?.includes('staff')) ? <Outlet /> :
         <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth