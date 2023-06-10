import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { customAlert } from '../notify';
import { useQuery } from 'react-query';
import { getCombGrItemList } from '../../services/comGrp-service';
import LoadingScreen from '../loadingScreen';
import QueryKey from '../../QueryKey';
import route from '../../Routes';
import { useNavigate } from 'react-router-dom';
import ScrollBox from '../ScrollBox';
import CombineReqCard from './CombineReqCard';
import EditGrpListPopup from './EditGrpListPopup';
import AddReqGrpListPopup from './AddReqGrpListPopup';
import { Delete } from '@mui/icons-material';
import { makeTxtOverFLow } from '../../utils/format';
import AddShipmtGrpListPopup from './AddShipmtGrpListPopup';
import { useTranslation } from "react-i18next";


function ViewGrpListPopup({ modalOpen, handleModalClose, type, custId, grpData }) {
    const navigate = useNavigate()
    const { isLoading, isError, error, data } = useQuery([QueryKey.grpList, grpData?.id], () => getCombGrItemList({ grpId: grpData?.id }))
    const { t } = useTranslation();
    const [modalEdiLstpOpen, setmodalEdiLstOpen] = useState(false);
    const handleModalEdiLstClose = () => setmodalEdiLstOpen(false);
    const handleModalEdiLstOpen = () => setmodalEdiLstOpen(true);

    const [modalAddLstpOpen, setmodalAddLstOpen] = useState(false);
    const handleModalAddLstClose = () => setmodalAddLstOpen(false);
    const handleModalAddLstOpen = () => setmodalAddLstOpen(true);


    function handleCombineReqClick(itemId) {
        type === "req" ? navigate(route.boCustReqInfo + itemId) : navigate("")
    }

    if (isError) {
        customAlert(error);
        return <h2>Something went wrong</h2>
    }

    if (isLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

    return (
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={modalStyle}>
                <Stack direction={"row"} justifyContent={"space-between"} mb={1} alignItems={"center"}>
                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                        <Typography variant='h5' sx={{ fontWeight: "bold" }}>{makeTxtOverFLow(grpData?.grpName, 25)}</Typography>
                        <IconButton onClick={handleModalEdiLstOpen}><Delete /></IconButton>
                    </Stack>
                    <Stack direction={"row"} gap={2}>
                        <Button variant='outlined' color='primary' sx={{ height: 35 }} onClick={handleModalClose}>{t("bo.viewGrp.back")}</Button>
                        <Button variant='contained' color='primary' sx={{ height: 35 }} onClick={handleModalAddLstOpen}> {type === "req" ? "Add Request" : "Add Shipment"}</Button>
                    </Stack>

                </Stack>
                <ScrollBox height={500}>
                    {data?.map((i) => <Box key={i?.itemId} onClick={() => handleCombineReqClick(i?.itemId)}>
                        <CombineReqCard data={i} itemId={i?.itemId} />
                    </Box>)}
                </ScrollBox>
                <EditGrpListPopup modalOpen={modalEdiLstpOpen} handleModalClose={handleModalEdiLstClose} type={type} custId={custId} grpData={grpData} />
                {type === "req" ? <AddReqGrpListPopup modalOpen={modalAddLstpOpen} handleModalClose={handleModalAddLstClose} type={type} custId={custId} grpData={grpData} /> :
                    <AddShipmtGrpListPopup modalOpen={modalAddLstpOpen} handleModalClose={handleModalAddLstClose} type={type} custId={custId} grpData={grpData} />}

            </Box>

        </Modal>
    )
}

export default ViewGrpListPopup;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 680,
    bgcolor: 'background.paper',
    border: '2px solid #ffff',
    boxShadow: 24,
    px: 4,
    py: 3,
    borderRadius: 2,
};

