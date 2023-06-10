import { ClearRounded, LocationOnRounded } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { makeTxtOverFLow } from '../utils/format'
import routeArrowSVG from '../assets/svg/routeArrow.svg';


function RouteCard({ route, topLine, bottomLine, handleClear, index, bgcolor }) {
    function handleIconBtnClick() {
        handleClear(index)
    }
    return <Stack direction={"row"} alignItems={"center"} sx={{ backgroundColor: bgcolor || "rgba(131, 146, 171,0.09)", borderRadius: 1.4, height: 50, width: "100%" }}>
        <Stack width={50} alignItems="center" >
            <Box height={12} width={topLine && 30} component={"img"} src={routeArrowSVG} alt={routeArrowSVG} mb={0.37} />
            <LocationOnRounded fontSize='small' color='primary' />
            <Box height={12} width={bottomLine && 1.68} bgcolor={"rgba(0, 0, 0,0.3)"} mt={0.37} />
        </Stack>
        <Stack direction={"row"} pr={2} alignItems={"center"} justifyContent='space-between' width={"100%"}>
            <Typography fontSize={14}>{makeTxtOverFLow(route, 60)}</Typography>
            {handleClear && <IconButton onClick={handleIconBtnClick}>
                <ClearRounded />
            </IconButton>}
        </Stack>
    </Stack>
}

export default RouteCard