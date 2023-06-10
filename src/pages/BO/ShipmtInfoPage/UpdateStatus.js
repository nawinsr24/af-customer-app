import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import CustomDropDown from '../../../components/CustomDropDown';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { putShipmtStatus } from '../../../services/shipmt-service';

function UpdateStatus({ modalOpen, handleModalClose, shipmtData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    

    const ddArr = [
        { value: "pending", label: t("bo.updSts.pending") },
        { value: "confirm", label: t("bo.updSts.confirm") },
        { value: "transportation", label: t("bo.updSts.transportation") },
        { value: "unloaded", label: t("bo.updSts.unloaded") },
        { value: "completed", label: t("bo.updSts.completed") },
        { value: "cancel", label: t("bo.updSts.cancel") }];


    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object
        let errorsObj = validate(inputObject);
        setFormErrors(errorsObj);

        if (Object.keys(errorsObj).length > 0)
            return;

        setLoadingScreen(true);
        try {
            await putShipmtStatus({ shipmtId: shipmtData?.shipment?.shipmtId, currStatus: inputObject?.status });
            notify("success", "Status Updated Successfully");
            handleModalClose();
            queryClient.invalidateQueries();
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    }



    return (
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {shipmtData ? <form onSubmit={handleSubmit} >
                <Box sx={modalStyle}>
                    <Stack direction={'row'} alignItems={"center"} mb={3}>
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.updSts.updSts")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>
                    <Stack gap={2} alignItems="center">
                        <CustomDropDown title={t("bo.updSts.sts")} name={"status"} errMsg={formErrors.status} defaultValue={shipmtData?.shipment?.currStatus} ddArr={ddArr} width={400} />

                        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={400}>
                            <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.updSts.cancel")}</Button>
                            <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.updSts.save")}</Button>
                        </Stack>
                    </Stack>
                </Box>
            </form> : <Typography component={'h1'}>Something went wrong</Typography>}
        </Modal>
    )
}

export default UpdateStatus;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 470,
    bgcolor: 'background.paper',
    border: '2px solid #ffff',
    boxShadow: 24,
    px: 4,
    py: 3,
    borderRadius: 2,
};

function validate(values) {
    const errors = {};

    if (!values.status)
        errors.status = "Status is required!";

    return errors;
};