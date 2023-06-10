import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from 'react-query';
import CustomDropDown from '../../../components/CustomDropDown';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import LoadingScreen from '../../../components/loadingScreen';
import { customAlert, notify } from '../../../components/notify';
import PlaceAutofill from '../../../components/PlaceAutofill';
import ScrollBox from '../../../components/ScrollBox';
import { useAuthContext } from '../../../context/AuthContext';
import QueryKey from '../../../QueryKey';
import { getAllMatTypes } from '../../../services/cust-service';
import { datePickerformat } from '../../../utils/format';

function FilterMdl({ modalOpen, handleModalClose, filterObj, handleFilterObj }) {
    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { isLoading: isLoadMatType, isError: isErrMatType, error: errMatType, data: matTypesData } = useQuery([QueryKey.matTypes], getAllMatTypes);
    let txtFieldProps = { fontSize: 14, height: 38, width: 520 };

    const shipmtTimeArr = [
        { value: "current", label: t("bo.filterMdl.current") },
        { value: "history", label: t("bo.filterMdl.history") }];

    const orderArr = [
        { value: "asc", label: t("bo.filterMdl.asc") },
        { value: "desc", label: t("bo.filterMdl.desc") }];

    const shipmtStatusArr = [
        { value: "pending", label: t("bo.filterMdl.pending") },
        { value: "cancel", label: t("bo.filterMdl.cancel") },
        { value: "confirm", label: t("bo.filterMdl.confirm") },
        { value: "transportation", label: t("bo.filterMdl.transportation") },
        { value: "unloaded", label: t("bo.filterMdl.unloaded") },
        { value: "completed", label: t("bo.filterMdl.completed") }];
    // ENUM('pending', 'cancel', 'confirm', 'transportation', 'unloaded', 'completed')

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

            handleFilterObj(inputObject)
            handleModalClose();
            queryClient.invalidateQueries();
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    }

    if (isErrMatType) {
        customAlert(errMatType);
        return <h2>Something went wrong</h2>
    }

    if (isLoadMatType)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

    //fromDate, toDate, picLoc, delLoc, shipmtTime, status, cust, trkOp, trkRegNo, mat, order,
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
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.filterMdl.reptFilter")}</Typography>
                    </Stack>
                    <ScrollBox height={"80%"}>
                        <Stack gap={2} alignItems="center">
                            <Stack direction={"row"} gap={3} mb={1}>
                                <FillLabelTxtField defaultValue={datePickerformat(filterObj.fromDate)} type={"date"} name="fromDate" title={t("bo.filterMdl.fromDate")} errMsg={formErrors.fromDate} {...txtFieldProps} width={250} />
                                <FillLabelTxtField defaultValue={datePickerformat(filterObj.toDate)} type={"date"} name="toDate" title={t("bo.filterMdl.toDate")} errMsg={formErrors.toDate} {...txtFieldProps} width={250} />
                            </Stack>
                            <Stack direction={'row'} alignItems={"center"} gap={3}>
                                <PlaceAutofill defaultValue={filterObj.picLoc} name="picLoc" title={t("bo.filterMdl.pickLocation")}  {...txtFieldProps} width={250} />
                                <PlaceAutofill defaultValue={filterObj.delLoc} name="delLoc" title={t("bo.filterMdl.delLocation")}  {...txtFieldProps} width={250} />
                            </Stack>
                            <Stack direction={"row"} gap={3}>
                                <FillLabelTxtField defaultValue={filterObj.cust} name="cust" title={t("bo.filterMdl.cust")} placeholder={"Mobile No-1 / First Name / Last Name"}  {...txtFieldProps} width={250} />
                                <FillLabelTxtField defaultValue={filterObj.trkOp} name="trkOp" title={t("bo.filterMdl.trkOp")} placeholder={"Mobile No-1 / First Name / Last Name"}  {...txtFieldProps} width={250} />
                            </Stack>
                            <Stack direction={"row"} gap={3}>
                                <CustomDropDown defaultValue={filterObj.shipmtTime} title={t("bo.filterMdl.shipTime")} name={"shipmtTime"} ddArr={shipmtTimeArr} {...txtFieldProps} width={250} />
                                <CustomDropDown defaultValue={filterObj.status} title={t("bo.filterMdl.shipSts")} name={"status"} ddArr={shipmtStatusArr} {...txtFieldProps} width={250} />
                            </Stack>
                            <Stack direction={"row"} gap={3}>
                                <CustomDropDown defaultValue={filterObj.mat} title={t("bo.filterMdl.matType")} name={"mat"} ddArr={matTypesData} {...txtFieldProps} width={250} />
                                <FillLabelTxtField defaultValue={filterObj.trkRegNo} name="trkRegNo" title={t("bo.filterMdl.trkRegNum")} {...txtFieldProps} width={250} />
                            </Stack>

                            <Stack direction={"row"} gap={3}>
                                <CustomDropDown defaultValue={filterObj.order} title={t("bo.filterMdl.listOrd")} name={"order"} ddArr={orderArr} {...txtFieldProps} width={250} />
                            </Stack>
                        </Stack>
                    </ScrollBox>
                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2, mb: 2 }} width={500}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.filterMdl.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.filterMdl.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default FilterMdl;

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

    if (!values.fromDate)
        errors.fromDate = "From Date is required!";

    if (!values.toDate)
        errors.toDate = "To Date is required!";


    return errors;
};