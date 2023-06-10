import React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { getAllMatTypes } from '../../../services/cust-service';
import BgBox from '../../../components/BgBox';
import ScrollBox from '../../../components/ScrollBox';
import { Box, Stack } from '@mui/system';
import { Button, Step, StepButton, Stepper, ToggleButton, Typography, ToggleButtonGroup } from '@mui/material';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import CustomDropDown from '../../../components/CustomDropDown';
import validate from './validate';
import { useQuery, useQueryClient } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import { capFirstLetter, datePickerformat, getTruckName } from '../../../utils/format';
import CustomRadio from '../../../components/CustomRadio';
import SelectTrkType from '../../../components/SelectTrkType';
import CtrlFillLabelTxtField from '../../../components/CtrlFillLabelTxtField';
import { getSingleCustReq, putCustReq } from '../../../services/req_service';
import QueryKey from '../../../QueryKey';
import { useEffect } from 'react';
import PlaceAutofill from '../../../components/PlaceAutofill';
import { useTranslation } from "react-i18next";


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




function EditCustReqPage() {
  const queryClient = useQueryClient()
  const { custReqId } = useParams();
  const [trkTypeTxt, setTrkTypeTxt] = useState("");
  const { t } = useTranslation();

  const [selection, setSelection] = useState({
    type: null,
    matType: null,
    matNature: null,
    matDimsUnit: null,
    weightUnit: "ton",
    loadType: null,
    payType: null,
    trkTypeObj: null,
    consignorName: "",
    consigneeName: "",
    estPrice: null
  });
  const { isLoading, isError, error, data: custReqData } = useQuery([QueryKey.singleCustReq, custReqId], () => getSingleCustReq(custReqId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    })
  const { isLoading: isLoadMatType, isError: isErrMatType, error: errMatType, data: matTypesData } = useQuery([QueryKey.matTypes], getAllMatTypes);
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selTrkTyp, setSelTrkTyp] = useState(false);
  const steps = ['Step 1', 'Step 2'];
  let custFullName = capFirstLetter(custReqData?.custFName) + " " + capFirstLetter(custReqData?.custLName);


  useEffect(() => {
    if (!custReqData)
      return;

    let trkTypeObj = JSON.parse(custReqData.preTruckTypes)
    let strg = getTruckName(trkTypeObj)
    setTrkTypeTxt(strg);
    setSelection((e) => {
      return {
        ...e,
        trkTypeObj: JSON.parse(custReqData?.preTruckTypes),
        consignorName: custReqData?.cnorName,
        consigneeName: custReqData?.cneeName,
        weightUnit: custReqData?.weightUnit
      }
    });
  }, [custReqData]);


  const handleSelTrkTypOpen = () => setSelTrkTyp(true);
  const handleSelTrkTypClose = () => setSelTrkTyp(false);

  function handleSetTrkType(trkTypeObj) {
    setSelection((e) => { return { ...e, trkTypeObj: trkTypeObj } });
    let strg = getTruckName(trkTypeObj);
    setTrkTypeTxt(strg)
  }


  const typeArr = [
    { value: "consignor", label: t("bo.editCustReqPg.consignor") },
    { value: "consignee", label: t("bo.editCustReqPg.consignee") }];

  const loadTypeArr = [
    { value: "flammable", label: t("bo.editCustReqPg.flammable") },
    { value: "fragile", label: t("bo.editCustReqPg.fragile") }];

  const loadDimensionsArr = [
    { value: "feet", label: t("bo.editCustReqPg.feet") },
    { value: "m", label: t("bo.editCustReqPg.meter") },
    { value: "cm", label: t("bo.editCustReqPg.cm") }];

  const trkLoadTypeArr = [
    { value: "partLoad", label: t("bo.editCustReqPg.partLoad") },
    { value: "fullLoad", label: t("bo.editCustReqPg.fullLoad") }];

  const payTypeArr = [
    { value: "full", label: t("bo.editCustReqPg.fullPay") },
    { value: "advance", label: t("bo.editCustReqPg.adv") },
    { value: "topay", label: t("bo.editCustReqPg.toPay") }];



  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);
    inputObject.custReqId = custReqId;
    inputObject.custId = custReqData?.custId;

    inputObject.preTruckTypes = JSON.stringify(selection.trkTypeObj);

    inputObject.weightUnit = selection.weightUnit;


    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);

    if (Object.keys(errorsObj).length > 0)
      return;

    setLoadingScreen(true);

    try {
      await putCustReq(inputObject);
      queryClient.invalidateQueries([QueryKey.singleCustReq, custReqId])
      notify("success", "Customer Request Updated Successfully");
      navigate(-1, { replace: true });
      setLoadingScreen(false);
    } catch (err) {
      console.log(err);
      customAlert(err)
    }
    setLoadingScreen(false);
  };

  async function handleCancel() {
    navigate(-1, { replace: true });
  }

  const handleStep = (step) => () => {
    console.log(steps.length);
    setActiveStep(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function handleDDCustTypeChange(ele) {
    const { value } = ele.target;
    setSelection((e) => { return { ...e, type: value } });

    if (value === typeArr[0].value)
      setSelection((e) => { return { ...e, consignorName: custFullName, consigneeName: "" } });
    else
      setSelection((e) => { return { ...e, consignorName: "", consigneeName: custFullName } });
  }

  function handleDDMatTypeChange(ele) {
    const { value } = ele.target;
    setSelection((e) => { return { ...e, matType: value } });
  }

  function handleRoMatNatChange(ele) {
    const { value } = ele.target;
    setSelection((e) => { return { ...e, matNature: value } });
  }

  function handleRoMatDimUnitChange(ele) {
    const { value } = ele.target;
    setSelection((e) => { return { ...e, matDimsUnit: value } });
  }

  function handleTgWeightUnitChange(ele, v) {
    if (v == null)
      return

    setSelection((e) => { return { ...e, weightUnit: v } });
  }

  function handleRoLoadTypeChange(ele) {
    const { value } = ele.target;
    setSelection((e) => { return { ...e, loadType: value } });
  }

  function handleRoPayTypeChange(ele) {
    const { value } = ele.target;
    setSelection((e) => { return { ...e, payType: value } });
  }

  function handleTxtFieldChange(e) {
    const { name, value } = e.target;

    if (name === 'cnorName')
      setSelection(prevSel => { return { ...prevSel, consignorName: value } })
    else if (name === 'cneeName')
      setSelection(prevSel => { return { ...prevSel, consigneeName: value } })
  }

  if (!custReqData && custReqId)
    return <h2>Invalid Customer Request</h2>

  if (isError || isErrMatType) {
    customAlert(error || errMatType);
    return <h2>Something went wrong</h2>
  }

  if (isLoading || isLoadMatType) {
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>
  }



  return (
    <BgBox>
      <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>
        <Stack direction={'row'} justifyContent='space-between' mt={0.5} mb={2.5} >
          <Stack direction={'row'} alignItems={"end"}>
            <Typography variant='h5' sx={{ fontWeight: "bold", mr: 1 }}>{t("bo.editCustReqPg.editCustReq")}</Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: 18, color: "rgba(0, 0, 0, 0.5)" }}>({custReqId})</Typography>
          </Stack>
          <Box width={220} mr={5}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} >
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Stack>

        <ScrollBox height={"82%"}>
          <Stack direction={"row"} marginTop={1} mb={1} display={activeStep !== 0 && "none"}>
            <Stack width={"46%"} mr={9}>
              <FillLabelTxtField name="custFullName" title={t("bo.editCustReqPg.cust")} defaultValue={custFullName} readOnly={true} fontSize={14} height={38} />
            </Stack>
            <CustomDropDown defaultValue={custReqData?.type} title={t("bo.editCustReqPg.selCustType")} name={"type"} errMsg={formErrors.type} handleDDChange={handleDDCustTypeChange} ddArr={typeArr} fontSize={14} height={35} />
          </Stack>

          {/* ----------------------------------------------Step 1------------------------------------------ */}
          <Stack direction={"row"} mt={2} display={activeStep !== 0 && "none"} className={"step1"}>
            <Stack width={"46%"} gap={2}>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)" }}> {t("bo.editCustReqPg.consignorDet")}</Typography>
              <CtrlFillLabelTxtField name="cnorName" title={t("bo.editCustReqPg.consignorName")} errMsg={formErrors.cnorName} fontSize={14} height={38} value={selection?.consignorName} onChange={handleTxtFieldChange} />
              <Stack direction={"row"} gap={1}>
                <FillLabelTxtField defaultValue={custReqData?.cnorMobile} name="cnorMobile" title={t("bo.editCustReqPg.cnorMobile")} errMsg={formErrors.cnorMobile} fontSize={14} height={38} width={247} />
                <FillLabelTxtField defaultValue={custReqData?.cnorEmail} name="cnorEmail" title={t("bo.editCustReqPg.cnorEmail")} errMsg={formErrors.cnorEmail} fontSize={14} height={38} width={247} />
              </Stack>
              <Stack direction={"row"} gap={1}>
                <PlaceAutofill defaultValue={custReqData?.picLocation} name="picLocation" title={t("bo.editCustReqPg.pickLocation")} errMsg={formErrors.picLocation} fontSize={14} height={38} width={350} />
                <FillLabelTxtField defaultValue={datePickerformat(custReqData?.picDate)} type={"date"} name="picDate" title={t("bo.editCustReqPg.pickDate")} errMsg={formErrors.picDate} fontSize={14} height={38} width={148} />
              </Stack>
              <FillLabelTxtField defaultValue={custReqData?.picAddress} name="picAddress" errMsg={formErrors.picAddress} title={t("bo.editCustReqPg.detPickLocation")} fontSize={14} multiline={true} height={103} />
            </Stack>

            <Box height={350} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={2}>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)" }}>{t("bo.editCustReqPg.consigneeDet")}</Typography>
              <CtrlFillLabelTxtField name="cneeName" title={t("bo.editCustReqPg.consigneeName")} errMsg={formErrors.cneeName} fontSize={14} height={38} value={selection?.consigneeName} onChange={handleTxtFieldChange} />
              <Stack direction={"row"} gap={1}>
                <FillLabelTxtField defaultValue={custReqData?.cneeMobile} name="cneeMobile" title={t("bo.editCustReqPg.cneeMobile")} errMsg={formErrors.cneeMobile} fontSize={14} height={38} width={247} />
                <FillLabelTxtField defaultValue={custReqData?.cneeEmail} name="cneeEmail" title={t("bo.editCustReqPg.cneeEmail")} errMsg={formErrors.cneeEmail} fontSize={14} height={38} width={247} />
              </Stack>
              <Stack direction={"row"} gap={1}>
                <PlaceAutofill defaultValue={custReqData?.delLocation} name="delLocation" title={t("bo.editCustReqPg.delLocation")} errMsg={formErrors.delLocation} fontSize={14} height={38} width={350} />
                <FillLabelTxtField defaultValue={datePickerformat(custReqData?.delDate)} type={"date"} name="delDate" title={t("bo.editCustReqPg.delDate")} errMsg={formErrors.delDate} fontSize={14} height={38} width={148} />
              </Stack>
              <FillLabelTxtField defaultValue={custReqData?.delAddress} name="delAddress" errMsg={formErrors.delAddress} title={t("bo.editCustReqPg.detDelLocation")} fontSize={14} multiline={true} height={103} />
            </Stack>
          </Stack>

          {/* ----------------------------------------------Step 2------------------------------------------ */}
          <Stack direction={"row"} mt={2} display={activeStep !== 1 && "none"} className={"step2"}>
            <Stack width={"46%"} gap={1.5}>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)" }}>{t("bo.editCustReqPg.matDet")}</Typography>
              <Stack direction={"row"} marginTop={1}>
                <CustomDropDown defaultValue={custReqData?.matType} title={t("bo.editCustReqPg.selMatType")} name={"matType"} errMsg={formErrors.matType} handleDDChange={handleDDMatTypeChange} ddArr={matTypesData || []} fontSize={14} height={35} />
              </Stack>
              <Stack direction={"row"} marginTop={1}>
                <CustomRadio defaultValue={custReqData?.matNature} title={t("bo.editCustReqPg.matNat")} name={"matNature"} errMsg={formErrors.matNature} handleRadioChange={handleRoMatNatChange} radioArr={loadTypeArr} fontSize={14} />
              </Stack>
              <Stack direction={"row"} marginTop={1} mb={1}>
                <CustomRadio defaultValue={custReqData?.matDimsUnit} title={t("bo.editCustReqPg.dimUnit")} name={"matDimsUnit"} errMsg={formErrors.matDimsUnit} handleRadioChange={handleRoMatDimUnitChange} radioArr={loadDimensionsArr} fontSize={14} />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <FillLabelTxtField defaultValue={custReqData?.matLength} type="number" step={0.01} name="matLength" title={t("bo.editCustReqPg.len")} errMsg={formErrors.matLength} fontSize={14} height={38} width={155} />
                <FillLabelTxtField defaultValue={custReqData?.matWidth} type="number" step={0.01} name="matWidth" title={t("bo.editCustReqPg.wid")} errMsg={formErrors.matWidth} fontSize={14} height={38} width={155} />
                <FillLabelTxtField defaultValue={custReqData?.matHeight} type="number" step={0.01} name="matHeight" title={t("bo.editCustReqPg.height")} errMsg={formErrors.matHeight} fontSize={14} height={38} width={155} />
              </Stack>
              <FillLabelTxtField defaultValue={custReqData?.quantity} type="number" name="quantity" title={t("bo.editCustReqPg.quan")} errMsg={formErrors.quantity} fontSize={14} height={38} />
              <Stack direction={"row"} alignItems={"end"} gap={1}>
                <FillLabelTxtField defaultValue={custReqData?.weight} type="number" step={0.01} name="weight" title={t("bo.editCustReqPg.totWei")} errMsg={formErrors.weight} fontSize={14} height={38} width={400} />
                <StyledToggleButtonGroup defaultValue={selection.weightUnit} color="primary" size="small" value={selection.weightUnit} exclusive onChange={handleTgWeightUnitChange} sx={{ height: 36 }}>
                  <ToggleButton value="ton">
                    <Typography>{t("bo.editCustReqPg.ton")}</Typography>
                  </ToggleButton>
                  <ToggleButton value="kilolitre">
                    <Typography>{t("bo.editCustReqPg.kl")}</Typography>
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </Stack>
              <FillLabelTxtField defaultValue={custReqData?.loadDesc} name="loadDesc" errMsg={formErrors.loadDesc} title={t("bo.editCustReqPg.desc")} fontSize={14} multiline={true} height={103} />
            </Stack>

            <Box height={650} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={1.5}>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)" }}>{t("bo.editCustReqPg.trkPre")}</Typography>
              <Stack direction={"row"} marginTop={1} onClick={handleSelTrkTypOpen}>
                <CtrlFillLabelTxtField value={trkTypeTxt} readOnly={true} name="preTruckTypes" title={t("bo.editCustReqPg.selTrkType")} errMsg={formErrors.preTruckTypes} fontSize={14} height={38} />
              </Stack>
              <Stack direction={"row"} marginTop={1}>
                <CustomRadio defaultValue={custReqData?.loadType} title={t("bo.editCustReqPg.trkLoadType")} name={"loadType"} errMsg={formErrors.loadType} handleRadioChange={handleRoLoadTypeChange} radioArr={trkLoadTypeArr} fontSize={14} />
              </Stack>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)", mt: 1 }}>{t("bo.editCustReqPg.payDet")}</Typography>
              <Stack direction={"row"} marginTop={1}>
                <CustomRadio defaultValue={custReqData?.payType} title={t("bo.editCustReqPg.payType")} name={"payType"} errMsg={formErrors.payType} handleRadioChange={handleRoPayTypeChange} radioArr={payTypeArr} fontSize={14} />
              </Stack>
              <Stack direction={"row"} sx={{
                bgcolor: "rgba(223, 218, 248, 0.4)", borderRadius: 2, width: 510, height: 60,
                mt: 1, alignItems: "center", justifyContent: "space-between", px: 5
              }}>
                <Typography fontSize={14} color={"primary.main"}>{t("bo.editCustReqPg.appPrice")}</Typography>
                <Typography sx={{ fontSize: 22, fontWeight: "bold" }}><span name="Rs">&#8377;</span>{selection.estPrice}</Typography>
              </Stack>

            </Stack>
          </Stack>
        </ScrollBox>


        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1, display: activeStep === 0 && "none" }} onClick={handleBack} >{t("bo.editCustReqPg.back")}</Button>

          <Button variant="text" sx={{ height: 40, width: 120, mr: 1, display: activeStep !== 0 && "none" }} onClick={handleCancel} >{t("bo.editCustReqPg.cancel")}</Button>

          <Button variant="contained" onClick={handleNext} sx={{
            height: 40, width: 120, mr: 15,
            display: activeStep === (steps.length - 1) && "none"
          }}>{t("bo.editCustReqPg.next")}</Button>

          <Button variant="contained" type='submit' sx={{
            height: 40, width: 120, mr: 15,
            display: activeStep !== (steps.length - 1) && "none"
          }} disabled={activeStep !== (steps.length - 1)} >{t("bo.editCustReqPg.create")}</Button>
        </Stack>

      </form>
      <SelectTrkType handleClose={handleSelTrkTypClose} open={selTrkTyp} handleSetTrkType={handleSetTrkType} initSelTrkTypeObj={JSON.parse(custReqData?.preTruckTypes)} />
    </BgBox>
  )
}

export default EditCustReqPage;