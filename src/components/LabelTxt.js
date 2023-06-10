import { Stack, Typography } from '@mui/material'
import React from 'react'

function LabelTxt({ label, value, minWidth, maxWidth, bgcolor, fontSize }) {
    return (
        <Stack minWidth={minWidth} maxWidth={maxWidth} bgcolor={bgcolor}>
            <Typography sx={{ fontSize: 14, fontWeight: "550" }}>{label}</Typography>
            <Typography sx={{ fontSize: fontSize || 14.5, fontWeight: "600", color: "rgba(0, 0, 0, 0.5)", mt: 0.5 }}>{value}</Typography>
        </Stack>
    )
}

export default LabelTxt