import { AppBar, Toolbar, styled, Button, MenuItem, ListItemIcon, ToggleButtonGroup, ToggleButton, Stack, useMediaQuery, ButtonBase } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react';
import logo from "../../assets/svg/logo.svg";
import { AccountCircle, Description, Logout, MoreVert } from '@mui/icons-material';
import ProfileMenu from '../ProfileMenu';
import { useAuthContext } from '../../context/AuthContext';
import { notify } from '../notify';
import { getStaffById } from '../../services/bo-service';
import { capFirstLetter } from '../../utils/format';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import route from '../../Routes';
import { useQuery } from 'react-query';
import QueryKey from '../../QueryKey';


// const StyledToolbar = styled(Toolbar)({
//     display: 'flex',
//     justifyContent: "space-between"
// });

const StyledButton = styled(Button)({
    backgroundColor: '#ffff',
    color: "var(--sec-grey-color)",
    "&:hover": {
        backgroundColor: '#E6E6E6',
    }
})



function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { ctxtlogout, setAsyncLoading, ctxtUser } = useAuthContext();
    const { i18n } = useTranslation();
    const isLarge = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();
    const { data: staffData } = useQuery([QueryKey.boUser, ctxtUser.userId], () => getStaffById(ctxtUser.userId))


    const saMenuList = [
        {
            title: "Logout",
            icon: <Logout fontSize="small" />,
            fn: handleLogout
        }
    ];

    const boMenuList = [
        {
            title: "Account",
            icon: <AccountCircle fontSize="small" />,
            fn: handleProfClick
        },
        {
            title: "Aadhaar Requests",
            icon: <Description fontSize="small" />,
            fn: handleAdrClick
        },
        {
            title: "Logout",
            icon: <Logout fontSize="small" />,
            fn: handleLogout
        }
    ];

    function handleProfClick() {
        navigate(route.BoUserInfo);
    }

    function handleAdrClick() {
        navigate(route.boAadhaarRequests);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        setAsyncLoading(true);
        ctxtlogout();
        setAsyncLoading(false);
        notify("info", "Logout successfully");
    }

    const handleChangeLng = (event, lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lng", lng);
    };

    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
            // margin: theme.spacing(0.5),
            border: 0,
            '&.Mui-disabled': {
                border: 0,
            },
            '&:not(:first-of-type)': {
                borderRadius: theme.shape.borderRadius,
            },
            '&:first-of-type': {
                borderRadius: theme.shape.borderRadius,
            },
        },
    }));

    return (
        <Box flexGrow={1}>
            <AppBar position='static' color='common' elevation={0} sx={{ borderBottom: 1, borderColor: "#E3E3E3" }}>
                <Toolbar variant="dense">
                    <Box flexGrow={1} mr={!isLarge && 10}>
                        <ButtonBase component={"div"} >
                            <Box component="img" alt="Comoany Logo" src={logo} sx={{ height: 30 }} onClick={() => navigate("/")} />
                        </ButtonBase>
                    </Box>
                    <Stack direction={"row"} >
                        <StyledToggleButtonGroup
                            color="primary"
                            value={i18n.language}
                            exclusive
                            onChange={handleChangeLng}
                            aria-label="Platform"
                            sx={{ mr: 10 }}
                        >
                            <ToggleButton value="en">English</ToggleButton>
                            <ToggleButton value="hi">हिन्दी</ToggleButton>
                        </StyledToggleButtonGroup>
                        <StyledButton variant="contained" endIcon={<MoreVert />} disableElevation onClick={handleClick} startIcon={<AccountCircle />}>
                            {ctxtUser?.type === 'sa' ? "Super Admin" : (staffData && capFirstLetter(staffData?.staff_name))}
                        </StyledButton>
                        <ProfileMenu open={open} handleClose={handleClose} anchorEl={anchorEl} >
                            {(ctxtUser?.type === 'sa' ? saMenuList : boMenuList).map(
                                (i) => <MenuItem onClick={() => { i.fn(); }} key={i.title}>
                                    <ListItemIcon > {i.icon}</ListItemIcon>
                                    {i.title}
                                </MenuItem>)}
                        </ProfileMenu>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
// sx={{ borderBottom: 1, borderColor: '#E3E3E3' }}

export default NavBar;