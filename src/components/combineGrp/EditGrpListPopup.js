import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { customAlert, notify } from '../notify';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {  getCombGrItemList, rmvCombGrpItem } from '../../services/comGrp-service';
import LoadingScreen from '../loadingScreen';
import QueryKey from '../../QueryKey';
import route from '../../Routes';
import { useNavigate } from 'react-router-dom';
import ScrollBox from '../ScrollBox';
import CombineReqCard from './CombineReqCard';
import { Delete } from '@mui/icons-material';
import { makeTxtOverFLow } from '../../utils/format';
import { useTranslation } from "react-i18next";


function EditGrpListPopup({ modalOpen, handleModalClose, type, custId, grpData }) {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const { isLoading, isError, error, data } = useQuery([QueryKey.grpList, grpData?.id], () => getCombGrItemList({ grpId: grpData?.id }))
    const { isLoading: isMuLoad, isError: isMuErr, error: muErr, mutate: rmvItem } = useMutation(rmvCombGrpItem, {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKey.reqGrp, custId, type]);
            queryClient.invalidateQueries([QueryKey.shipmtGrp, custId, type]);
            queryClient.invalidateQueries([QueryKey.grpList, grpData?.id]);
            queryClient.invalidateQueries([QueryKey.notCombGrpReq, custId, type]);
            queryClient.invalidateQueries([QueryKey.notCombGrpShipmt, custId, type]);
            notify("success", "Removed Successfully");
        }
    });

    function handleCombineReqClick(itemId) {
        navigate(route.boCustReqInfo + itemId);
    }

    function handleDelete(id) {
        rmvItem({ id, type })
    }

    if (isError || isMuErr) {
        customAlert(error || muErr);
        return <h2>Something went wrong</h2>
    }

    if (isLoading || isMuLoad)
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
                    <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.editGrp.delete")} {makeTxtOverFLow(grpData?.grpName, 25)}</Typography>
                    <Button variant='outlined' color='primary' sx={{ height: 35 }} onClick={handleModalClose}>{t("bo.editGrp.back")}</Button>
                </Stack>
                <ScrollBox height={400}>
                    {data?.map((i) => <Stack key={i?.itemId} direction={"row"} alignItems={"center"}>
                        <Box onClick={() => handleCombineReqClick(i?.itemId)}>
                            <CombineReqCard data={i} itemId={i?.itemId}/>
                        </Box>
                        <IconButton sx={{ color: "red" }} onClick={()=>handleDelete(i?.itemId)}>
                            <Delete />
                        </IconButton>
                    </Stack>

                    )}
                </ScrollBox>
            </Box>

        </Modal>
    )
}

export default EditGrpListPopup;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 695,
    bgcolor: 'background.paper',
    border: '2px solid #ffff',
    boxShadow: 24,
    px: 4,
    py: 3,
    borderRadius: 2,
};

