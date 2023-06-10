import { Box, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function Layout() {
    const isLarge = useMediaQuery("(min-width: 600px)");
    return (
        <Stack >
            <NavBar />
            <Stack direction={'row'} sx={{ height: `calc(100vh - 55px)` }}>
                <Box alignItems='center' px={2.3} py={2} sx={{ width: isLarge ? "95.3vw" : "70rem" }} >
                    <Outlet />
                </Box>
            </Stack>
        </Stack>
    )
}
