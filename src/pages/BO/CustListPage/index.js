import { Add, MoreVert } from '@mui/icons-material';
import { Box, Button, IconButton, MenuItem, Pagination, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
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
import { getAllCustWPgSch, putCustStatus } from '../../../services/cust-service';
import { capFirstLetter } from '../../../utils/format';
import { useTranslation } from "react-i18next";
import { useQuery } from 'react-query'
import LoadingScreen from '../../../components/loadingScreen';
import QueryKey from '../../../QueryKey';


function CustListPage() {
    const { setAsyncLoading } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    // const isLarge = useMediaQuery("(min-width: 600px)");
    const [currMenuCustId, setCurrMenuCustId] = useState(null);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const { t } = useTranslation();
    const [pageNumber, setPageNumber] = useState(1);
    const limit = 10;
    const { isLoading, isError, error, data: custRows, refetch } = useQuery(
        [QueryKey.custList, pageNumber, searchKeyWord],
        () => getAllCustWPgSch({ pageNumber, limit, searchKeyWord }),
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
            id: 'custName',
            label: t("bo.cusLstPg.cusName"),
            minWidth: 170
        },
        {
            id: 'username',
            label: t("bo.cusLstPg.contact"),
            minWidth: 170
        },
        {
            id: 'type',
            label: t("bo.cusLstPg.type"),
            minWidth: 170
        },
        {
            id: 'verified',
            label: t("bo.cusLstPg.verified"),
            minWidth: 170
        },
        {
            id: 'status',
            label: t("bo.cusLstPg.sts"),
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
            title: t("bo.cusLstPg.edit"),
            fn: handleEdit
        },
        {
            title: t("bo.cusLstPg.addReq"),
            fn: handleAddReq
        }
    ]


    const handleOptionClick = (event, custId) => {
        setAnchorEl(event.currentTarget);
        setCurrMenuCustId(custId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleEdit() {
        handleClose();
        navigate(route.boEditCust + currMenuCustId);
    }

    async function handleAddReq() {
        handleClose();
        navigate(route.boAddCustReq + "?custId=" + currMenuCustId);

    }

    async function handleRowClick(custRow) {
        handleClose();
        navigate(route.boCustInfo + custRow.custId);
    }



    async function updateCustStatus(custRow) {
        setAsyncLoading(true);
        try {
            let status = custRow.status === 1 ? 0 : 1;
            await putCustStatus(custRow.custId, status)
            refetch();
        } catch (err) {
            console.log(err);
            customAlert(err)
        }
        setAsyncLoading(false)
    }

    function handleAddCustClick() {
        navigate(route.boAddCust);
    }

    function onSearchBtnClick() {
        setSearchKeyWord(searchWord);
        setPageNumber(1);
    }


    function verified(custRow) {
        if (custRow.aadhar_verified === 1 || custRow.pan_verified === 1 || custRow.gst_verified === 1)
            return <Typography sx={{ color: "green" }}>Yes</Typography>

        return <Typography sx={{ color: "red" }}>No</Typography>
    }




    return (
        <BgBox>
            <Stack direction={'row'} justifyContent='space-between' m={2} >
                <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.cusLstPg.cust")}</Typography>
                <Stack direction={'row'} justifyContent="end">

                    <SearchTxtField searchKeyWord={searchWord} onSearch={(e) => setSearchWord(e.target.value)} onBtnClick={onSearchBtnClick} placeholder={t("bo.cusLstPg.srchCus")} />

                    <Button variant='contained' sx={{ ml: 5 }} startIcon={<Add />} color='primary' onClick={handleAddCustClick}>{t("bo.cusLstPg.createCus")}</Button>
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
                    {custRows?.data.map((custRow) => {
                        return (
                            <TableRow hover tabIndex={-1} key={custRow.custId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                {columns.map((column) => {
                                    const value = custRow[column.id];
                                    return (
                                        (column.id === 'status') ?
                                            <TableCell key={column.id} align={column.align}>
                                                <StyledSwitch checked={custRow.status ? true : false} onClick={() => { updateCustStatus(custRow) }} />
                                            </TableCell> : (column.id === 'options') ?
                                                <TableCell key={column.id} align={column.align}>
                                                    <IconButton onClick={(e) => { handleOptionClick(e, custRow.custId) }}>
                                                        <MoreVert />
                                                    </IconButton>
                                                </TableCell> : (column.id === 'custName') ?
                                                    <TableCell key={column.id} align={column.align} >
                                                        <Button variant="text" sx={{ color: "#000000" }} onClick={() => { handleRowClick(custRow); }}>
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
                <Pagination count={Math.ceil(custRows?.totalLength / limit) || 0} color="primary" page={pageNumber} onChange={(e, v) => setPageNumber(v)} variant="outlined" shape="rounded" />
            </Stack>
        </BgBox>
    )
}

export default CustListPage