import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

function LabelTxtWithIconBtn({ label, value, minWidth, maxWidth, bgcolor, icon, fontSize, valueClr, onClick }) {
    return (
        <Stack minWidth={minWidth} maxWidth={maxWidth} bgcolor={bgcolor}>
            <Typography sx={{ fontSize: 14, fontWeight: "550" }}>{label}</Typography>
            <Stack direction={"row"} alignItems={"center"} mt={0.5} onClick={onClick}>
                <Box component={"img"} src={icon} alt={icon} mr={1.1} sx={{ height: 18 }} />
                <Typography sx={{ fontSize: fontSize || 14.5, fontWeight: "600", color: valueClr || "rgba(0, 0, 0, 0.5)", mt: 0.5 }}>{value}</Typography>
            </Stack>
        </Stack>
    )
}

export default LabelTxtWithIconBtn