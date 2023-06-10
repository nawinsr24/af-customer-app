import { Box, ButtonBase, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

function TrkTypeCard({ trkType, handleSelTrkType, selTrkType }) {

    function handleClick() {
        handleSelTrkType({
            a_Vehicle: trkType.vehicle,
            b_Suggestions: trkType.suggestions,
            c_ImgPath: "../assets/svg/trkType-" + trkType.vehicle.toLowerCase() + ".svg",
            _vhclObj: trkType
        })
    }

    return (
        <ButtonBase component="div" sx={{
            borderRadius: 2,
            bgcolor: selTrkType?.a_Vehicle === trkType.vehicle && "action.hover"
        }}
            onClick={handleClick}>
            <Stack sx={{ border: 1, borderColor: 'rgba(0,0,0,0.3)', color: selTrkType?.a_Vehicle === trkType.vehicle ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.6)', borderRadius: 2, width: 160, height: 140, alignItems: "center" }}>
                <Box component="img" alt={`${trkType.vehicle.toLowerCase()}.svg`} src={require("../assets/svg/trkType-" + trkType.vehicle.toLowerCase() + ".svg")} sx={{ height: 70, mt: 1.5, mb: 1 }} />
                <Typography sx={{ fontSize: 15, fontWeight: "600" }}>{trkType.vehicle}</Typography>
                <Typography sx={{ fontSize: 13 }}>{trkType.suggestions}</Typography>
            </Stack>
        </ButtonBase>
    )
}

export default TrkTypeCard