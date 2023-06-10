import { styled } from '@mui/material/styles';
import { FormatListBulleted, GridViewRounded } from '@mui/icons-material';
import { Modal, Stack, ToggleButton, Typography, ToggleButtonGroup, Grid, ButtonBase, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import QueryKey from '../../../QueryKey';
import { getAllTpReqByCusReqId } from '../../../services/req_service';
import { customAlert } from '../../../components/notify';
import LoadingScreen from '../../../components/loadingScreen';
import TrkOpReqTablePopup from './TrkOpReqTablePopup';
import ScrollBox from '../../../components/ScrollBox';
import TrkOpReqCard from '../../../components/TrkOpReqCard';
import { useNavigate } from 'react-router-dom';
import route from '../../../Routes';
import SelectTrkOpReq from './SelectTrkOpReq';
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


function SelectTrkOpMatReq({ handleClose, open, custReqId }) {

    const { t } = useTranslation();

    const navigate = useNavigate()
    const [view, setView] = useState('list');

    const { isLoading: isReqLoading, isError: isReqErr, error: reqErr, data: reqRows } = useQuery(
        [QueryKey.trkOpReqByCusReqId, custReqId], () => getAllTpReqByCusReqId(custReqId));

    const [selAllReqOpen, setSelAllReqOpen] = useState(false);

    const handleSelAllReqOpen = (event, reason) => {
        setSelAllReqOpen(true)
    }

console.log("1111111111111111111111111111111111111")
console.log(JSON.stringify(reqRows))
console.log("2222222222222222222222222222")

    const handleSelAllReqClose = (event, reason) => {
        if (reason && reason === "backdropClick")
            handleCancel()
        else
            setSelAllReqOpen(false);
    }

    async function handleCancel() {
        navigate(-1, { replace: true });
    }


    function onViewChange(e, v) {
        if (v == null)
            return

        setView(v);
    }



    if (isReqErr) {
        customAlert(reqErr);
        return <h2>Something went wrong</h2>
    }


    if (isReqLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>


    function handleReqCLick(trkOpReqId) {
        handleClose();
        navigate(route.boAddShipmt + "?custReqId=" + custReqId + "&trkOpReqId=" + trkOpReqId, { replace: true });
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={modalStyle} height={600}>

                <Stack direction={'row'} justifyContent="space-between" alignItems={"center"} mb={1.2} mt={0.4} px={2}>
                    <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.selTrkOpMatReq.recTrkOpReq")}</Typography>


                    <Stack direction={'row'} justifyContent="space-between" alignItems={"center"}>
                        <StyledToggleButtonGroup color="primary" size="small" value={view} exclusive onChange={onViewChange} sx={{ mb: 0.5, height: 36, mx: 3 }}>
                            <ToggleButton value='list'>
                                <FormatListBulleted />
                            </ToggleButton>
                            <ToggleButton value="center">
                                <GridViewRounded />
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                        <Button variant='outlined' color='primary' onClick={handleSelAllReqOpen}>{t("bo.selTrkOpMatReq.seeAllReq")}</Button>


                    </Stack>
                </Stack>



                {view === 'list' ? <TrkOpReqTablePopup trkOpReqRow={reqRows} handleClose={handleClose} handleReqCLick={handleReqCLick} /> :
                    <ScrollBox height={"84%"}>
                        <Grid container spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {reqRows.map((i) => <Grid item xs="auto" key={i.id}>
                                <ButtonBase component="div" onClick={() => handleReqCLick(i?.truckOpReqId)}>
                                    <TrkOpReqCard i={i} />
                                </ButtonBase></Grid>)}
                        </Grid>
                    </ScrollBox>
                }

                <SelectTrkOpReq handleClose={handleSelAllReqClose} open={selAllReqOpen} custReqId={custReqId} handleMatClose={handleClose} />

            </Box>

        </Modal>
    )
}

export default SelectTrkOpMatReq