import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { putPricFactor } from '../services/pricing-service';
import FillLabelTxtField from './FillLabelTxtField';
import { customAlert, notify } from './notify';
import { useTranslation } from "react-i18next";

function EditPricFacPopup({ modalOpen, handleModalClose, pricFacData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();


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
            await putPricFactor(pricFacData.id, inputObject);
            notify("success", "Price Factor Edited Successfully");
            handleModalClose();
            window.location.reload();
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
            {pricFacData ? <form onSubmit={handleSubmit} >
                <Box sx={modalStyle}>
                    <Typography variant='h5' sx={{ fontWeight: "bold", mb: 2 }}>{t("sa.priceCal.eFactor")}</Typography>
                    <Stack gap={2} alignItems="center">
                        <FillLabelTxtField name="factor" title={t("sa.priceCal.fName")} width={400} errMsg={formErrors.factor} defaultValue={pricFacData?.factor} />
                        <FillLabelTxtField name="percent" type="number" step={0.01} title={t("sa.priceCal.percentage")} errMsg={formErrors.percent} width={400} defaultValue={pricFacData?.percent} />

                        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={400}>
                            <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("sa.priceCal.cancel")}</Button>
                            <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("sa.priceCal.sChanges")}</Button>
                        </Stack>
                    </Stack>
                </Box>
            </form> : <Typography component={'h1'}>Something went wrong</Typography>}
        </Modal>
    )
}

export default EditPricFacPopup;

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

    if (!values.factor)
        errors.factor = "Factor Name is required!";

    if (!values.percent)
        errors.percent = "Percentage is required!";

    console.log();
    return errors;
};