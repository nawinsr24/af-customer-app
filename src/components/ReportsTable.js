import { Box, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react'
import { formatDate, formatDateTime, getFormatedUnit, getLocalStrg, shipmtStClrs } from '../utils/format';
import StyledTableContainer from './StyledTableContainer';


function ReportsTable({ shipmtRow, columns }) {

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
                                    (column.id === 'c_at') ?
                                        <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                            {formatDateTime(value)}
                                        </TableCell> : (column.id === 'shipmtPicDate' || column.id === 'shipmtDelDate') ?
                                            <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                {formatDate(value)}
                                            </TableCell> : (column.id === "currStatus") ?
                                                <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                    {shipmtStatus(value)}
                                                </TableCell> : (column.id === "cust_finalPrc") ?
                                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                        {"₹ " + getLocalStrg(value)}
                                                    </TableCell> : (column.id === "custPayType") ?
                                                        <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                            {getFormatedUnit(value)}
                                                        </TableCell> :
                                                        <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }} >
                                                            {value}
                                                        </TableCell>);
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </StyledTableContainer>
    )
}

export default ReportsTable