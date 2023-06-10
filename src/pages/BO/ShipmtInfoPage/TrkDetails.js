import { Box, Button, InputAdornment, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { putShipmt } from '../../../services/shipmt-service';
import trackSVG from '../../../assets/svg/track.svg';



function TrkDetails({ modalOpen, handleModalClose, shipmtData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    let txtFielProps = { fontSize: 14, height: 38, width: 520 };


    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object
        let errorsObj = validate(inputObject);
        setFormErrors(errorsObj);
        console.log(JSON.stringify(inputObject))
        if (Object.keys(errorsObj).length > 0)
            return;

        setLoadingScreen(true);
        try {
            let putData = {
                shipmtDriver: {
                    ...inputObject
                }
            }
            await putShipmt({ shipmtId: shipmtData?.shipment?.shipmtId, body: putData });
            notify("success", "Truck Details Updated Successfully");
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
            <form onSubmit={handleSubmit} >
                <Box sx={modalStyle}>
                    <Stack direction={'row'} alignItems={"center"} mb={3}>
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.trkDet.trkDet")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>

                    <FillLabelTxtField name="trackingGPSLink" title={t("bo.trkDet.trackGps")} defaultValue={shipmtData?.shipmtDriver?.trackingGPSLink} errMsg={formErrors.trackingGPSLink} {...txtFielProps} endAdornment={(<InputAdornment position={"end"}> <Box component={"img"} src={trackSVG} alt="trackSVG" mt={2} /> </InputAdornment>)} />

                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 4 }} width={500}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.trkDet.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.trkDet.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default TrkDetails;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 590,
    bgcolor: 'background.paper',
    border: '2px solid #ffff',
    boxShadow: 24,
    px: 3,
    py: 2,
    borderRadius: 2,
    height: "35%"
};

function validate(values) {
    const errors = {};

    if (!values.trackingGPSLink)
        errors.trackingGPSLink = "Tracking GPS Link is required!";


    return errors;
};