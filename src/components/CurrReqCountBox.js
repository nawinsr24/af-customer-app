import React from 'react';
import { Box, Typography } from '@mui/material';


function CurrReqCountBox({ imgPath, title, count }) {
    return (
        <Box sx={{ backgroundColor: "#F2F2F2", borderRadius: 1.4, pt: 2, pb: 1, pl: 3, width: 280 }}>
            <img src={imgPath} alt={imgPath} />
            <Typography sx={{ fontWeight: "600" }}>{title}</Typography>
            <Typography sx={{ fontWeight: "700", fontSize: 40 }}>{count}</Typography>
        </Box>
    )
}

export default CurrReqCountBox;