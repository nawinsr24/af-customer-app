import React from 'react'
import { useEffect } from 'react';
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

function ProtectedRoute({ allowedRoles, children }) {
    const { ctxtUser } = useAuthContext();

    const location = useLocation();

    if (!ctxtUser){
        return   <Navigate to="/login" state={{ from: location }} replace />
    }


        return (
            (ctxtUser?.type === 'sa' && allowedRoles?.includes('sa')) ? <Outlet /> :
                (ctxtUser?.type === 'staff' && allowedRoles?.includes('staff')) ? <Outlet /> :
                    <Navigate to="/login" state={{ from: location }} replace />
        );
}

export default ProtectedRoute