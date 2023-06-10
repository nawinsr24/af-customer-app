import { Button, Modal, Pagination, Stack, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import QueryKey from '../QueryKey';
import route from '../Routes';
import { getAllCustWPgSch } from '../services/cust-service';
import { capFirstLetter } from '../utils/format';
import LoadingScreen from './loadingScreen';
import { customAlert } from './notify';
import SearchTxtField from './SearchTxtField';
import StyledTableContainer from './StyledTableContainer';
import { useTranslation } from "react-i18next";


function SelectCust({ handleClose, open }) {
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const limit = 6;
    const { t } = useTranslation();

    const { isLoading: isCusLoading, isError: isCusErr, error: cusErr, data: custRows } = useQuery(
        [QueryKey.custList, pageNumber, searchKeyWord],
        () => getAllCustWPgSch({ pageNumber, limit, searchKeyWord }),
        {
            keepPreviousData: true
        }
    )
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 660,
        bgcolor: 'background.paper',
        border: '2px solid #ffff',
        boxShadow: 24,
        px: 1.5,
        py: 1.5,
        borderRadius: 2,
    };



    if (isCusErr) {
        customAlert(cusErr);
        return <h2>Something went wrong</h2>
    }


    if (isCusLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>



    const columns = [
        {
            id: 'custName',
            label: t("bo.selectCust.cust"),
            minWidth: 170
        },
        {
            id: 'username',
            label: t("bo.selectCust.mob1"),
            minWidth: 120
        },
        {
            id: 'type',
            label: t("bo.selectCust.type"),
            minWidth: 70
        },
        {
            id: 'verified',
            label: t("bo.selectCust.verified"),
            minWidth: 50
        }
    ];


    function verified(custRow) {
        if (custRow.aadhar_verified === 1 || custRow.pan_verified === 1 || custRow.gst_verified === 1)
            return <Typography sx={{ color: "green" }}>Yes</Typography>

        return <Typography sx={{ color: "red" }}>No</Typography>
    }

    async function handleRowClick(custRow) {
        handleClose();
        navigate(route.boAddCustReq + "?custId=" + custRow.custId, { replace: true });
    }

    function onSearchBtnClick() {
        setSearchKeyWord(searchWord)
    }




    return (
        <Modal
            open={open}
            onClose={handleClose} 
        >
            <Box sx={modalStyle}>
                <Stack direction={'row'} justifyContent='space-between' m={1} >
                    <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>{t("bo.selectCust.selectCust")}</Typography>
                    <Stack direction={'row'} justifyContent="end">

                        <SearchTxtField searchKeyWord={searchWord} onSearch={(e) => setSearchWord(e.target.value)} onBtnClick={onSearchBtnClick} placeholder={t("bo.selectCust.searchCust")} />

                    </Stack>
                </Stack>
                <StyledTableContainer height={"50%"}>
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
                        {custRows?.data.map((custRow) => {
                            return (
                                <TableRow hover tabIndex={-1} key={custRow.custId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => { handleRowClick(custRow); }}>
                                    {columns.map((column) => {
                                        const value = custRow[column.id];
                                        return (
                                            (column.id === 'custName') ?
                                                <TableCell key={column.id} align={column.align} >
                                                    <Button variant="text" sx={{ color: "#000000" }} >
                                                        {capFirstLetter(custRow.fName) + " " + capFirstLetter(custRow.lName)}
                                                    </Button>
                                                </TableCell> : (column.id === 'verified') ?
                                                    <TableCell key={column.id} align={column.align} >
                                                        {verified(custRow)}
                                                    </TableCell> :
                                                    <TableCell key={column.id} align={column.align} >
                                                        {column.format && typeof value === 'number' ? column.format(value) : capFirstLetter(value)}
                                                    </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>


                </StyledTableContainer>
                <Stack sx={{ alignItems: "center", mt: 1 }}>
                    <Pagination count={Math.ceil(custRows?.totalLength / limit) || 0} color="primary" page={pageNumber} onChange={(e, v) => setPageNumber(v)} variant="outlined" shape="rounded" />
                </Stack>
            </Box>
        </Modal>
    )
}

export default SelectCust