import { Box, Button, Modal, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from 'react-query';
import CustomDropDown from '../../../components/CustomDropDown';
import CustomRadio from '../../../components/CustomRadio';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import ScrollBox from '../../../components/ScrollBox';
import { useAuthContext } from '../../../context/AuthContext';
import { putShipmt } from '../../../services/shipmt-service';
import { styled } from '@mui/material/styles';
import QueryKey from '../../../QueryKey';
import { getAllMatTypes } from '../../../services/cust-service';
import LoadingScreen from '../../../components/loadingScreen';
import { useEffect } from 'react';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        // margin: theme.spacing(0.5),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

function LoadDetails({ modalOpen, handleModalClose, shipmtData }) {

    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    let txtFielProps = { fontSize: 14, height: 38, width: 520 };
    let radioFieldProps = { fontSize: 14, gap: 7 };
    const [selection, setSelection] = useState({});

    const { isLoading: isLoadMatType, isError: isErrMatType, error: errMatType, data: matTypesData } = useQuery([QueryKey.matTypes], getAllMatTypes, {
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });

    const loadTypeArr = [
        { value: "flammable", label: t("bo.loadDet.flammable") },
        { value: "fragile", label: t("bo.loadDet.fragile") }];

    const loadDimensionsArr = [
        { value: "feet", label: t("bo.loadDet.feet") },
        { value: "m", label: t("bo.loadDet.meter") },
        { value: "cm", label: t("bo.loadDet.cm") }];

    const trkLoadTypeArr = [
        { value: "partLoad", label: t("bo.loadDet.partLoad") },
        { value: "fullLoad", label: t("bo.loadDet.fullLoad") }];


    useEffect(() => {
        if (!shipmtData)
            return;

        setSelection({ weightUnit: shipmtData?.shipmtLoad?.weightUnit })
    }, [shipmtData]);



    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object
        let errorsObj = validate(inputObject);
        setFormErrors(errorsObj);
        inputObject.weightUnit = selection?.weightUnit;
        console.log(JSON.stringify(inputObject))
        if (Object.keys(errorsObj).length > 0)
            return;

        setLoadingScreen(true);
        try {
            let putData = {
                shipmtLoad: {
                    ...inputObject
                }
            }
            await putShipmt({ shipmtId: shipmtData?.shipment?.shipmtId, body: putData });
            notify("success", "Load Details Updated Successfully");
            handleModalClose();
            queryClient.invalidateQueries();
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    }

    function handleTgWeightUnitChange(ele, v) {
        if (v == null)
            return

        setSelection((e) => { return { ...e, weightUnit: v } });
    }



    if (isErrMatType) {
        customAlert(errMatType);
        return <h2>Something went wrong</h2>
    }

    if (isLoadMatType)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>


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
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("bo.loadDet.loadDet")}</Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(0, 0, 0, 0.3)" }}>({shipmtData?.shipment?.shipmtId})</Typography>
                    </Stack>
                    <ScrollBox height={"83%"}>
                        <Stack gap={2}>
                            <Stack direction={"row"} marginTop={1}>
                                <CustomDropDown defaultValue={shipmtData?.shipmtLoad?.matType} title={t("bo.loadDet.matType")} name={"matType"} errMsg={formErrors.matType} ddArr={matTypesData || []} {...txtFielProps} />
                            </Stack>
                            <Stack direction={"row"} marginTop={1}>
                                <CustomRadio defaultValue={shipmtData?.shipmtLoad?.loadType} title={t("bo.loadDet.loadType")} name={"loadType"} errMsg={formErrors.loadType} radioArr={trkLoadTypeArr} {...radioFieldProps} />
                            </Stack>
                            <Stack direction={"row"} marginTop={1}>
                                <CustomRadio defaultValue={shipmtData?.shipmtLoad?.matNature} title={t("bo.loadDet.matNat")} name={"matNature"} errMsg={formErrors.matNature} radioArr={loadTypeArr} {...radioFieldProps} />
                            </Stack>
                            <Stack direction={"row"} marginTop={1} mb={1}>
                                <CustomRadio defaultValue={shipmtData?.shipmtLoad?.matDimsUnit} title={t("bo.loadDet.dimUnit")} name={"matDimsUnit"} errMsg={formErrors.matDimsUnit} radioArr={loadDimensionsArr} {...radioFieldProps} />
                            </Stack>
                            <Stack direction={"row"} gap={2}>
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtLoad?.matLength} type="number" step={0.01} name="matLength" title={t("bo.loadDet.len")} errMsg={formErrors.matLength} {...txtFielProps} width={155} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtLoad?.matWidth} type="number" step={0.01} name="matWidth" title={t("bo.loadDet.wid")} errMsg={formErrors.matWidth} {...txtFielProps} width={155} />
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtLoad?.matHeight} type="number" step={0.01} name="matHeight" title={t("bo.loadDet.height")} errMsg={formErrors.matHeight} {...txtFielProps} width={155} />
                            </Stack>
                            <FillLabelTxtField defaultValue={shipmtData?.shipmtLoad?.quantity} type="number" name="quantity" title={t("bo.loadDet.quan")} errMsg={formErrors.quantity} {...txtFielProps} />
                            <Stack direction={"row"} alignItems={"end"} gap={1}>
                                <FillLabelTxtField defaultValue={shipmtData?.shipmtLoad?.weight} type="number" step={0.01} name="weight" title={t("bo.loadDet.totWei")} errMsg={formErrors.weight} {...txtFielProps} width={400} />
                                <StyledToggleButtonGroup color="primary" size="small" value={selection.weightUnit} exclusive onChange={handleTgWeightUnitChange} sx={{ height: 36 }}>
                                    <ToggleButton value="ton">
                                        <Typography>{t("bo.loadDet.ton")}</Typography>
                                    </ToggleButton>
                                    <ToggleButton value="kilolitre">
                                        <Typography>{t("bo.loadDet.kl")}</Typography>
                                    </ToggleButton>
                                </StyledToggleButtonGroup>
                            </Stack>
                            <FillLabelTxtField defaultValue={shipmtData?.shipmtLoad?.loadDesc} name="loadDesc" errMsg={formErrors.loadDesc} title={t("bo.loadDet.loadDesc")} fontSize={14} multiline={true} height={103} />
                        </Stack>
                    </ScrollBox>
                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={500}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("bo.loadDet.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("bo.loadDet.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default LoadDetails;

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

    if (!values.matType)
        errors.matType = "Material Type is required!";

    if (!values.loadType)
        errors.loadType = "Load Type is required!";

    if (!values.matNature)
        errors.matNature = "Material Nature is required!";

    if (!values.matDimsUnit)
        errors.matDimsUnit = "Dimension is required!";

    if (!values.matLength)
        errors.matLength = "Length is required!";

    if (!values.matWidth)
        errors.matWidth = "Width is required!";

    if (!values.matHeight)
        errors.matHeight = "Height is required!";

    if (!values.weight)
        errors.weight = "Weight is required!";


    return errors;
};