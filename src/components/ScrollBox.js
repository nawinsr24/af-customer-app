import { Box } from '@mui/material'
import React from 'react'

function ScrollBox({ children, height, width }) {
    return (
        <Box sx={{
            mb: 0,
            display: "flex",
            flexDirection: "column",
            height: height ? height : "90%",
            overflow: "hidden",
            overflowY: "scroll",
            // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
            width
        }}>
            {children}
        </Box>
    )
}

export default ScrollBox