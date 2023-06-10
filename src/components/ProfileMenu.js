import {  Menu } from '@mui/material'
import React from 'react'

function DDMenu({ handleClose, anchorEl, open, children }) {
    return (
        <Menu
            anchorEl={anchorEl}
            id="basic-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {children}
        </Menu>
    )
}

export default DDMenu