import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import QueryKey from '../../QueryKey';
import { createGrp } from '../../services/comGrp-service';
import LoadingScreen from '../loadingScreen';
import { customAlert, notify } from '../notify';
import  FillLabelTxtField  from "../FillLabelTxtField";
import { t } from 'i18next';
import { useTranslation } from "react-i18next";


function CreateGrpPopup({ modalOpen, handleModalClose, type, custId }) {

    const [formErrors, setFormErrors] = useState({});
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const { isLoading, isError, error, mutate: addGroup } = useMutation(createGrp, {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKey.reqGrp, custId, type]);
            queryClient.invalidateQueries([QueryKey.shipmtGrp, custId, type]);
            notify("success", "Price Factor Edited Successfully");
            handleModalClose();
        }
    });


    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object
        let errorsObj = validate(inputObject);
        setFormErrors(errorsObj);

        if (Object.keys(errorsObj).length > 0)
            return;

        addGroup({ custId, type, ...inputObject })
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
            <form onSubmit={handleSubmit} >
                <Box sx={modalStyle}>
                    <Typography variant='h5' sx={{ fontWeight: "bold", mb: 2 }}>{type === 'req' ? t("bo.createGrp.createReqGrp") : t("bo.createGrp.createShipGrp")}</Typography>
                    <Stack gap={2} alignItems="center">
                        <FillLabelTxtField name="grpName" title={t("bo.createGrp.grpName")} width={400} errMsg={formErrors.grpName} /> 

                        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={400}>
                            <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.createGrp.cancel")}</Button>
                            <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.createGrp.create")}</Button>
                        </Stack>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default CreateGrpPopup;

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

    if (!values.grpName)
        errors.grpName = "Group Name is required!";

    console.log();
    return errors;
};