import { Button, Modal, Pagination, Rating, Stack, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import QueryKey from '../QueryKey';
import route from '../Routes';
import { getAllTrkOpWPgSch } from '../services/trkOp-service';
import { capFirstLetter } from '../utils/format';
import LoadingScreen from './loadingScreen';
import { customAlert } from './notify';
import SearchTxtField from './SearchTxtField';
import StyledTableContainer from './StyledTableContainer';
import { useTranslation } from "react-i18next";


function SelectTrkOp({ handleClose, open }) {
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const { t } = useTranslation(); 
    const [searchWord, setSearchWord] = useState("");
    const limit = 6;
    const { isLoading, isError, error, data: trkOpRows } = useQuery(
        [QueryKey.trkOpList, pageNumber, searchKeyWord],
        () => getAllTrkOpWPgSch({ pageNumber, limit, searchKeyWord }),
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



    if (isError) {
        customAlert(error);
        return <h2>Something went wrong</h2>
    }


    if (isLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>


    const columns = [
        {
            id: 'TrkOpName',
            label: t("bo.selTrkOp.trkOpName"),
            minWidth: 170
        },
        {
            id: 'username',
            label: t("bo.selTrkOp.contact"),
            minWidth: 100
        },
        {
            id: 'rating',
            label: t("bo.selTrkOp.rating"),
            minWidth: 50
        },
        {
            id: 'verified',
            label: t("bo.selTrkOp.verified"),
            minWidth: 60
        }
    ];


    function verified(custRow) {
        if (custRow.aadhar_verified === 1 || custRow.pan_verified === 1 || custRow.gst_verified === 1)
            return <Typography sx={{ color: "green" }}>Yes</Typography>

        return <Typography sx={{ color: "red" }}>No</Typography>
    }

    async function handleRowClick(trkOpRow) {
        handleClose();
        navigate(route.boAddTrkOpReq + "?trkOpId=" + trkOpRow.truckopId, { replace: true });
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
                    <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>{t("bo.selTrkOp.selTrkOp")}</Typography>
                    <Stack direction={'row'} justifyContent="end">

                        <SearchTxtField searchKeyWord={searchWord} onSearch={(e) => setSearchWord(e.target.value)} onBtnClick={onSearchBtnClick} placeholder={t("bo.selTrkOp.search")} />

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
                        {trkOpRows?.data.map((trkOpRow) => {
                            return (
                                <TableRow hover tabIndex={-1} key={trkOpRow.truckopId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => { handleRowClick(trkOpRow); }}>
                                    {columns.map((column) => {
                                        const value = trkOpRow[column.id];
                                        return (
                                            (column.id === 'TrkOpName') ?
                                                <TableCell key={column.id} align={column.align} >
                                                    <Button variant="text" sx={{ color: "#000000" }} >
                                                        {capFirstLetter(trkOpRow.fName) + " " + capFirstLetter(trkOpRow.lName)}
                                                    </Button>
                                                </TableCell> : (column.id === 'verified') ?
                                                    <TableCell key={column.id} align={column.align} >
                                                        {verified(trkOpRow)}
                                                    </TableCell> : (column.id === 'rating') ?
                                                        <TableCell key={column.id} align={column.align} >
                                                            <Stack direction={"row"} alignItems={"center"}>
                                                                <Rating name="read-only" value={trkOpRow.truckRating} precision={0.1} readOnly size='small' sx={{ mr: 0.7 }} />
                                                                ({trkOpRow.fedCount})
                                                            </Stack>
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
                    <Pagination count={Math.ceil(trkOpRows?.totalLength / limit) || 0} color="primary" page={pageNumber} onChange={(e, v) => setPageNumber(v)} variant="outlined" shape="rounded" />
                </Stack>
            </Box>
        </Modal>
    )
}

export default SelectTrkOp