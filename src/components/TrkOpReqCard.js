import { Edit, MoreVert, PlaylistAdd } from '@mui/icons-material'
import { Box, IconButton, ListItemIcon, MenuItem, Rating, Stack, Tooltip, Typography } from '@mui/material'
import React from 'react'
import BgBox from './BgBox'
import truck from '../assets/svg/truck.svg';
import weight from '../assets/svg/weight.svg';
import calend from '../assets/svg/calend.svg';
import paymtMethod from '../assets/svg/paymtMethod.svg';
import contact from '../assets/svg/contact.svg';
import { capFirstLetter, formatDateTime, formatRoutes, getLocalStrg, makeTxtOverFLow } from '../utils/format';
import { useState } from 'react';
import OptionMenu from './OptionMenu';
import distanceCard from '../assets/svg/distanceCard.svg';
import { useTranslation } from "react-i18next";
import AddClick from './AddClick';
import route from '../Routes';
import { useNavigate } from 'react-router-dom';

function TrkOpReqCard({ i }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const optionItems = [
        {
            title: t("bo.trkOpReqCard.edit"),
            icon: <Edit fontSize="small" />,
            fn: () => { navigate(route.boEditTrkOpReq + i.truckOpReqId); }
        },
        {
            title: t("bo.trkOpReqCard.createShipment"),
            icon: <PlaylistAdd fontSize="small" />,
            fn: () => { navigate(route.boAddShipmt + "?trkOpReqId=" + i.truckOpReqId); }
        }
    ]

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleOptionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    return (

        <Box mr={2} sx={{ position: "relative" }}>
            <BgBox height={290} width={330} px={2.5} py={1}>
                <Stack direction={'row'} alignItems={"flex-start"} >
                    <Stack direction={'row'} alignItems={"center"} >
                        <img src={truck} alt="cardBox" />
                        {/* <Box component="img" alt={`${JSON.parse(i?.type)?.a_Vehicle.toLowerCase()}.svg`} src={require("../assets/svg/trkType-" + JSON.parse(i?.type)?.a_Vehicle.toLowerCase() + ".svg")}
                                sx={{ height: 33, mr: 2 }} /> */}
                        <Box width={20} />
                        <AddClick path={route.boTrkOpReqInfo + i.truckOpReqId}>
                            <Box width={225}>
                                <Typography sx={{ fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{capFirstLetter(i.trkOpFName) + " " + capFirstLetter(i.trkOpLName)}</Typography>
                                <Typography sx={{ color: "secondary.main", fontSize: 13 }}>{i.truckOpReqId}</Typography>
                                <Typography sx={{ color: "secondary.main", fontSize: 13 }}>{t("bo.trkOpReqCard.posted")} {formatDateTime(i.c_at)}</Typography>
                            </Box>
                        </AddClick>
                    </Stack>
                    <IconButton onClick={(e) => { handleOptionClick(e, i.id) }} color="secondary" aria-label="add an alarm" sx={{ position: "relative", bottom: 7, right: 13, overflow: "visible" }}>
                        <MoreVert />
                    </IconButton>

                </Stack>

                <Typography sx={{ fontWeight: "600", fontSize: 13.5, color: "secondary.main", mr: 3 }} style={{ display: 'inline-block' }}>
                    {makeTxtOverFLow(i.routesArr[0].place, 25)} &#160; <Typography component={'span'} sx={{ fontWeight: "600", fontSize: 20 }} style={{ display: 'inline-block' }}> &#8594;</Typography> <Typography component={'span'} sx={{ fontWeight: "600", fontSize: 13.5 }} style={{ display: 'inline-block' }}> {makeTxtOverFLow(i.routesArr[(i.routesArr).length - 1].place, 25)}
                    </Typography>
                </Typography>

                <Tooltip title={formatRoutes(i.routesArr)} placement="top" arrow>
                    <Stack direction={'row'} alignItems={"center"} sx={{ position: "absolute", top: 80, right: 20, overflow: "visible" }}>
                        <img src={distanceCard} alt="distanceCard" />
                        <Typography sx={{ fontWeight: "600", fontSize: 13.5, color: "primary.main", ml: 1 }} >{i.routesArr.length - 2} stops</Typography>
                    </Stack>
                </Tooltip>



                <Box sx={{ backgroundColor: "rgb(0, 0, 0, 0.1)", height: "1px", my: 1 }} />
                <Stack direction={'row'} justifyContent="space-between">
                    <div>
                        <Stack direction={'row'} alignItems={"center"}>
                            <img src={weight} alt="weight" />
                            <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} > {t("bo.trkOpReqCard.avilSpace")} {parseFloat(i.addableCap - i.filledCap).toFixed(2)} {capFirstLetter(i.capUnit)}(s)</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={"center"} mt={1}>
                            <img src={paymtMethod} alt="paymtMethod" />
                            <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} > {t("bo.trkOpReqCard.tlSh")} {i.createdShipmtCount}</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={"center"} mt={1}>
                            <img src={calend} alt="calend" />
                            <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} >{t("bo.trkOpReqCard.type")} {JSON.parse(i?.type || "{}").vehicle}</Typography>
                        </Stack>
                    </div>
                    <Stack alignItems={"center"}>
                        <Box sx={{ backgroundColor: "#ddd6ff", height: 30, width: 110, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: 10, color: "#5E47DD" }}>{t("bo.trkOpReqCard.expecRate")}</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: "600", mt: 0.5 }}><span name="Rs">&#8377;</span> {getLocalStrg(i.estPrice)}</Typography>
                    </Stack>

                </Stack>
                <Box sx={{ backgroundColor: "rgb(0, 0, 0, 0.1)", height: "1px", my: 1 }} />
                <Stack direction={'row'} alignItems={"center"} >
                    <img src={contact} alt="Contact" />
                    <Box width={15} />
                    <div>
                        <Typography sx={{ fontWeight: "600", fontSize: 14 }}>{capFirstLetter(i.custFName) + " " + capFirstLetter(i.custLName)}</Typography>
                        <Typography sx={{ color: "secondary.main", fontSize: 14 }}>{i.trkOpContact}</Typography>
                        <Rating name="read-only" value={i.truckRating} precision={0.1} readOnly size='small' />
                    </div>
                    <Box width={100} />

                </Stack>

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

export default TrkOpReqCard