import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import CustomDropDown from '../../../components/CustomDropDown';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import ScrollBox from '../../../components/ScrollBox';
import { useAuthContext } from '../../../context/AuthContext';
import { postCustPymt } from '../../../services/shipmt-service';
import { postTrkOpPymt } from '../../../services/req_service';


function AddTrkOpPymt({ modalOpen, handleModalClose, tpReqData }) {
    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen, ctxtUser } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const typeArr = [
        { value: "cheque", label: t("bo.addCustPymt.cheque") },
        { value: "neft", label: t("bo.addCustPymt.neft") },
    ];

    const [selection, setSelection] = useState({ type: typeArr[0].value });
    let txtFieldProps = { fontSize: 14, height: 38, width: 520 };



    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object
        let errorsObj = validate(inputObject, selection?.type);
        setFormErrors(errorsObj);
        inputObject.weightUnit = selection?.weightUnit;
        console.log(JSON.stringify(inputObject))
        if (Object.keys(errorsObj).length > 0)
            return;

        setLoadingScreen(true);
        try {
            await postTrkOpPymt({ trkOpReqId: tpReqData?.truckOpReqId, body: { issuedBy: ctxtUser.userId, ...inputObject } });
            setSelection({ type: typeArr[0].value })
            notify("success", "Payment Added Successfully");
            handleModalClose();
            queryClient.invalidateQueries();
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    }


    function handlSelChange(e) {
        const { name, value } = e.target;
        setSelection(prevSel => { return { ...prevSel, [name]: value } })
    }


    return (
        <Modal
            open={modalOpen}
            onClose={() => { setSelection({ type: typeArr[0].value }); handleModalClose(); }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleSubmit} >
                <Box sx={modalStyle}>
                    <Stack direction={'row'} alignItems={"center"} mb={3}>
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>Add Truck Operator Payment</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({tpReqData?.truckOpReqId})</Typography>
                    </Stack>
                    <ScrollBox height={"80%"}>
                        <Stack gap={2}>
                            <Stack direction={"row"} marginTop={1}>
                                <CustomDropDown handleDDChange={handlSelChange} defaultValue={typeArr[0].value} title={t("bo.addTrkOpPymt.modePay")} name={"type"} errMsg={formErrors.type} ddArr={typeArr} {...txtFieldProps} />
                            </Stack>

                            {selection?.type === "cheque" ? <Stack gap={2}>
                                <Stack direction={'row'} alignItems={"center"} gap={3}>
                                    <FillLabelTxtField type="number" step={0.5} name="paidAmt" title={t("bo.addTrkOpPymt.amt")} errMsg={formErrors.paidAmt} {...txtFieldProps} width={250} />
                                    <FillLabelTxtField type={"datetime-local"} name="issuedDate" title={t("bo.addTrkOpPymt.issuDate")} errMsg={formErrors.issuedDate} {...txtFieldProps} width={250} />
                                </Stack>
                                <Stack direction={'row'} alignItems={"center"} gap={3}>
                                    <FillLabelTxtField name="bankName" title={t("bo.addTrkOpPymt.bankName")} errMsg={formErrors.bankName} {...txtFieldProps} width={250} />
                                    <FillLabelTxtField name="ifsc" title={t("bo.addTrkOpPymt.ifsc")} errMsg={formErrors.ifsc} {...txtFieldProps} width={250} />
                                </Stack>
                                <Stack direction={'row'} alignItems={"center"} gap={3}>
                                    <FillLabelTxtField name="branch" title={t("bo.addTrkOpPymt.branch")} errMsg={formErrors.branch} {...txtFieldProps} width={250} />
                                    <FillLabelTxtField name="acNo" title={t("bo.addTrkOpPymt.accNum")} errMsg={formErrors.acNo} {...txtFieldProps} width={250} />
                                </Stack>
                                <Stack direction={'row'} alignItems={"center"} gap={3}>
                                    <FillLabelTxtField name="chqNo" title={t("bo.addTrkOpPymt.chequeNum")} errMsg={formErrors.chqNo} {...txtFieldProps} width={250} />
                                    <FillLabelTxtField type={"date"} name="chqDate" title={t("bo.addTrkOpPymt.chequeDate")} errMsg={formErrors.chqDate} {...txtFieldProps} width={250} />
                                </Stack>
                                <Stack direction={'row'} alignItems={"center"} gap={3}>
                                    <FillLabelTxtField name="chqName" title={t("bo.addTrkOpPymt.chequeName")} errMsg={formErrors.chqName} {...txtFieldProps} width={250} />
                                </Stack>
                            </Stack> :
                                selection?.type === "neft" ? <Stack gap={2}>
                                    <Stack direction={'row'} alignItems={"center"} gap={3}>
                                        <FillLabelTxtField type="number" step={0.5} name="paidAmt" title={t("bo.addTrkOpPymt.amt")} errMsg={formErrors.paidAmt} {...txtFieldProps} width={250} />
                                        <FillLabelTxtField type={"datetime-local"} name="issuedDate" title={t("bo.addTrkOpPymt.issuDate")} errMsg={formErrors.issuedDate} {...txtFieldProps} width={250} />
                                    </Stack>
                                    <Stack direction={'row'} alignItems={"center"} gap={3}>
                                        <FillLabelTxtField name="bankName" title={t("bo.addTrkOpPymt.bankName")} errMsg={formErrors.bankName} {...txtFieldProps} width={250} />
                                        <FillLabelTxtField name="ifsc" title={t("bo.addTrkOpPymt.ifsc")} errMsg={formErrors.ifsc} {...txtFieldProps} width={250} />
                                    </Stack>
                                    <Stack direction={'row'} alignItems={"center"} gap={3}>
                                        <FillLabelTxtField name="branch" title={t("bo.addTrkOpPymt.branch")} errMsg={formErrors.branch} {...txtFieldProps} width={250} />
                                        <FillLabelTxtField name="acNo" title={t("bo.addTrkOpPymt.accNum")} errMsg={formErrors.acNo} {...txtFieldProps} width={250} />
                                    </Stack>
                                    <Stack direction={'row'} alignItems={"center"} gap={3}>
                                        <FillLabelTxtField name="transactionId" title={t("bo.addTrkOpPymt.transId")} errMsg={formErrors.transactionId} {...txtFieldProps} width={250} />
                                    </Stack>
                                </Stack> :
                                    <></>}
                        </Stack>
                    </ScrollBox>
                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={500}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.addTrkOpPymt.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.addTrkOpPymt.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}


export default AddTrkOpPymt;

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

function validate(values, type) {
    const errors = {};

    if (!values.type)
        errors.type = "Mode of Payment is required!";

    if (type === "cheque") {
        if (!values.chqNo)
            errors.chqNo = "cheque Number is required!";

        if (!values.chqDate)
            errors.chqDate = "cheque Date is required!";

        if (!values.chqName)
            errors.chqName = "cheque Name is required!";
    }

    if (!values.paidAmt)
        errors.paidAmt = "Amount is required!";

    // if (!values.issuedBy)
    //     errors.issuedBy = "Issued By is required!";

    if (!values.issuedDate)
        errors.issuedDate = "Issued Date is required!";

    if (!values.bankName)
        errors.bankName = "Bank Name is required!";

    if (!values.ifsc)
        errors.ifsc = "IFSC Code is required!";

    if (!values.branch)
        errors.branch = "Branch is required!";

    if (!values.acNo)
        errors.acNo = "Account Number is required!";

    if (type === "neft") {
        if (!values.transactionId)
            errors.transactionId = "Transaction Id is required!";
    }
    console.log(errors);
    return errors;
};