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

function DelDetails({ modalOpen, handleModalClose, shipmtData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    let txtFieldProps = { fontSize: 14, height: 38, width: 520 };
    let radioFieldProps = { fontSize: 14, gap: 7 };

    const sessRadioArr = [
        { value: "morning", label: t("bo.delDetails.mrng") },
        { value: "noon", label: t("bo.delDetails.noon") },
        { value: "evening", label: t("bo.delDetails.evng") },
        { value: "night", label: t("bo.delDetails.night") }];

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
                    cneeName: inputObject.cneeName,
                    cneeGST: inputObject.cneeGST,
                    delLocation: inputObject.delLocation,
                    delAddress: inputObject.delAddress,
                    estDelDate: inputObject.estDelDate,
                    estDelSession: inputObject.estDelSession,
                    delDate: inputObject.delDate === "" ? null : inputObject.delDate,
                    delSession: inputObject.delDate === "" ? null : inputObject.delSession,
                    cneeMobile: inputObject.cneeMobile,
                    cneeEmail: inputObject.cneeEmail
                },
                shipmtInch: {
                    delInchName: inputObject.delInchName,
                    delInchMobile1: inputObject.delInchMobile1,
                    delInchMobile2: inputObject.delInchMobile2 === "" ? null : inputObject.delInchMobile2
                }
            }
            await putShipmt({ shipmtId: shipmtData?.shipment?.shipmtId, body: putData });
            notify("success", "Delivery Details Updated Successfully");
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
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.delDetails.delPointDet")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>
                    <ScrollBox height={"83%"}>
                        <Stack gap={2} alignItems="center">
                            <Stack direction={'row'} alignItems={"center"} gap={3}>
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.cneeName} name="cneeName" title={t("bo.delDetails.cneeName")} errMsg={formErrors.cneeName} {...txtFieldProps} width={250} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.cneeGST} name="cneeGST" title={t("bo.delDetails.cneeGst")} errMsg={formErrors.cneeGST} {...txtFieldProps} width={250} />
                            </Stack>
                            <Stack direction={"row"} gap={3}>
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.cneeMobile} name="cneeMobile" title={t("bo.delDetails.cneeMobile")} errMsg={formErrors.cneeMobile} {...txtFieldProps} width={250} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.cneeEmail} name="cneeEmail" title={t("bo.delDetails.cneeEmail")} errMsg={formErrors.cneeEmail} {...txtFieldProps} width={250} />
                            </Stack>
                            <PlaceAutofill defaultValue={shipmtData?.shipmtPicDel?.delLocation} name="delLocation" title={t("bo.delDetails.delLocation")} errMsg={formErrors.delLocation} {...txtFieldProps} />
                            <FillLabelTxtField defaultValue={shipmtData?.shipmtPicDel?.delAddress} name="delAddress" errMsg={formErrors.delAddress} title={t("bo.delDetails.detDelLocation")} {...txtFieldProps} multiline={true} height={103} />
                            <Stack direction={"row"} gap={3} mb={1}>
                                <FillLabelTxtField defaultValue={datePickerformat(shipmtData?.shipmtPicDel?.estDelDate)} type={"date"} name="estDelDate" title={t("bo.delDetails.estDelDate")} errMsg={formErrors.estDelDate} {...txtFieldProps} width={250} />
                                <FillLabelTxtField defaultValue={datePickerformat(shipmtData?.shipmtPicDel?.delDate)} type={"date"} name="delDate" title={t("bo.delDetails.delDate")} errMsg={formErrors.delDate} {...txtFieldProps} width={250} />
                            </Stack>
                            <CustomRadio defaultValue={shipmtData?.shipmtPicDel?.estDelSession} title={t("bo.delDetails.estDelSession")} name={"estDelSession"} errMsg={formErrors.estDelSession} radioArr={sessRadioArr}  {...radioFieldProps} />
                            <CustomRadio defaultValue={shipmtData?.shipmtPicDel?.delSession} title={t("bo.delDetails.delSession")} name={"delSession"} errMsg={formErrors.delSession} radioArr={sessRadioArr}  {...radioFieldProps} />
                            <Stack direction={'row'} alignItems={"center"} gap={2} mb={20} mt={2}>
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtInch?.delInchName} name="delInchName" title={t("bo.delDetails.inchargeName")} errMsg={formErrors.delInchName} {...txtFieldProps} width={190} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtInch?.delInchMobile1} name="delInchMobile1" title={t("bo.delDetails.mNum1")} errMsg={formErrors.delInchMobile1} {...txtFieldProps} width={150} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtInch?.delInchMobile2} name="delInchMobile2" title={t("bo.delDetails.mNum2")}  {...txtFieldProps} width={150} />
                            </Stack>
                        </Stack>
                    </ScrollBox>
                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={500}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.delDetails.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.delDetails.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default DelDetails;

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

    if (!values.cneeName)
        errors.cneeName = "Consignee Name is required!";

    if (!values.cneeGST)
        errors.cneeGST = "Consignee GST is required!";

    if (!values.delLocation)
        errors.delLocation = "Delivery Location is required!";

    if (!values.delAddress)
        errors.delAddress = "Detailed Delivery Location is required!";

    if (!values.estDelDate)
        errors.estDelDate = "Estimated Date is required!";

    if (!values.estDelSession)
        errors.estDelSession = "Estimated Session is required!";

    if (!values.delInchName)
        errors.delInchName = "Incharge Name is required!";

    if (!values.delInchMobile1)
        errors.delInchMobile1 = "Mobile-1 is required!";

    return errors;
};