import { Add, MoreVert } from '@mui/icons-material';
import { Box, Button, IconButton, MenuItem, Pagination, Rating, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgBox from '../../../components/BgBox';
import { customAlert } from '../../../components/notify';
import OptionMenu from '../../../components/OptionMenu';
import SearchTxtField from '../../../components/SearchTxtField';
import StyledSwitch from '../../../components/StyledSwitch';
import StyledTableContainer from '../../../components/StyledTableContainer';
import { useAuthContext } from '../../../context/AuthContext';
import route from '../../../Routes';
import { getAllTrkOpWPgSch, putTrkOpStatus } from '../../../services/trkOp-service';
import { capFirstLetter } from '../../../utils/format';
import { useTranslation } from "react-i18next";
import { useQuery } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import QueryKey from '../../../QueryKey';



function TrkOpListPage() {
    const { setAsyncLoading } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    // const isLarge = useMediaQuery("(min-width: 600px)");
    const [currMenuTrkOpId, setCurrMenuTrkOpId] = useState(null);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const { t } = useTranslation();

    const [pageNumber, setPageNumber] = useState(1);
    const limit = 10;
    const { isLoading, isError, error, data: trkOpRows, refetch } = useQuery(
        [QueryKey.trkOpList, pageNumber, searchKeyWord],
        () => getAllTrkOpWPgSch({ pageNumber, limit, searchKeyWord }),
        {
            keepPreviousData: true
        }
    )


    if (isError) {
        customAlert(error);
        return <h2>Something went wrong</h2>
    }


    if (isLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

    const columns = [
        {
            id: 'TrkOpName',
            label: t("bo.trkOpLstPg.trkOpName"),
            minWidth: 170
        },
        {
            id: 'username',
            label: t("bo.trkOpLstPg.contact"),
            minWidth: 170
        },
        {
            id: 'rating',
            label: t("bo.trkOpLstPg.rating"),
            minWidth: 170
        },
        {
            id: 'verified',
            label: t("bo.trkOpLstPg.verified"),
            minWidth: 170
        },
        {
            id: 'status',
            label: t("bo.trkOpLstPg.sts"),
            minWidth: 80
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
            title: t("bo.trkOpLstPg.edit"),
            fn: handleEdit
        },
        {
            title: t("bo.trkOpLstPg.addReq"),
            fn: handleAddReq
        }
    ]


    const handleOptionClick = (event, truckopId) => {
        setAnchorEl(event.currentTarget);
        setCurrMenuTrkOpId(truckopId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleEdit() {
        // const selectedTrkOp = trkOpRows.filter((e) => e.truckopId === currMenuTrkOpId);
        handleClose();
        navigate(route.boEditTrkOp + currMenuTrkOpId);
    }

    async function handleAddReq() {
        handleClose();
        navigate(route.boAddTrkOpReq + "?trkOpId=" + currMenuTrkOpId);

    }

    async function handleRowClick(trkOpRow) {
        handleClose();
        navigate(route.boTrkOpInfo + trkOpRow.truckopId);
    }





    async function updateTrkOpStatus(trkOpRow) {
        setAsyncLoading(true);
        try {
            let status = trkOpRow.status === 1 ? 0 : 1;
            await putTrkOpStatus(trkOpRow.truckopId, status)
            refetch();
        } catch (err) {
            console.log(err);
            customAlert(err)
        }
        setAsyncLoading(false)
    }

    // function handleAddTrkOpClick() {
    //     // navigate(route.boAddCust);
    // }

    function onSearch(e) {
        setSearchWord(e.target.value)
    }

    function verified(trkOpRow) {
        if (trkOpRow.aadhar_verified === 1 || trkOpRow.pan_verified === 1 || trkOpRow.gst_verified === 1)
            return <Typography sx={{ color: "green" }}>{t("bo.trkOpLstPg.yes")}</Typography>

        return <Typography sx={{ color: "red" }}>{t("bo.trkOpLstPg.no")}</Typography>
    }

    function onSearchBtnClick() {
        setSearchKeyWord(searchWord);
        setPageNumber(1);
    }

    function handleAddTrkOpClick() {
        navigate(route.boAddTrkOp)
    }

    return (
        <BgBox>
            <Stack direction={'row'} justifyContent='space-between' m={2} >
                <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.trkOpLstPg.trkOps")}</Typography>
                <Stack direction={'row'} justifyContent="end">
                    <SearchTxtField searchKeyWord={searchWord} onSearch={onSearch} onBtnClick={onSearchBtnClick} placeholder={t("bo.trkOpLstPg.sechTrkOp")} />
                    <Button variant='contained' sx={{ ml: 5 }} startIcon={<Add />} color='primary' onClick={handleAddTrkOpClick}>{t("bo.trkOpLstPg.createTrkOp")}</Button>
                </Stack>
            </Stack>
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
                    {trkOpRows?.data.map((trkOpRow) => {
                        return (
                            <TableRow hover tabIndex={-1} key={trkOpRow.truckopId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                {columns.map((column) => {
                                    const value = trkOpRow[column.id];
                                    return (
                                        (column.id === 'status') ?
                                            <TableCell key={column.id} align={column.align}>
                                                <StyledSwitch checked={trkOpRow.status ? true : false} onClick={() => { updateTrkOpStatus(trkOpRow) }} />
                                            </TableCell> : (column.id === 'options') ?
                                                <TableCell key={column.id} align={column.align}>
                                                    <IconButton onClick={(e) => { handleOptionClick(e, trkOpRow.truckopId) }}>
                                                        <MoreVert />
                                                    </IconButton>
                                                </TableCell> : (column.id === 'TrkOpName') ?
                                                    <TableCell key={column.id} align={column.align} >
                                                        <Button variant="text" sx={{ color: "#000000" }} onClick={() => { handleRowClick(trkOpRow); }}>
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

                <OptionMenu open={open} handleClose={handleClose} anchorEl={anchorEl} >
                    {optionItems.map((i) => <MenuItem
                        sx={{ pl: 2, pr: 5 }}
                        key={i.title}
                        onClick={i.fn}>
                        {i.title}
                    </MenuItem>)}
                </OptionMenu>

            </StyledTableContainer>
            <Stack sx={{ alignItems: "center", mt: 1 }}>
                <Pagination count={Math.ceil(trkOpRows?.totalLength / limit) || 0} color="primary" page={pageNumber} onChange={(e, v) => setPageNumber(v)} variant="outlined" shape="rounded" />
            </Stack>
        </BgBox>
    )
}

export default TrkOpListPage;