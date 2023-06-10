import { Box, ButtonBase, IconButton, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material'
import React from 'react'
import BgBox from './BgBox'
import { capFirstLetter, formatDate } from '../utils/format';
import { useNavigate } from 'react-router-dom';
import route from '../Routes';
import { useTranslation } from "react-i18next";
import { Edit, Info, MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import OptionMenu from './OptionMenu';
import StyledSwitch from './StyledSwitch';
import { useAuthContext } from '../context/AuthContext';
import { putTrkStatus } from '../services/trkOp-service';
import { customAlert, notify } from './notify';


function TrkListCard({ i }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    i.type = i.type || "{}";
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { setAsyncLoading } = useAuthContext();

    const optionItems = [
        {
            title: t("bo.trkListCard.view"),
            icon: <Info fontSize="small" />,
            fn: handleOnClick
        },
        {
            title: t("bo.trkListCard.edit"),
            icon: <Edit fontSize="small" />,
            fn: handleEdit
        }
    ]

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleOptionClick = (event, custReqId) => {
        setAnchorEl(event.currentTarget);
    };


    function handleOnClick() {
        navigate(route.boTrkInfo + i.id, { state: { trkData: i } });
    }

    function handleEdit() {
        navigate(route.boEditTrk + i.id);
    }

    async function updateStatus() {
        setAsyncLoading(true);
        try {
            let status = i.status === 1 ? 0 : 1;
            await putTrkStatus(i.id, status);
            window.location.reload();
        } catch (err) {
            console.log(err);
            if (err === 409)
                notify("error", "Truck Already Registred");
            else
                customAlert(err)
        }
        setAsyncLoading(false)
    }

    return (

        <Box mr={2}  >
            <BgBox height={180} width={350} px={2.5} >
                <Stack direction={'row'} alignItems={"flex-start"} sx={{ position: "relative" }}>
                    <Stack direction={'row'} alignItems={"center"}  >
                        <Box component="img" alt={`${JSON.parse(i?.type)?.a_Vehicle.toLowerCase()}.svg`} src={require("../assets/svg/trkType-" + JSON.parse(i?.type)?.a_Vehicle.toLowerCase() + ".svg")}
                            sx={{ height: 50, mr: 2 }} />

                        <ButtonBase component="div" onClick={handleOnClick}>
                            <Box width={150}>
                                <Typography sx={{ fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{i?.regNo}</Typography>
                                <Typography sx={{ color: "secondary.main", fontSize: 13 }}>{JSON.parse(i?.type)?.a_Vehicle}</Typography>
                            </Box>
                        </ButtonBase>
                    </Stack>
                    <Stack direction={'row'} alignItems={"center"} sx={{ position: "absolute", bottom: 20, right: -25, overflow: "visible" }}>
                        <StyledSwitch checked={i?.status ? true : false} onClick={() => { updateStatus() }} />
                        <IconButton onClick={(e) => { handleOptionClick(e, i.id) }} color="secondary" aria-label="add an alarm" >
                            <MoreVert />
                        </IconButton>
                    </Stack>
                </Stack>

                <Box sx={{ backgroundColor: "rgb(0, 0, 0, 0.1)", height: "1px", my: 1.5 }} />

                <Stack gap={0.8}>
                    <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1, color: "secondary.main" }} >{t("bo.trkListCard.pType")}&nbsp; &nbsp; {capFirstLetter(i.permit_type)}</Typography>
                    <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1, color: "secondary.main" }} >{t("bo.trkListCard.fcExpDate")}&nbsp; &nbsp; {formatDate(i.fc_expDate)}</Typography>
                    <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1, color: "secondary.main" }} >{t("bo.trkListCard.insExpDate")}&nbsp; &nbsp; {formatDate(i.ins_expDate)}</Typography>
                </Stack>

                {/* <Box sx={{  position: "absolute", top: 140, right: 15, overflow: "visible" }}>
                    {shipmtStatus(i.currStatus)}
                </Box> */}

            </BgBox>

            <OptionMenu open={open} handleClose={handleClose} anchorEl={anchorEl} >
                {optionItems.map((i) => <MenuItem
                    sx={{ pl: 2, pr: 5 }}
                    key={i.title}
                    onClick={i.fn}>
                    <ListItemIcon > {i.icon}</ListItemIcon>
                    {i.title}
                </MenuItem>)}
            </OptionMenu>
        </Box>

    )
}

export default TrkListCard