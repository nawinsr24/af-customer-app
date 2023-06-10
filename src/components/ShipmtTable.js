import { MoreVert } from '@mui/icons-material';
import { Box, Button, IconButton, MenuItem, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import route from '../Routes';
import { capFirstLetter, formatDateTime, makeTxtOverFLow, shipmtStClrs } from '../utils/format';
import OptionMenu from './OptionMenu';
import StyledTableContainer from './StyledTableContainer';
import { useTranslation } from "react-i18next";



function ShipmtTable({ shipmtRow }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [currMenuShipmtId, setCurrMenuShipmtId] = useState(null);


    const columns = [
        {
            id: 'shipmtId',
            label: t("bo.shipTable.shpId"),
            align: 'left',
            minWidth: 190
        },
        {
            id: 'load',
            label: t("bo.shipTable.load"),
            align: 'left',
            minWidth: 190
        },
        {
            id: 'location',
            label: t("bo.shipTable.location"),
            align: 'left',
            minWidth: 190
        },
        {
            id: 'cust',
            label: t("bo.shipTable.cust"),
            align: 'left',
            minWidth: 190
        },
        {
            id: 'trkOp',
            label: t("bo.shipTable.trkOp"),
            minWidth: 190
        },
        {
            id: 'status',
            label: t("bo.shipTable.sts"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'c_at',
            label: t("bo.shipTable.createdAt"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'options',
            label: '',
            // align: 'right',
            minWidth: 80
        },
    ];

    const optionItems = [
        {
            title: t("bo.shipTable.edit"),
            fn: handleEdit
        }
    ];

    const handleOptionClick = (event, shipmtId) => {
        setAnchorEl(event.currentTarget);
        setCurrMenuShipmtId(shipmtId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleEdit() {
        handleClose();
        navigate(route.boEditCustReq + currMenuShipmtId);
    }


    async function handleNameClick(reqRow) {
        handleClose();
        navigate(route.boCustInfo + reqRow.custId);
    }

    async function handleReqIdClick(reqRow) {
        handleClose();
        navigate(route.boShipmtInfo + reqRow.shipmtId);
    }

    function shipmtStatus(status) {
        let stObj = shipmtStClrs(status);

        return <Box sx={{ backgroundColor: stObj.bgColor, height: 30, width: 100, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ fontWeight: "600", fontSize: 12, color: stObj.txtColor }}>{stObj.label}</Typography>
        </Box>
    }

    return (
        <StyledTableContainer height={"83%"}>
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            sx={{ color: "#8392AB", fontWeight: "bold", py: 1 }}
                            key={column.id}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {(shipmtRow || []).map((reqRow) => {
                    return (
                        <TableRow hover tabIndex={-1} key={reqRow.shipmtId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            {columns.map((column) => {
                                const value = reqRow[column.id];
                                return (
                                    (column.id === 'options') ?
                                        <TableCell key={column.id} align={column.align}>
                                            <IconButton onClick={(e) => { handleOptionClick(e, reqRow.shipmtId) }}>
                                                <MoreVert />
                                            </IconButton>
                                        </TableCell> : (column.id === 'cust') ?
                                            <TableCell key={column.id} align={column.align}>
                                                <Button variant="text" sx={{ color: "#000000", textAlign: "left" }} onClick={() => { handleNameClick(reqRow); }}>
                                                    {capFirstLetter(reqRow.custFName) + " " + capFirstLetter(reqRow.custLName)}&nbsp; &nbsp; &nbsp;({reqRow.custMobile1})
                                                </Button>
                                            </TableCell> : (column.id === 'trkOp') ?
                                                <TableCell key={column.id} align={column.align}>
                                                    <Button variant="text" sx={{ color: "#000000", textAlign: "left" }} onClick={() => { handleNameClick(reqRow); }}>
                                                        {capFirstLetter(reqRow.trkOpFName) + " " + capFirstLetter(reqRow.trkOpLName)}&nbsp; &nbsp; &nbsp;({reqRow.trkOpMobile1})
                                                    </Button>
                                                </TableCell> : (column.id === 'location') ?
                                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                        {makeTxtOverFLow(reqRow.shipmtPicLoc, 30) + " - " + makeTxtOverFLow(reqRow.shipmtDelLoc, 30)}
                                                    </TableCell> : (column.id === 'load') ?
                                                        <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                            {capFirstLetter(reqRow.matType)}  &nbsp; - &nbsp; {reqRow.weight}{capFirstLetter(reqRow.weightUnit)}(s) &nbsp;  - &nbsp;  {capFirstLetter(reqRow.loadType)}
                                                        </TableCell> : (column.id === 'shipmtId') ?
                                                            <TableCell key={column.id} align={column.align} >
                                                                <Button variant="text" sx={{ color: "#000000", textAlign: "left" }} onClick={() => { handleReqIdClick(reqRow); }}>
                                                                    {reqRow.shipmtId}
                                                                </Button>
                                                            </TableCell> : (column.id === 'c_at') ?
                                                                <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                                    {formatDateTime(reqRow.c_at)}
                                                                </TableCell> : (column.id === "status") ?
                                                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                                        {shipmtStatus(reqRow.currStatus)}
                                                                    </TableCell> :
                                                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }} >
                                                                        {column.format && typeof value === 'number' ? column.format(value) : capFirstLetter(value)}
                                                                    </TableCell>);
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
            <OptionMenu open={open} handleClose={handleClose} anchorEl={anchorEl} >
                {optionItems.map((i) => <MenuItem
                    sx={{ pl: 2, pr: 5 }}
                    key={i.title}
                    onClick={i.fn}>
                    {i.title}
                </MenuItem>)}
            </OptionMenu>
        </StyledTableContainer>
    )
}

export default ShipmtTable