import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import BgBox from './BgBox'

function CountCard({ imgPath, title, count }) {
    return (
        <Box height={100} width={310} mt={1} >
            <BgBox px={3} py={0}>
                <Stack direction={'row'} alignItems={"center"}>
                    <img src={imgPath} alt={imgPath} />
                    <Box width={10} />
                    <div>
                        <Typography sx={{ fontWeight: "500", fontSize: 28 }}>{count}</Typography>
                        <Typography sx={{ color: "secondary.main", fontSize: 13 }}>{title}</Typography>
                    </div>
                </Stack>
            </BgBox>
        </Box>
    )
}

export default CountCard