import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import CustomRadio from '../../../components/CustomRadio';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { putShipmt } from '../../../services/shipmt-service';

function PricingDetails({ modalOpen, handleModalClose, shipmtData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    let txtFielProps = { fontSize: 14, height: 38, width: 520 };
    let radioFieldProps = { fontSize: 14, gap: 8 };

    const payTypeArr = [
        { value: "full", label: t("bo.priceDet.fullPay") },
        { value: "advance", label: t("bo.priceDet.adv") },
        { value: "topay", label: t("bo.priceDet.toPay") }];


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
                shipmtPricing: {
                    ...inputObject
                }
            }
            await putShipmt({ shipmtId: shipmtData?.shipment?.shipmtId, body: putData });
            notify("success", "Pricing Details Updated Successfully");
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
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.priceDet.priceDet")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>

                    <FillLabelTxtField type="number" step={0.5} defaultValue={shipmtData?.shipmtPricing?.cust_finalPrc} name="cust_finalPrc" title={t("bo.priceDet.priceCust")} errMsg={formErrors.cust_finalPrc} {...txtFielProps} />
                    <Stack direction={"row"} mt={3} mb={3}>
                        <CustomRadio defaultValue={shipmtData?.shipmtPricing?.custPayType} title={t("bo.priceDet.payTypeCust")} name={"custPayType"} errMsg={formErrors.custPayType} radioArr={payTypeArr} {...radioFieldProps} />
                    </Stack>

                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 4 }} width={500}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.priceDet.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.priceDet.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default PricingDetails;

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

    if (!values.custPayType)
        errors.custPayType = "Customer PayType is required!";

    if (!values.cust_finalPrc)
        errors.cust_finalPrc = "Customer Pricing is required!";

    return errors;
};