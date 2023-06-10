import { ButtonBase } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function AddClick({ children, path }) {
    const navigate = useNavigate();
    return (
        <ButtonBase component="div" onClick={() => navigate(path)}>
            {children}
        </ButtonBase>
    )
}

export default AddClick