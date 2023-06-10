import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import Fileupload from '../../../components/Fileupload';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { putShipmt } from '../../../services/shipmt-service';

function DocDetails({ modalOpen, handleModalClose, shipmtData, type }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [selection, setSelection] = useState({});

    let txtFieldProps = { fontSize: 14, height: 38, width: 520 };


    function handleOnUpload({ fieldName, fileKey }) {
        setSelection(prevSel => { return { ...prevSel, [fieldName]: fileKey } })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object 
        inputObject.billCopy = selection?.billCopy;
        inputObject.ewayA = selection?.ewayA;
        inputObject.ewayB = selection?.ewayB;
        let errorsObj = validate(inputObject, type);
        setFormErrors(errorsObj);

        if (Object.keys(errorsObj).length > 0)
            return;

        setLoadingScreen(true);
        try {
            let putData = {
                shipmtDocs: {
                    ...(type === "billCopy" && { billCopy: inputObject.billCopy }),

                    ...(type === "ewayA" && {
                        ewayA: inputObject.ewayA ? inputObject.ewayA : shipmtData?.shipmtDocs?.ewayA
                    }),

                    ...(type === "ewayB" && {
                        ewayB: inputObject.ewayB ? inputObject.ewayB : shipmtData?.shipmtDocs?.ewayB,
                    }),

                    ...(type === "details" && {
                        ewayA_no: inputObject.ewayA_no,
                        ewayB_no: inputObject.ewayB_no,
                    }),
                }
            }

            await putShipmt({ shipmtId: shipmtData?.shipment?.shipmtId, body: putData });
            notify("success", "Documents Details Updated Successfully");
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
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.docDetails.docDetails")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>

                    {type === "billCopy" && <Fileupload name="billCopy" title={t("bo.docDetails.billCopy")} txtFieldProps={txtFieldProps} errMsg={formErrors.billCopy} onUpload={handleOnUpload} />}

                    {type === "ewayA" && <Fileupload name="ewayA" title={t("bo.docDetails.ewayBillA")} txtFieldProps={txtFieldProps} errMsg={formErrors.ewayA} onUpload={handleOnUpload} />}

                    {type === "ewayB" && <Fileupload name="ewayB" title={t("bo.docDetails.ewayBillB")} txtFieldProps={txtFieldProps} errMsg={formErrors.ewayB} onUpload={handleOnUpload} />}

                    {type === "details" && <Stack gap={2}>
                        <FillLabelTxtField defaultValue={shipmtData?.shipmtDocs?.ewayA_no} name="ewayA_no" title={t("bo.docDetails.ewayBillNumA")} errMsg={formErrors.ewayA_no} {...txtFieldProps} />
                        <FillLabelTxtField defaultValue={shipmtData?.shipmtDocs?.ewayB_no} name="ewayB_no" title={t("bo.docDetails.ewayBillNumB")} errMsg={formErrors.ewayB_no} {...txtFieldProps} />
                    </Stack>}

                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 4 }} width={500}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.docDetails.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.docDetails.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default DocDetails;

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
    // height: "90%"
};

function validate(values, type) {
    const errors = {};

    if (type === "billCopy") {
        if (!values.billCopy)
            errors.billCopy = "Bill Copy is required!";
    }

    if (type === "ewayA") {
        if (!values.ewayA)
            errors.ewayA = "Eway Bill A is required!";
    }

    if (type === "ewayB") {
        if (!values.ewayB)
            errors.ewayB = "Eway Bill B is required!";
    }

    // if (type === "details") {
    //     if (!values.ewayA_no)
    //         errors.ewayA_no = "Eway Bill A Number is required!";

    //     if (!values.ewayB_no)
    //         errors.ewayB_no = "Eway Bill B Number is required!";
    // }

    return errors;
}; 