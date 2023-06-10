import { Typography, Stack, Box } from '@mui/material'
import React from 'react'


function UnderLineTxt({ boxStyle, label, value, line, icon, minWidth, maxWidth, gap }) {

    const defaultBoxStyle = { bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: 10, fontWeight: "600" }
    return <Stack justifyContent={"center"}>
        <Stack direction={"row"} alignItems={"center"} mt={2}>
            <Typography sx={{ fontSize: 14, fontWeight: "550" }} minWidth={gap || minWidth || 300} maxWidth={gap || maxWidth || 300} >{label}</Typography>
            <Stack direction={"row"} alignItems={"center"} minWidth={minWidth || 300} maxWidth={maxWidth || 300} >
                {icon && <Box component={"img"} src={icon} alt={icon} mr={1.1} sx={{ height: 18 }} />}
                <Typography sx={{ fontSize: 14.5, fontWeight: "600", color: "rgba(0, 0, 0, 0.5)" }}>{value}</Typography>
            </Stack>
        </Stack>
        {line && <Box sx={boxStyle || defaultBoxStyle} height={1.5} width={"100%"} mt={1.3} />}
    </Stack>
}

export default UnderLineTxt