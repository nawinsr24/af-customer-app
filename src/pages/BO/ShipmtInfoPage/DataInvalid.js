import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import CustomDropDown from '../../../components/CustomDropDown';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { sendDataInvalid } from '../../../services/shipmt-service';
import CtrlFillLabelTxtField from '../../../components/CtrlFillLabelTxtField';

function DataInvalid({ modalOpen, handleModalClose, shipmtData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [reason, setReason] = useState("")

    const ddArr = [
        { value: "customer", label: t("bo.dataInvalid.cust") },
        { value: "truckop", label: t("bo.dataInvalid.trkOp") },];

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
            await sendDataInvalid({
                body: {
                    shipmtId: shipmtData?.shipment?.shipmtId,
                    ...inputObject
                }
            });
            notify("success", "Data Invalid Message Send Successfully");
            handleModalClose();
            queryClient.invalidateQueries();
            setReason("")
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    }

    function handleTxtFieldChange(e) {
        const { value } = e.target;
        setReason(value)
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
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.dataInvalid.dataInvalid")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>
                    <Stack gap={2} alignItems="center">
                        <CustomDropDown title={t("bo.dataInvalid.to")} name={"userType"} errMsg={formErrors.userType} defaultValue={ddArr[0].value} ddArr={ddArr} width={400} />
                        <Stack>
                            <CtrlFillLabelTxtField maxLength={60} fontSize={15} name="reason" errMsg={formErrors.reason} title={t("bo.dataInvalid.reason")} placeholder={"Type data invalid reason here..."} multiline={true} height={103} width={400} value={reason} onChange={handleTxtFieldChange} />
                            <Typography sx={{ fontSize: 14, color: "rgba(0, 0, 0, 0.7)" }}>{reason.length}/60</Typography>
                        </Stack>
                        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={400}>
                            <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.dataInvalid.cancel")}</Button>
                            <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.dataInvalid.send")}</Button>
                        </Stack>
                    </Stack>
                </Box>
            </form> : <Typography component={'h1'}>Something went wrong</Typography>}
        </Modal>
    )
}

export default DataInvalid;

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

    if (!values.userType)
        errors.userType = "To is required!";

    if (!values.reason)
        errors.reason = "Reason is required!";

    return errors;
};