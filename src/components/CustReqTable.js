import { MoreVert } from '@mui/icons-material';
import { Button, IconButton, MenuItem, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import route from '../Routes';
import { capFirstLetter, formatDateTime, getTruckName, makeTxtOverFLow } from '../utils/format';
import OptionMenu from './OptionMenu';
import StyledTableContainer from './StyledTableContainer';
import { useTranslation } from "react-i18next";



function CustReqTable({ custReqRow }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [currMenuCustReqId, setCurrMenuCustReqId] = useState(null);


    const columns = [
        {
            id: 'custReqId',
            label: t("bo.custRqTable.reqId"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'name',
            label: t("bo.custRqTable.cust"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'location',
            label: t("bo.custRqTable.fromTo"),
            align: 'left',
            minWidth: 190
        },
        {
            id: 'load',
            label: t("bo.custRqTable.matTyWeight"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'loadType',
            label: t("bo.custRqTable.loadType"),
            minWidth: 80
        },
        {
            id: 'preTruckTypes',
            label: t("bo.custRqTable.trkType"),
            align: 'left',
            minWidth: 190
        },
        {
            id: 'c_at',
            label: t("bo.custRqTable.postedOn"),
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
            title: t("bo.custRqTable.createShipment"),
            fn: handleAddShipmt
        },
        {
            title: t("bo.custRqTable.edit"),
            fn: handleEdit
        }
    ];

    async function handleAddShipmt() {
        navigate(route.boAddShipmt + "?custReqId=" + currMenuCustReqId);
    }

    const handleOptionClick = (event, custReqId) => {
        setAnchorEl(event.currentTarget);
        setCurrMenuCustReqId(custReqId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleEdit() {
        handleClose();
        navigate(route.boEditCustReq + currMenuCustReqId);
    }


    async function handleNameClick(reqRow) {
        handleClose();
        navigate(route.boCustInfo + reqRow.custId);
    }

    async function handleReqIdClick(reqRow) {
        handleClose();
        navigate(route.boCustReqInfo + reqRow.custReqId);
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
                {(custReqRow || []).map((reqRow) => {
                    return (
                        <TableRow hover tabIndex={-1} key={reqRow.custReqId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            {columns.map((column) => {
                                const value = reqRow[column.id];
                                return (
                                    (column.id === 'options') ?
                                        <TableCell key={column.id} align={column.align}>
                                            <IconButton onClick={(e) => { handleOptionClick(e, reqRow.custReqId) }}>
                                                <MoreVert />
                                            </IconButton>
                                        </TableCell> : (column.id === 'name') ?
                                            <TableCell key={column.id} align={column.align}>
                                                <Button variant="text" sx={{ color: "#000000", textAlign: "left" }} onClick={() => { handleNameClick(reqRow); }}>
                                                    {capFirstLetter(reqRow.custFName) + " " + capFirstLetter(reqRow.custLName)}&nbsp; &nbsp; &nbsp;({reqRow.CustContact})
                                                </Button>
                                            </TableCell> : (column.id === 'location') ?
                                                <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                    {makeTxtOverFLow(reqRow.picLocation, 30) + " - " + makeTxtOverFLow(reqRow.delLocation, 30)}
                                                </TableCell> : (column.id === 'load') ?
                                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                        {capFirstLetter(reqRow.matType)}  &nbsp; &nbsp; - &nbsp;&nbsp; {reqRow.weight}{capFirstLetter(reqRow.weightUnit)}(s)
                                                    </TableCell> : (column.id === 'loadType') ?
                                                        <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                            {capFirstLetter(reqRow.loadType)}
                                                        </TableCell> : (column.id === 'custReqId') ?
                                                            <TableCell key={column.id} align={column.align} >
                                                                <Button variant="text" sx={{ color: "#000000", textAlign: "left" }} onClick={() => { handleReqIdClick(reqRow); }}>
                                                                    {reqRow.custReqId}
                                                                </Button>
                                                            </TableCell> : (column.id === 'c_at') ?
                                                                <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                                    {formatDateTime(reqRow.c_at)}
                                                                </TableCell> : (column.id === "preTruckTypes") ?
                                                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                                        {getTruckName(JSON.parse(reqRow.preTruckTypes))}
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

export default CustReqTable