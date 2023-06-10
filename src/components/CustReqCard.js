import { Edit, MoreVert, PersonAdd } from '@mui/icons-material'
import { Box, IconButton, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material'
import React from 'react'
import BgBox from './BgBox'
import cardBox from '../assets/svg/cardBox.svg';
import weight from '../assets/svg/weight.svg';
import calend from '../assets/svg/calend.svg';
import paymtMethod from '../assets/svg/paymtMethod.svg';
import contact from '../assets/svg/contact.svg';
import { capFirstLetter, convPayType, formatDate, formatDateTime, getLocalStrg, makeTxtOverFLow } from '../utils/format';
import { useState } from 'react';
import OptionMenu from './OptionMenu';
import { useTranslation } from "react-i18next";
import AddClick from './AddClick';
import route from '../Routes';
import { useNavigate } from 'react-router-dom';

function CustReqCard({ i }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
    const navigate = useNavigate()

    const optionItems = [
        {
            title: t("bo.cusReqCard.edit"),
            icon: <Edit fontSize="small" />,
            fn: handleEdit
        },
        {
            title: t("bo.cusReqCard.createShipment"),
            icon: <PersonAdd fontSize="small" />,
            fn: handleAddShipmt
        }
    ]

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleOptionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    async function handleAddShipmt() {
        handleClose();
        navigate(route.boAddShipmt + "?custReqId=" + i.custReqId);
    }


    async function handleEdit() {
        handleClose();
        navigate(route.boEditCustReq + i.custReqId);
    }


    return (

        <Box mr={2}>
            <BgBox height={290} width={330} px={2.5} py={1}>
                <Stack direction={'row'} alignItems={"flex-start"} >
                    <Stack direction={'row'} alignItems={"center"} >
                        <img src={cardBox} alt="cardBox" />
                        <Box width={20} />
                        <AddClick path={route.boCustReqInfo + i.custReqId}>
                            <Box width={225}>
                                <Typography sx={{ fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{capFirstLetter(i.matType)}</Typography>
                                <Typography sx={{ color: "secondary.main", fontSize: 13 }}> {i.custReqId}</Typography>
                                <Typography sx={{ color: "secondary.main", fontSize: 13 }}>{t("bo.cusReqCard.posted")} {formatDateTime(i.c_at)}</Typography>
                            </Box>
                        </AddClick>
                    </Stack>
                    <IconButton onClick={(e) => { handleOptionClick(e, i.id) }} color="secondary" aria-label="add an alarm" sx={{ position: "relative", bottom: 7, right: 13, overflow: "visible" }}>
                        <MoreVert />
                    </IconButton>
                </Stack>

                <Typography sx={{ fontWeight: "600", fontSize: 13.5, mt: 1, color: "secondary.main" }} style={{ display: 'inline-block' }}>
                    {makeTxtOverFLow(i.picLocation, 25)} <Typography component={'span'} sx={{ fontWeight: "600", fontSize: 20 }} style={{ display: 'inline-block' }}> &#8594;</Typography>  <Typography component={'span'} sx={{ fontWeight: "600", fontSize: 13.5 }} style={{ display: 'inline-block' }}> {makeTxtOverFLow(i.delLocation, 25)}
                    </Typography>
                </Typography>

                <Box sx={{ backgroundColor: "rgb(0, 0, 0, 0.1)", height: "1px", my: 1 }} />
                <Stack direction={'row'} justifyContent="space-between">
                    <div>
                        <Stack direction={'row'} alignItems={"center"}>
                            <img src={weight} alt="weight" />
                            <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} >{i.weight + " " + capFirstLetter(i.weightUnit)}(s)</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={"center"} mt={1}>
                            <img src={paymtMethod} alt="paymtMethod" />
                            <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} >{convPayType(i.payType)}</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={"center"} mt={1}>
                            <img src={calend} alt="calend" />
                            <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} >{t("bo.cusReqCard.shpDate")} {formatDate(i.picDate)}</Typography>
                        </Stack>
                    </div>
                    <Stack alignItems={"center"}>
                        <Box sx={{ backgroundColor: "#ddd6ff", height: 30, width: 100, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Typography sx={{ fontWeight: "600", fontSize: 12, color: "#5E47DD" }}>{t("bo.cusReqCard.expecRate")}</Typography>
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
                        <Typography sx={{ color: "secondary.main", fontSize: 14 }}>{i.CustContact}</Typography>
                    </div>
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

export default CustReqCard