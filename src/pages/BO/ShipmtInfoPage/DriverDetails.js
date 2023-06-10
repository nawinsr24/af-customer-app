import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { putShipmt } from '../../../services/shipmt-service';

function DriverDetails({ modalOpen, handleModalClose, shipmtData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    let txtFieldProps = { fontSize: 14, height: 38, width: 520 };


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
            let putData = {
                shipmtDriver: {
                   ...inputObject
                }
            }
            await putShipmt({ shipmtId: shipmtData?.shipment?.shipmtId, body: putData });
            notify("success", "Driver Details Updated Successfully");
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
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.driverDet.drivDet")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>


                    <Stack gap={2}>
                        <Stack direction={'row'} alignItems={"center"} gap={3}>
                            <FillLabelTxtField defaultValue={shipmtData?.shipmtDriver?.drivName} name="drivName" title={t("bo.driverDet.drivName")} errMsg={formErrors.drivName} {...txtFieldProps} width={250} />
                            <FillLabelTxtField defaultValue={shipmtData?.shipmtDriver?.drivLicNo} name="drivLicNo" title={t("bo.driverDet.drivLicNo")} errMsg={formErrors.drivLicNo} {...txtFieldProps} width={250} />
                        </Stack>

                        <Stack direction={'row'} alignItems={"center"} gap={3}>
                            <FillLabelTxtField defaultValue={shipmtData?.shipmtDriver?.drivMobile1} name="drivMobile1" title={t("bo.driverDet.drivMob1")} errMsg={formErrors.drivMobile1} {...txtFieldProps} width={250} />
                            <FillLabelTxtField defaultValue={shipmtData?.shipmtDriver?.drivMobile2} name="drivMobile2" title={t("bo.driverDet.drivMob2")} errMsg={formErrors.drivMobile2} {...txtFieldProps} width={250} />
                        </Stack>
                    </Stack>


                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 4 }} width={500}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.driverDet.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.driverDet.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default DriverDetails;

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
    // height: "45%"
};

function validate(values) {
    const errors = {};

    // "shipmtDriver": {
    //     "drivName": "details.drivName",
    //     "drivMobile1": " details.drivMobile1",
    //     "drivMobile2": "details.drivMobile2",
    //     "drivLicNo": "details.drivLicNo",
    //     "trackingGPSLink": "details.trackingGPSLink"
    // },

    if (!values.drivName)
        errors.drivName = "Driver Name is required!";

    if (!values.drivMobile1)
        errors.drivMobile1 = "Driver Mobile Number 1 is required!";

    if (!values.drivLicNo)
        errors.drivLicNo = "Driver License Number is required!";


    return errors;
};