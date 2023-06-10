import React from 'react';
import { ListItemButton, ListItemIcon, Menu, MenuItem, Stack, styled, Tooltip, tooltipClasses, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import route from '../Routes';


const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

function SDListItem({ i }) {
    return i.title === "History" ? <HisItem i={i} key={i.title} /> : <NrmlItem i={i} key={i.title} />
}

function NrmlItem({ i }) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <HtmlTooltip title={
            <React.Fragment>
                <Typography component={'h3'}>{i.title}</Typography>
            </React.Fragment>} placement="right">

            <ListItemButton key={i.title}
                sx={{
                    alignItems: "center", py: 2
                    // fill: location.pathname !== i.path && "var(--sec-grey-color)",
                    // backgroundColor: location.pathname === i.path && "#E8E4FB",
                    // color: location.pathname !== i.path && "var(--sec-grey-color)"
                }}
                onClick={() => { navigate(i.path) }}>
                <img src={location.pathname !== i.path ? i.deSelImgPath : i.selImgPath} alt="side drawer img" style={location.pathname !== i.path ? i.deSelStyle : i.selsStyle} />
            </ListItemButton>

        </HtmlTooltip>
    )
}

function HisItem({ i }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const isSelected = !((location.pathname === route.boCustReqList + "history") || (location.pathname === route.boShipmtList + "history"))

    const optionItems = [
        {
            title: "Request History",
            fn: handleReqHis
        },
        {
            title: "Shipment History",
            fn: handleShipmtHis
        }
    ]

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleReqHis() {
        navigate(route.boCustReqList + "history")
        handleClose()
    }

    function handleShipmtHis() {
        navigate(route.boShipmtList + "history")
        handleClose()
    }

    return (<Stack>
        <HtmlTooltip title={
            <React.Fragment>
                <Typography component={'h3'}>{i.title}</Typography>
            </React.Fragment>} placement="right">

            <ListItemButton key={i.title} sx={{ alignItems: "center", py: 2 }} onClick={handleOptionClick}>
                <img src={isSelected ? i.deSelImgPath : i.selImgPath}
                    alt="side drawer img" style={isSelected ? i.deSelStyle : i.selsStyle} />
            </ListItemButton>
        </HtmlTooltip>
        <Menu
            id="demo-customized-menu"
            MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onBlur={handleClose}
        >
            {optionItems.map((i) => <MenuItem
                sx={{ pl: 2, pr: 5 }}
                key={i.title}
                onClick={i.fn}>
                {i.title}
            </MenuItem>)}
        </Menu>
    </Stack>
    )
}

export default SDListItem