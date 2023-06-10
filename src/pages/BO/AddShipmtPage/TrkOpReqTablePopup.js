import { Button, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { capFirstLetter, formatDateTime, formatRoutes, getTruckName, makeTxtOverFLow } from '../../../utils/format';
import StyledTableContainer from '../../../components/StyledTableContainer';
import { useTranslation } from "react-i18next";


function TrkOpReqTablePopup({ trkOpReqRow, handleReqCLick }) {
    const { t } = useTranslation();

    const columns = [
        {
            id: 'truckOpReqId',
            label: t("bo.tpReqTable.reqId"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'name',
            label: t("bo.tpReqTable.trkOp"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'currLocation',
            label: t("bo.tpReqTable.loc"),
            align: 'left',
            minWidth: 120
        },
        {
            id: 'routes',
            label: t("bo.tpReqTable.route"),
            align: 'left',
            minWidth: 120
        },
        {
            id: 'availSpace',
            label: t("bo.tpReqTable.space"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'truckTypes',
            label: t("bo.tpReqTable.trk"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'c_at',
            label: t("bo.tpReqTable.postedOn"),
            align: 'left',
            minWidth: 100
        }
    ];

    async function handleRowClick(reqRow) {
        handleReqCLick(reqRow?.truckOpReqId);
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
                {(trkOpReqRow || []).map((reqRow) => {
                    return (
                        <TableRow hover tabIndex={-1} key={reqRow.truckOpReqId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => { handleRowClick(reqRow); }} >
                            {columns.map((column) => {
                                const value = reqRow[column.id];
                                return (
                                    (column.id === 'name') ?
                                        <TableCell key={column.id} align={column.align}>
                                            <Button variant="text" sx={{ color: "#000000", textAlign: "left" }}>
                                                {capFirstLetter(reqRow.trkOpFName) + " " + capFirstLetter(reqRow.trkOpLName)}&nbsp; &nbsp; &nbsp;({reqRow.trkOpContact})
                                            </Button>
                                        </TableCell> : (column.id === 'routes') ?
                                            <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                <Tooltip title={formatRoutes(reqRow.routesArr)} key={column.id} placement="top" arrow>
                                                    <Box>
                                                        {makeTxtOverFLow(reqRow.routesArr[0].place, 30) + " - " + makeTxtOverFLow(reqRow.routesArr[(reqRow.routesArr).length - 1].place, 30)}
                                                        &nbsp;  <Typography sx={{ color: "primary.main", display: "inline-block", fontSize: 14, fontWeight: "600" }}>({reqRow.routesArr.length - 2} stops) </Typography>
                                                    </Box>
                                                </Tooltip>  </TableCell>
                                            : (column.id === 'truckTypes') ?
                                                <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                    {getTruckName(JSON.parse(reqRow?.type || "{}"))}
                                                </TableCell> : (column.id === 'availSpace') ?
                                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                        {reqRow.addableCap - reqRow.filledCap} {capFirstLetter(reqRow.capUnit)}(s)
                                                    </TableCell> : (column.id === 'truckOpReqId') ?
                                                        <TableCell key={column.id} align={column.align} >
                                                            <Button variant="text" sx={{ color: "#000000", textAlign: "left" }}>
                                                                {reqRow.truckOpReqId}
                                                            </Button>
                                                        </TableCell> : (column.id === 'c_at') ?
                                                            <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                                {formatDateTime(reqRow.c_at)}
                                                            </TableCell> :
                                                            <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }} >
                                                                {column.format && typeof value === 'number' ? column.format(value) : makeTxtOverFLow(value, 30)}
                                                            </TableCell>);
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>

        </StyledTableContainer>
    )
}

export default TrkOpReqTablePopup