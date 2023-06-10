import { Box, Collapse, IconButton, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react'
import StyledTableContainer from '../../../components/StyledTableContainer';
import { formatDateTime, formatPymtType, getLocalStrg } from '../../../utils/format';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LabelTxt from '../../../components/LabelTxt';



    
    const columns = [
        {
            id: 'type',
            label: "Mode of Payment",
            align: 'left',
            minWidth: 150
        },
        {
            id: 'paidAmt',
            label: "Amount",
            align: 'left',
            minWidth: 150,
            format: (value) => value.toLocaleString('en-IN')
        },
        {
            id: 'pymtDate',
            label: "Date",
            align: 'left',
            minWidth: 120
        },
        {
            id: 'arrow',
            label: "",
            align: 'left',
            minWidth: 80
        }
    ];


    
function CustPymtTable({ pymtData }) {
    
    return (
        <StyledTableContainer height={"90%"}>
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
                {(pymtData || []).map((row) => <Row key={row.id} row={row} />)}
            </TableBody>
        </StyledTableContainer>
    )
}

function Row({ row }) {
    

    
    const [open, setOpen] = useState(false);
    return (<>
        <TableRow hover tabIndex={-1} sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: open && "rgba(0, 0, 0, 0.2)" }} >
            {columns.map((column) => {
                const value = row[column.id];
                return (
                    (column.id === 'arrow') ?
                        <TableCell key={column.id} align={column.align}>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell> : (column.id === 'pymtDate') ?
                            <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                {formatDateTime(value)}
                            </TableCell> : (column.id === 'type') ?
                                <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                    {formatPymtType(value)}
                                </TableCell> : (column.id === 'paidAmt') ?
                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                        {"₹ " + getLocalStrg(value)}
                                    </TableCell> :
                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }} >
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell>);
            })}
        </TableRow>
        <TableRow sx={{ bgcolor: "rgba(223, 218, 248, 0.3)" }}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <Box sx={{ my: 2 }}>
                        <PymtDetails row={row} />
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>
    );
}

function PymtDetails({ row }) {
    
    switch (row?.type) {
        case "cheque":
            return <Stack gap={1}>
                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                    <LabelTxt label={"Bank Name"} value={row?.bankName} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"IFSC Code"} value={row?.ifsc} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Branch"} value={row?.branch} minWidth={185} maxWidth={185} />
                </Stack>
                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                    <LabelTxt label={"Mode of Payment"} value={formatPymtType(row?.type)} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Amount"} value={"₹ " + getLocalStrg(row?.paidAmt)} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Payment Date"} value={formatDateTime(row?.pymtDate)} minWidth={185} maxWidth={185} />
                </Stack>
                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                    <LabelTxt label={"Account Number"} value={row?.acNo} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Cheque Number"} value={row?.chequeNo} minWidth={185} maxWidth={185} />
                </Stack>
            </Stack>;
        case "portal":
        case "neft":
            return <Stack gap={1}>
                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                    <LabelTxt label={"Bank Name"} value={row?.bankName} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"IFSC Code"} value={row?.ifsc + "123456"} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Branch"} value={row?.branch} minWidth={185} maxWidth={185} />
                </Stack>
                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                    <LabelTxt label={"Mode of Payment"} value={formatPymtType(row?.type)} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Amount"} value={"₹ " + getLocalStrg(row?.paidAmt)} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Payment Date"} value={formatDateTime(row?.pymtDate)} minWidth={185} maxWidth={185} />
                </Stack>
                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                    <LabelTxt label={"Account Number"} value={row?.acNo} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Transaction ID"} value={row?.transactionId} minWidth={185} maxWidth={185} />
                </Stack>
            </Stack>;
        case "cash":
            return <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                <LabelTxt label={"Mode of Payment"} value={formatPymtType(row?.type)} minWidth={185} maxWidth={185} />
                <LabelTxt label={"Amount"} value={"₹ " + getLocalStrg(row?.paidAmt)} minWidth={185} maxWidth={185} />
                <LabelTxt label={"Payment Date"} value={formatDateTime(row?.pymtDate)} minWidth={185} maxWidth={185} />
            </Stack>;
        case "upi":
            return <Stack gap={1}>
                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                    <LabelTxt label={"Mode of Payment"} value={formatPymtType(row?.type)} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Amount"} value={"₹ " + getLocalStrg(row?.paidAmt)} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Payment Date"} value={formatDateTime(row?.pymtDate)} minWidth={185} maxWidth={185} />
                </Stack>
                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                    <LabelTxt label={"UPI Id"} value={row?.upi_id} minWidth={185} maxWidth={185} />
                    <LabelTxt label={"Transaction ID"} value={row?.transactionId} minWidth={185} maxWidth={185} />
                </Stack>
            </Stack>;
        default: return <></>
    }
}

export default CustPymtTable