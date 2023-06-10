import { Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { capFirstLetter, formatDateTime, getTruckName, makeTxtOverFLow } from '../../../utils/format';
import { useTranslation } from "react-i18next";
import StyledTableContainer from '../../../components/StyledTableContainer';



function CustReqTablePopup({ custReqRow, handleReqCLick }) {
    const { t } = useTranslation();

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
        }
    ];



    async function handleRowClick(reqRow) {
        handleReqCLick(reqRow?.custReqId);
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
                        <TableRow hover tabIndex={-1} key={reqRow.custReqId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => { handleRowClick(reqRow); }}>
                            {columns.map((column) => {
                                const value = reqRow[column.id];
                                return (
                                    (column.id === 'name') ?
                                        <TableCell key={column.id} align={column.align}>
                                            <Button variant="text" sx={{ color: "#000000", textAlign: "left" }} >
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
                                                            <Button variant="text" sx={{ color: "#000000", textAlign: "left" }} >
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
        </StyledTableContainer>
    )
}

export default CustReqTablePopup