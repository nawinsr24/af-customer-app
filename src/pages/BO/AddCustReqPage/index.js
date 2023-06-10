import React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { getAllMatTypes, getSingleCust } from '../../../services/cust-service';
import BgBox from '../../../components/BgBox';
import ScrollBox from '../../../components/ScrollBox';
import { Box, Stack } from '@mui/system';
import { Button, Step, StepButton, Stepper, ToggleButton, Typography, ToggleButtonGroup } from '@mui/material';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import CustomDropDown from '../../../components/CustomDropDown';
import validate from './validate';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import { capFirstLetter, getLocalStrg, getTruckName } from '../../../utils/format';
import SelectCust from '../../../components/SelectCust';
import CustomRadio from '../../../components/CustomRadio';
import SelectTrkType from '../../../components/SelectTrkType';
import CtrlFillLabelTxtField from '../../../components/CtrlFillLabelTxtField';
import { postCustReq } from '../../../services/req_service';
import QueryKey from '../../../QueryKey';
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




function AddCustReqPage() {
  const [searchParams] = useSearchParams();
  const { custId } = Object.fromEntries([...searchParams]);
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { isLoading, isError, error, data: custData } = useQuery([QueryKey.singleCust, custId], () => getSingleCust(custId));
  const [selectCusOpen, setSelectCusOpen] = useState(custId ? false : true);
  const { isLoading: isLoadMatType, isError: isErrMatType, error: errMatType, data: matTypesData } = useQuery([QueryKey.matTypes], getAllMatTypes);
  const [selTrkTyp, setSelTrkTyp] = useState(false);
  const { t } = useTranslation();
  const [trkTypeTxt, setTrkTypeTxt] = useState("")
  const steps = ['Step 1', 'Step 2'];
  let custFullName = capFirstLetter(custData?.fName) + " " + capFirstLetter(custData?.lName);
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





  const handleSelectCusClose = (event, reason) => {
    if (reason && reason === "backdropClick")
      handleCancel()
    else
      setSelectCusOpen(false);
  }

  const handleSelTrkTypOpen = () => setSelTrkTyp(true);
  const handleSelTrkTypClose = () => setSelTrkTyp(false);

  function handleSetTrkType(trkTypeObj) {
    setSelection((e) => { return { ...e, trkTypeObj: trkTypeObj } });
    let strg = getTruckName(trkTypeObj);
    setTrkTypeTxt(strg)
  }


  const typeArr = [
    { value: "consignor", label: t("bo.addCustReqPg.consignor") },
    { value: "consignee", label: t("bo.addCustReqPg.consignee") }];

  const loadTypeArr = [
    { value: "flammable", label: t("bo.addCustReqPg.flammable") },
    { value: "fragile", label: t("bo.addCustReqPg.fragile") }];

  const loadDimensionsArr = [
    { value: "feet", label: t("bo.addCustReqPg.feet") },
    { value: "m", label: t("bo.addCustReqPg.meter") },
    { value: "cm", label: t("bo.addCustReqPg.cm") }];

  const trkLoadTypeArr = [
    { value: "partLoad", label: t("bo.addCustReqPg.partLoad") },
    { value: "fullLoad", label: t("bo.addCustReqPg.fullLoad") }];

  const payTypeArr = [
    { value: "full", label: t("bo.addCustReqPg.fullPay") },
    { value: "advance", label: t("bo.addCustReqPg.adv") },
    { value: "topay", label: t("bo.addCustReqPg.toPay") }];

  if (!custData && custId)
    return <h2>Invalid Customer</h2>

  if (isError || isErrMatType) {
    customAlert(error || errMatType);
    return <h2>Something went wrong</h2>
  }

  if (isLoading || isLoadMatType)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>


  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);
    inputObject.custId = custId;

    if (selection.trkTypeObj)
      inputObject.preTruckTypes = JSON.stringify(selection.trkTypeObj);

    inputObject.weightUnit = selection.weightUnit;

    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);

    if (Object.keys(errorsObj).length > 0)
      return;

    setLoadingScreen(true);

    try {
      await postCustReq(inputObject);
      notify("success", "Customer Request Created Successfully");
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


  return (
    <BgBox>
      <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>
        <Stack direction={'row'} justifyContent='space-between' mt={0.5} mb={2.5} >
          <Stack direction={'row'} alignItems={"end"}>
            <Typography variant='h5' sx={{ fontWeight: "bold", mr: 1 }}>{t("bo.addCustReqPg.custReq")}</Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: 18, color: "rgba(0, 0, 0, 0.5)" }}>({custFullName})</Typography>
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
            <CustomDropDown title={t("bo.addCustReqPg.selCustType")} name={"type"} errMsg={formErrors.type} handleDDChange={handleDDCustTypeChange} ddArr={typeArr} fontSize={14} height={35} />
          </Stack>

          {/* ----------------------------------------------Step 1------------------------------------------ */}
          <Stack direction={"row"} mt={2} display={activeStep !== 0 && "none"} className={"step1"}>
            <Stack width={"46%"} gap={2}>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)" }}>{t("bo.addCustReqPg.consignorDet")}</Typography>
              <CtrlFillLabelTxtField name="cnorName" title={t("bo.addCustReqPg.consignorName")} errMsg={formErrors.cnorName} fontSize={14} height={38} value={selection?.consignorName} onChange={handleTxtFieldChange} />
              <Stack direction={"row"} gap={1}>
                <FillLabelTxtField name="cnorMobile" title={t("bo.addCustReqPg.cnorMobile")} errMsg={formErrors.cnorMobile} fontSize={14} height={38} width={247} />
                <FillLabelTxtField name="cnorEmail" title={t("bo.addCustReqPg.cnorEmail")} errMsg={formErrors.cnorEmail} fontSize={14} height={38} width={247} />
              </Stack>
              <Stack direction={"row"} gap={1}>
                <PlaceAutofill name="picLocation" title={t("bo.addCustReqPg.pickLocation")} errMsg={formErrors.picLocation} fontSize={14} height={38} width={350} />
                <FillLabelTxtField type={"date"} name="picDate" title={t("bo.addCustReqPg.pickDate")} errMsg={formErrors.picDate} fontSize={14} height={38} width={148} />
              </Stack>
              <FillLabelTxtField name="picAddress" errMsg={formErrors.picAddress} title={t("bo.addCustReqPg.detPickLocation")} fontSize={14} multiline={true} height={103} />
            </Stack>

            <Box height={350} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={2}>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)" }}>{t("bo.addCustReqPg.consigneeDet")}</Typography>
              <CtrlFillLabelTxtField name="cneeName" title={t("bo.addCustReqPg.consigneeName")} errMsg={formErrors.cneeName} fontSize={14} height={38} value={selection?.consigneeName} onChange={handleTxtFieldChange} />
              <Stack direction={"row"} gap={1}>
                <FillLabelTxtField name="cneeMobile" title={t("bo.addCustReqPg.cneeMobile")} errMsg={formErrors.cneeMobile} fontSize={14} height={38} width={247} />
                <FillLabelTxtField name="cneeEmail" title={t("bo.addCustReqPg.cneeEmail")} errMsg={formErrors.cneeEmail} fontSize={14} height={38} width={247} />
              </Stack>
              <Stack direction={"row"} gap={1}>
                <PlaceAutofill name="delLocation" title={t("bo.addCustReqPg.delLocation")} errMsg={formErrors.delLocation} fontSize={14} height={38} width={350} />
                <FillLabelTxtField type={"date"} name="delDate" title={t("bo.addCustReqPg.delDate")} errMsg={formErrors.delDate} fontSize={14} height={38} width={148} />
              </Stack>
              <FillLabelTxtField name="delAddress" errMsg={formErrors.delAddress} title={t("bo.addCustReqPg.detDelLocation")} fontSize={14} multiline={true} height={103} />
            </Stack>
          </Stack>

          {/* ----------------------------------------------Step 2------------------------------------------ */}
          <Stack direction={"row"} mt={2} display={activeStep !== 1 && "none"} className={"step2"}>
            <Stack width={"46%"} gap={1.5}>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)" }}>{t("bo.addCustReqPg.matDet")}</Typography>
              <Stack direction={"row"} marginTop={1}>
                <CustomDropDown title={t("bo.addCustReqPg.selMatType")} name={"matType"} errMsg={formErrors.matType} handleDDChange={handleDDMatTypeChange} ddArr={matTypesData || []} fontSize={14} height={35} />
              </Stack>
              <Stack direction={"row"} marginTop={1}>
                <CustomRadio title={t("bo.addCustReqPg.matNat")} name={"matNature"} errMsg={formErrors.matNature} handleRadioChange={handleRoMatNatChange} radioArr={loadTypeArr} fontSize={14} />
              </Stack>
              <Stack direction={"row"} marginTop={1} mb={1}>
                <CustomRadio title={t("bo.addCustReqPg.dimUnit")} name={"matDimsUnit"} errMsg={formErrors.matDimsUnit} handleRadioChange={handleRoMatDimUnitChange} radioArr={loadDimensionsArr} fontSize={14} />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <FillLabelTxtField type="number" step={0.01} name="matLength" title={t("bo.addCustReqPg.len")} errMsg={formErrors.matLength} fontSize={14} height={38} width={155} />
                <FillLabelTxtField type="number" step={0.01} name="matWidth" title={t("bo.addCustReqPg.wid")} errMsg={formErrors.matWidth} fontSize={14} height={38} width={155} />
                <FillLabelTxtField type="number" step={0.01} name="matHeight" title={t("bo.addCustReqPg.height")} errMsg={formErrors.matHeight} fontSize={14} height={38} width={155} />
              </Stack>
              <FillLabelTxtField type="number" name="quantity" title={t("bo.addCustReqPg.quan")} errMsg={formErrors.quantity} fontSize={14} height={38} />
              <Stack direction={"row"} alignItems={"end"} gap={1}>
                <FillLabelTxtField type="number" step={0.01} name="weight" title={t("bo.addCustReqPg.totWei")} errMsg={formErrors.weight} fontSize={14} height={38} width={400} />
                <StyledToggleButtonGroup color="primary" size="small" value={selection.weightUnit} exclusive onChange={handleTgWeightUnitChange} sx={{ height: 36 }}>
                  <ToggleButton value="ton">
                    <Typography>{t("bo.addCustReqPg.ton")}</Typography>
                  </ToggleButton>
                  <ToggleButton value="kilolitre">
                    <Typography>{t("bo.addCustReqPg.kl")}</Typography>
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </Stack>
              <FillLabelTxtField name="loadDesc" errMsg={formErrors.loadDesc} title={t("bo.addCustReqPg.desc")} fontSize={14} multiline={true} height={103} />
            </Stack>

            <Box height={650} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={1.5}>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)" }}>{t("bo.addCustReqPg.trkPre")}</Typography>
              <Stack direction={"row"} marginTop={1} onClick={handleSelTrkTypOpen}>
                <CtrlFillLabelTxtField value={trkTypeTxt} readOnly={true} name="preTruckTypes" title={t("bo.addCustReqPg.selTrkType")} errMsg={formErrors.preTruckTypes} fontSize={14} height={38} />
              </Stack>
              <Stack direction={"row"} marginTop={1}>
                <CustomRadio title={t("bo.addCustReqPg.trkLoadType")} name={"loadType"} errMsg={formErrors.loadType} handleRadioChange={handleRoLoadTypeChange} radioArr={trkLoadTypeArr} fontSize={14} />
              </Stack>
              <Typography sx={{ fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)", mt: 1 }}>{t("bo.addCustReqPg.payDet")}</Typography>
              <Stack direction={"row"} marginTop={1}>
                <CustomRadio title={t("bo.addCustReqPg.payType")} name={"payType"} errMsg={formErrors.payType} handleRadioChange={handleRoPayTypeChange} radioArr={payTypeArr} fontSize={14} />
              </Stack>
              <Stack direction={"row"} sx={{
                bgcolor: "rgba(223, 218, 248, 0.4)", borderRadius: 2, width: 510, height: 60,
                mt: 1, alignItems: "center", justifyContent: "space-between", px: 5
              }}>
                <Typography fontSize={14} color={"primary.main"}>{t("bo.addCustReqPg.appPrice")}</Typography>
                <Typography sx={{ fontSize: 22, fontWeight: "bold" }}><span name="Rs">&#8377;</span>{getLocalStrg(selection.estPrice)}</Typography>
              </Stack>

            </Stack>
          </Stack>
        </ScrollBox>


        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1, display: activeStep === 0 && "none" }} onClick={handleBack} >{t("bo.addCustReqPg.back")}</Button>

          <Button variant="text" sx={{ height: 40, width: 120, mr: 1, display: activeStep !== 0 && "none" }} onClick={handleCancel} >{t("bo.addCustReqPg.cancel")}</Button>

          <Button variant="contained" onClick={handleNext} sx={{
            height: 40, width: 120, mr: 15,
            display: activeStep === (steps.length - 1) && "none"
          }}>{t("bo.addCustReqPg.next")}</Button>

          <Button variant="contained" type='submit' sx={{
            height: 40, width: 120, mr: 15,
            display: activeStep !== (steps.length - 1) && "none"
          }} disabled={activeStep !== (steps.length - 1)} >{t("bo.addCustReqPg.create")}</Button>
        </Stack>

      </form>
      <SelectCust handleClose={handleSelectCusClose} open={selectCusOpen} />
      <SelectTrkType handleClose={handleSelTrkTypClose} open={selTrkTyp} handleSetTrkType={handleSetTrkType} />
    </BgBox>
  )
}

export default AddCustReqPage;