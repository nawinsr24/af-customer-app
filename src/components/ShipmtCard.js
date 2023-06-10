import { Edit, MoreVert, PersonAdd } from '@mui/icons-material'
import { Box, IconButton, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material'
import React from 'react'
import BgBox from './BgBox'
import weight from '../assets/svg/weight.svg';
import calend from '../assets/svg/calend.svg';
import custNameImg from '../assets/svg/custName.svg';
import trkOpNameImg from '../assets/svg/trkOpName.svg';
import { capFirstLetter, formatDate, formatDateTime, makeTxtOverFLow, shipmtStClrs } from '../utils/format';
import { useState } from 'react';
import OptionMenu from './OptionMenu';
import shipmtCardSVG from '../assets/svg/shipmtCard.svg';
import { useTranslation } from "react-i18next";
import AddClick from './AddClick';
import route from '../Routes';


function ShipmtCard({ i }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();

    const optionItems = [
        {
            title: t("bo.shpCard.edit"),
            icon: <Edit fontSize="small" />,
            fn: () => { }
        },
        {
            title: t("bo.shpCard.addUser"),
            icon: <PersonAdd fontSize="small" />,
            fn: () => { }
        }
    ]

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleOptionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function shipmtStatus(status) {
        let stObj = shipmtStClrs(status);

        return <Box sx={{ backgroundColor: stObj.bgColor, height: 30, width: 100, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ fontWeight: "600", fontSize: 12, color: stObj.txtColor }}>{stObj.label}</Typography>
        </Box>
    }

    return (
        <Box mr={2} sx={{ position: "relative" }}>
            <BgBox height={290} width={330} px={2.5} py={2}>
                <Stack direction={'row'} alignItems={"flex-start"} >
                    <Stack direction={'row'} alignItems={"center"} >
                        <img src={shipmtCardSVG} alt="shipmt" />
                        <Box width={20} />
                        <AddClick path={route.boShipmtInfo + i.shipmtId}>
                            <Box width={225}>
                                <Typography sx={{ fontWeight: "600", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{capFirstLetter(i.matType)}</Typography>
                                <Typography sx={{ color: "secondary.main", fontSize: 13 }}>{t("bo.shpCard.crtOn")} {formatDateTime(i.c_at)}</Typography>
                            </Box>
                        </AddClick>
                    </Stack>
                    <IconButton onClick={(e) => { handleOptionClick(e, i.id) }} color="secondary" aria-label="add an alarm" sx={{ position: "relative", bottom: 15, right: 13, overflow: "visible" }}>
                        <MoreVert />
                    </IconButton>
                </Stack>

                <Typography sx={{ fontWeight: "600", fontSize: 13.5, mt: 2, color: "secondary.main" }} style={{ display: 'inline-block' }}>
                    {makeTxtOverFLow(i.shipmtPicLoc, 25)} <Typography component={'span'} sx={{ fontWeight: "600", fontSize: 20 }} style={{ display: 'inline-block' }}> &#8594;</Typography>  <Typography component={'span'} sx={{ fontWeight: "600", fontSize: 13.5 }} style={{ display: 'inline-block' }}> {makeTxtOverFLow(i.shipmtDelLoc, 25)}
                    </Typography>
                </Typography>

                <Box sx={{ backgroundColor: "rgb(0, 0, 0, 0.1)", height: "1px", my: 1 }} />

                <Stack direction={'row'} alignItems={"center"}>
                    <img src={weight} alt="weight" />
                    <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} >{t("bo.shpCard.shpId")}&nbsp; &nbsp; {i.shipmtId}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={"center"} mt={1}>
                    <img src={weight} alt="weight" />
                    <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} >{t("bo.shpCard.loadWgt")} &nbsp;&nbsp;{i.weight + " " + capFirstLetter(i.weightUnit)}(s)</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={"center"} mt={1}>
                    <img src={calend} alt="calend" />
                    <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} >{t("bo.shpCard.pickDate")}&nbsp;&nbsp; {formatDate(i.shipmtPicDate)}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={"center"} mt={1}>
                    <img src={custNameImg} alt="custNameImg" />
                    <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} >{t("bo.shpCard.cust")}&nbsp; &nbsp;{capFirstLetter(i.custFName) + " " + capFirstLetter(i.custLName)}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={"center"} mt={1}>
                    <img src={trkOpNameImg} alt="trkOpNameImg" />
                    <Typography component={'span'} sx={{ fontWeight: "500", fontSize: 12, ml: 1.5, color: "secondary.main" }} >{t("bo.shpCard.trkop")} &nbsp;&nbsp;{capFirstLetter(i.trkOpFName) + " " + capFirstLetter(i.trkOpLName)}</Typography>
                </Stack>

                <Box sx={{ position: "absolute", top: 165, right: 15, overflow: "visible" }}>
                    {shipmtStatus(i.currStatus)}
                </Box>

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

export default ShipmtCard