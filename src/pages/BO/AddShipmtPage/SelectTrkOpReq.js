import { styled } from '@mui/material/styles';
import { FormatListBulleted, GridViewRounded } from '@mui/icons-material';
import { Modal, Pagination, Stack, ToggleButton, Typography, ToggleButtonGroup, Grid, ButtonBase } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';
import { useQuery } from 'react-query';
import QueryKey from '../../../QueryKey';
import {  getAllTrkOpReqWPagSrch } from '../../../services/req_service';
import { customAlert } from '../../../components/notify';
import LoadingScreen from '../../../components/loadingScreen';
import SearchTxtField from '../../../components/SearchTxtField';
import CustomDropDown from '../../../components/CustomDropDown';
import TrkOpReqTablePopup from './TrkOpReqTablePopup';
import ScrollBox from '../../../components/ScrollBox';
import TrkOpReqCard from '../../../components/TrkOpReqCard';
import { useNavigate } from 'react-router-dom';
import route from '../../../Routes';
import { useTranslation } from "react-i18next";


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #ffff',
    boxShadow: 24,
    px: 1.5,
    py: 1.5,
    borderRadius: 2,
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        // margin: theme.spacing(0.5),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));


function SelectTrkOpReq({ handleClose, open, custReqId, handleMatClose }) {
    const { t } = useTranslation();

    const ddArr = [
        { value: "name", label: t("bo.selTrkOpReq.operator"), },
        { value: "reqId", label: t("bo.selTrkOpReq.reqId"), },
        { value: "mobile", label: t("bo.selTrkOpReq.contact"), },
    ];

    const navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState(1);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const limit = 4;
    const [order, setOrder] = useState('desc');
    const [searchType, setSearchType] = useState(ddArr[0].value);
    const [searchKeyType, setSearchKeyType] = useState(ddArr[0].value);
    let time = "current";
    const [view, setView] = useState('list');

    const { isLoading: isReqLoading, isError: isReqErr, error: reqErr, data: reqRows } = useQuery(
        [QueryKey.trkOpReqList, pageNumber, searchKeyWord, searchKeyType, order, time],
        () => getAllTrkOpReqWPagSrch({ pageNumber, limit, searchKeyWord, searchType: searchKeyType, order, time }), {
            keepPreviousData: true
    });

    function onViewChange(e, v) {
        if (v == null)
            return

        setView(v);
    }

    function handleDDChange(e) {
        const { value } = e.target;
        setSearchType(value);
    }

    function onSearch(e) {
        setSearchWord(e.target.value)
    }

    async function onSearchBtnClick(e) {
        setSearchKeyWord(searchWord);
        setSearchKeyType(searchType);
        setPageNumber(1);
    }

    function getSrchTypeTxt() {
        let filteredObj = ddArr.filter((i) => i.value === searchType);
        return filteredObj[0]?.label || "";
    }

    async function onOrderChange(e, or) {
        if (or == null)
            return

        setOrder(or);
        setPageNumber(1);
    }

    if (isReqErr) {
        customAlert(reqErr);
        return <h2>Something went wrong</h2>
    }


    if (isReqLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

    const handlePageChange = async (event, value) => {
        setPageNumber(value);
    };

    function handleReqCLick(trkOpReqId) {
        handleClose();
        handleMatClose();
        navigate(route.boAddShipmt + "?custReqId=" + custReqId + "&trkOpReqId=" + trkOpReqId, { replace: true });
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={modalStyle} height={600}>

                <Stack direction={'row'} justifyContent="space-between" alignItems={"center"} mb={1.2} mt={0.4} px={2}>
                    <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.selTrkOpReq.trkOpReq")}</Typography>


                    <Stack direction={'row'} justifyContent="space-between" alignItems={"center"}>
                        <StyledToggleButtonGroup color="primary" size="small" value={view} exclusive onChange={onViewChange} sx={{ mb: 0.5, height: 36, mx: 3 }}>
                            <ToggleButton value='list'>
                                <FormatListBulleted />
                            </ToggleButton>
                            <ToggleButton value="center">
                                <GridViewRounded />
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                        <Box mb={0.5}><SearchTxtField variant={"outlined"} searchKeyWord={searchWord} onSearch={onSearch} onBtnClick={onSearchBtnClick} placeholder={`${t("bo.selTrkOpReq.search")} ${getSrchTypeTxt()} .....`} /></Box>
                        <CustomDropDown height={36} width={140} handleDDChange={handleDDChange} ddArr={ddArr} defaultValue={ddArr[0].value} />

                        <StyledToggleButtonGroup color="primary" size="small" value={order} exclusive onChange={onOrderChange} sx={{ mb: 0.5, height: 36, mx: 3 }}>
                            <ToggleButton value='desc'>
                                <Stack sx={{ fontSize: 18, justifyContent: "center", alignItems: "center" }}>  <FaSortAmountDown /></Stack>
                            </ToggleButton>
                            <ToggleButton value="asc">
                                <Stack sx={{ fontSize: 18, justifyContent: "center", alignItems: "center" }}>  <FaSortAmountDownAlt /></Stack>
                            </ToggleButton>
                        </StyledToggleButtonGroup>

                    </Stack>
                </Stack>



                {view === 'list' ? <TrkOpReqTablePopup trkOpReqRow={reqRows?.data} handleClose={handleClose} handleReqCLick={handleReqCLick} /> :
                    <ScrollBox height={"84%"}>
                        <Grid container spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {reqRows?.data.map((i) => <Grid item xs="auto" key={i.id}>
                                <ButtonBase component="div" onClick={() => handleReqCLick(i?.truckOpReqId)}>
                                    <TrkOpReqCard i={i} />
                                </ButtonBase></Grid>)}
                        </Grid>
                    </ScrollBox>
                }

                <Stack sx={{ alignItems: "center", mt: 1 }}>
                    <Pagination count={Math.ceil(reqRows?.totalLength / limit) || 0} color="primary" page={pageNumber} onChange={handlePageChange} variant="outlined" shape="rounded" />
                </Stack>
            </Box>

        </Modal>
    )
}

export default SelectTrkOpReq