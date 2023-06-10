import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { ChangePwdService } from '../services/login-service';
import { customAlert, notify } from './notify';
import PwdFillLabelTxtField from './PwdFillLabelTxtField';
import { useTranslation } from "react-i18next";


function ChangePwdPopUp({ modalOpen, handleModalClose, userId }) {

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
            inputObject.userId = userId;
            console.log(inputObject);
            await ChangePwdService(inputObject);
            notify("success", "Password Changed Successfully");
            handleModalClose();
        } catch (err) {
            console.log(err);
            if (err === 409)
                notify("error", "Invalid Last Password");
            else
                customAlert(err)
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
            <form onSubmit={handleSubmit}>
                <Box sx={modalStyle}>
                    <Typography variant='h5' sx={{ fontWeight: "bold", mb: 2 }}>{t("bo.changePwd.changePw")}</Typography>
                    <Stack gap={2} alignItems="center">
                        <PwdFillLabelTxtField name="old_password" title={t("bo.changePwd.lastPw")} width={400} height={40} errMsg={formErrors.old_password} />
                        <PwdFillLabelTxtField name="password" title={t("bo.changePwd.newPw")} width={400} height={40} errMsg={formErrors.password} />
                        <PwdFillLabelTxtField name="c_password" title={t("bo.changePwd.cNewPw")} width={400} height={40} errMsg={formErrors.c_password} />
                        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={400}>
                            <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.changePwd.cancel")}</Button>
                            <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.changePwd.sChanges")}</Button>
                        </Stack>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default ChangePwdPopUp;

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

    if (!values.old_password)
        errors.old_password = "Old Password is required";

    if (!values.password)
        errors.password = "Password is required";
    else if (values.password.length < 4)
        errors.password = "Password must be more than 4 characters";
    else if (values.password.length > 10)
        errors.password = "Password cannot exceed more than 10 characters";

    if (!values.c_password)
        errors.c_password = "Password is required";
    else if (values.c_password.length < 4)
        errors.c_password = "Password must be more than 4 characters";
    else if (values.c_password.length > 10)
        errors.c_password = "Password cannot exceed more than 10 characters";
    else if (values.c_password !== values.password)
        errors.c_password = 'Passwords do not match';

    return errors;
};