import { Box, Button, colors, FormHelperText, Modal, Rating, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { putFeedback } from '../../../services/shipmt-service';

function Feedback({ modalOpen, handleModalClose, shipmtData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();


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
            await putFeedback({ shipmtId: shipmtData?.shipment?.shipmtId, body: inputObject });
            notify("success", "Feedback Added Successfully");
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
                    <Stack direction={'row'} alignItems={"center"} mb={2.5}>
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.feedback.updFeedback")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>
                    <Stack gap={2} alignItems="center">
                        <RatingHorz label={t("bo.feedback.onTimePick")} defaultValue={shipmtData?.feedback?.onTimePic} gap={185} readOnly disabled />
                        <RatingHorz label={t("bo.feedback.onTimeDel")} defaultValue={shipmtData?.feedback?.onTimeDel} gap={185} readOnly disabled />

                        <RatingHorz label={t("bo.feedback.service")} defaultValue={shipmtData?.feedback?.service} name={"service"} gap={185} errMsg={formErrors.service} />
                        <Box height={5} />
                        <FillLabelTxtField defaultValue={shipmtData?.feedback?.description} fontSize={15} name="description" title={t("bo.feedback.feedback")} placeholder={"Add your feedback here..."} multiline={true} height={103} width={350} />

                        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={400}>
                            <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.feedback.cancel")}</Button>
                            <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.feedback.save")}</Button>
                        </Stack>
                    </Stack>
                </Box>
            </form> : <Typography component={'h1'}>Something went wrong</Typography>}
        </Modal>
    )
}

export default Feedback;

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

    if (!values.service)
        errors.service = "Overall Service Rating is required!";

    return errors;
};

function RatingHorz({ label, name, gap, defaultValue, readOnly, disabled, errMsg }) {

    return <Stack direction={"row"} alignItems={"center"} mt={1}>
        <Typography sx={{ fontSize: 15, fontWeight: "550" }} minWidth={gap || 300} maxWidth={gap || 300} >{label}</Typography>
        <Stack alignItems={"center"}>
            <Rating
                name={name}
                defaultValue={defaultValue}
                readOnly={readOnly}
                disabled={disabled}
                size="large"
                precision={0.5}

            />
            <FormHelperText style={{ color: colors.red[500], }}>{errMsg}</FormHelperText>
        </Stack>

    </Stack>

}
