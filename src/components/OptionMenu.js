import * as React from 'react';
import { Menu } from '@mui/material';


function OptionMenu({ handleClose, anchorEl, open, children }) {
    return (
        <Menu 
            id="demo-customized-menu"
            MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose} 
        >
            {children}
        </Menu>
    )
}

export default OptionMenu