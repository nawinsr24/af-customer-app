import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import CustomRadio from '../../../components/CustomRadio';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import PlaceAutofill from '../../../components/PlaceAutofill';
import ScrollBox from '../../../components/ScrollBox';
import { useAuthContext } from '../../../context/AuthContext';
import { putShipmt } from '../../../services/shipmt-service';
import { datePickerformat } from '../../../utils/format';

function PicDetails({ modalOpen, handleModalClose, shipmtData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    let txtFieldProps = { fontSize: 14, height: 38, width: 520 };
    let radioFieldProps = { fontSize: 14, gap: 7 };

    const sessRadioArr = [
        { value: "morning", label: t("bo.picDet.mrng") },
        { value: "noon", label: t("bo.picDet.noon") },
        { value: "evening", label: t("bo.picDet.evng") },
        { value: "night", label: t("bo.picDet.night") }];

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
                shipmtPicDel: {
                    cnorName: inputObject.cnorName,
                    cnorGST: inputObject.cnorGST,
                    picLocation: inputObject.picLocation,
                    picAddress: inputObject.picAddress,
                    estPicDate: inputObject.estPicDate,
                    estPicSession: inputObject.estPicSession,
                    picDate: inputObject.picDate === "" ? null : inputObject.picDate,
                    picSession: inputObject.picDate === "" ? null : inputObject.picSession,
                    cnorMobile: inputObject.cnorMobile,
                    cnorEmail: inputObject.cnorEmail
                },
                shipmtInch: {
                    picIncName: inputObject.picIncName,
                    picInchMobile1: inputObject.picInchMobile1,
                    picInchMobile2: inputObject.picInchMobile2 === "" ? null : inputObject.picInchMobile2
                }
            }
            await putShipmt({ shipmtId: shipmtData?.shipment?.shipmtId, body: putData });
            notify("success", "Pickup Details Updated Successfully");
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
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.picDet.pickPointDet")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>
                    <ScrollBox height={"83%"}>
                        <Stack gap={2} alignItems="center">
                            <Stack direction={'row'} alignItems={"center"} gap={3}>
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.cnorName} name="cnorName" title={t("bo.picDet.cnorName")} errMsg={formErrors.cnorName} {...txtFieldProps} width={250} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.cnorGST} name="cnorGST" title={t("bo.picDet.cnorGst")} errMsg={formErrors.cnorGST} {...txtFieldProps} width={250} />
                            </Stack>
                            <Stack direction={"row"} gap={3}>
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.cnorMobile} name="cnorMobile" title={t("bo.picDet.cnorMobile")} errMsg={formErrors.cnorMobile} {...txtFieldProps} width={250} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.cnorEmail} name="cnorEmail" title={t("bo.picDet.cnorEmail")} errMsg={formErrors.cnorEmail} {...txtFieldProps} width={250} />
                            </Stack>
                            <PlaceAutofill defaultValue={shipmtData?.shipmtPicDel?.picLocation} name="picLocation" title={t("bo.picDet.pickLocation")} errMsg={formErrors.picLocation} {...txtFieldProps} />
                            <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.picAddress} name="picAddress" errMsg={formErrors.picAddress} title={t("bo.picDet.detPickLocation")} {...txtFieldProps} multiline={true} height={103} />
                            <Stack direction={"row"} gap={3} mb={1}>
                                <FillLabelTxtField defaultValue={datePickerformat(shipmtData?.shipmtPicDel?.estPicDate)} type={"date"} name="estPicDate" title={t("bo.picDet.estPickDate")} errMsg={formErrors.estPicDate} {...txtFieldProps} width={250} />
                                <FillLabelTxtField defaultValue={datePickerformat(shipmtData?.shipmtPicDel?.picDate)} type={"date"} name="picDate" title={t("bo.picDet.pickDate")} errMsg={formErrors.picDate} {...txtFieldProps} width={250} />
                            </Stack>
                            <CustomRadio defaultValue={shipmtData?.shipmtPicDel?.estPicSession} title={t("bo.picDet.estPickSession")} name={"estPicSession"} errMsg={formErrors.estPicSession} radioArr={sessRadioArr}  {...radioFieldProps} />
                            <CustomRadio defaultValue={shipmtData?.shipmtPicDel?.picSession} title={t("bo.picDet.pickSession")} name={"picSession"} errMsg={formErrors.picSession} radioArr={sessRadioArr}  {...radioFieldProps} />
                            <Stack direction={'row'} alignItems={"center"} gap={2} mb={20} mt={2}>
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtInch?.picIncName} name="picIncName" title={t("bo.picDet.inchargeName")} errMsg={formErrors.picIncName} {...txtFieldProps} width={190} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtInch?.picInchMobile1} name="picInchMobile1" title={t("bo.picDet.mNum1")} errMsg={formErrors.picInchMobile1} {...txtFieldProps} width={150} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtInch?.picInchMobile2} name="picInchMobile2" title={t("bo.picDet.mNum2")}  {...txtFieldProps} width={150} />
                            </Stack>
                        </Stack>
                    </ScrollBox>
                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={500}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.picDet.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.picDet.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default PicDetails;

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
    height: "90%"
};

function validate(values) {
    const errors = {};

    if (!values.cnorName)
        errors.cnorName = "Consignor Name is required!";

    if (!values.cnorGST)
        errors.cnorGST = "Consignor GST is required!";

    if (!values.picLocation)
        errors.picLocation = "Pickup Location is required!";

    if (!values.picAddress)
        errors.picAddress = "Detailed Pickup Location is required!";

    if (!values.estPicDate)
        errors.estPicDate = "Estimated Date is required!";

    if (!values.estPicSession)
        errors.estPicSession = "Estimated Session is required!";

    if (!values.picIncName)
        errors.picIncName = "Incharge Name is required!";

    if (!values.picInchMobile1)
        errors.picInchMobile1 = "Mobile-1 is required!";

    return errors;
};