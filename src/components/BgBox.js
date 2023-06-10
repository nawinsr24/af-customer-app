import { Box } from '@mui/system'
import React from 'react'


function BgBox({ children, height, width, px, py }) {
    return (
        <Box py={py ? py : 2} px={px ? px : 6} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: (height ? height : "100%"), border: 1, borderColor: '#E3E3E3', width: (width ? width : "100%") }}>
            {children}
        </Box>
    )
}

export default BgBox