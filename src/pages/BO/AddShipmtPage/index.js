import React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import BgBox from '../../../components/BgBox';
import ScrollBox from '../../../components/ScrollBox';
import { Box, Stack } from '@mui/system';
import { Button, Step, StepButton, Stepper, ToggleButton, Typography, ToggleButtonGroup, InputAdornment, CircularProgress } from '@mui/material';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import CustomDropDown from '../../../components/CustomDropDown';
import validate from './validate';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import { capFirstLetter, datePickerformat } from '../../../utils/format';
import CustomRadio from '../../../components/CustomRadio';
import { getSingleCustReq, getSingleTrkOpReq } from '../../../services/req_service';
import QueryKey from '../../../QueryKey';
import phoneSVG from '../../../assets/svg/Phone-s.svg';
import arrowSVG from '../../../assets/svg/doubleArrow.svg';
import trackSVG from '../../../assets/svg/track.svg';
import SelectCustMatReq from './SelectCustMatReq';
import SelectTrkOpMatReq from './SelectTrkOpMatReq';
import { useEffect } from 'react';
import { getAllTrksByTpId } from '../../../services/trkOp-service';
import { getAllMatTypes, getSingleCust } from '../../../services/cust-service';
import PlaceAutofill from '../../../components/PlaceAutofill';
import { getShipmtFormattedData } from '../../../utils/shipmtDataFormat';
import { createShipmt } from '../../../services/shipmt-service';
import { t } from 'i18next';
import { useTranslation } from "react-i18next";
import { fileUploadService } from '../../../services/s3-service';
import { Upload } from '@mui/icons-material';
import CtrlFillLabelTxtField from '../../../components/CtrlFillLabelTxtField';
import Fileupload from '../../../components/Fileupload';


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




function AddShipmtPage() {
  const steps = ['Step 1', 'Step 2', 'Step3'];

  const [searchParams] = useSearchParams();
  const { custReqId, trkOpReqId } = Object.fromEntries([...searchParams]);
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  const [selCusReqOpen, setSelCusReqOpen] = useState(custReqId ? false : true);
  const { isLoading: isCusReqLoading, isError: isCusReqErr, error: cusReqErr, data: custReqData } = useQuery([QueryKey.singleCustReq, custReqId], () => getSingleCustReq(custReqId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(custReqId)
  });

  const [selTrkOpReqOpen, setSelTrkOpReqOpen] = useState(trkOpReqId ? false : true);
  const { isLoading: isTpReqLoading, isError: isTpReqErr, error: tpReqErr, data: tpReqData } = useQuery([QueryKey.singleTrkOpReq, trkOpReqId], () => getSingleTrkOpReq(trkOpReqId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(trkOpReqId)
  });

  const { isLoading: isLoadMatType, isError: isErrMatType, error: errMatType, data: matTypesData } = useQuery([QueryKey.matTypes], getAllMatTypes, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const { isLoading: isTrksLoading, isError: isTrksErr, error: trksErr, data: trksData } = useQuery([QueryKey.allTrks, tpReqData?.truckopId], () => getAllTrksByTpId(tpReqData?.truckopId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: tpReqData && Object.keys(tpReqData).length > 0
  });

  const { isLoading: isCusLoading, isError: isCusError, error: cusError, data: custData } = useQuery([QueryKey.singleCust, custReqData?.custId], () => getSingleCust(custReqData?.custId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: custReqData && Object.keys(custReqData).length > 0
  });

  const [trksDD, setTrksDD] = useState([]);
  const [selection, setSelection] = useState({});





  let txtFielProps = { fontSize: 14, height: 38, width: 500 };
  let radioFieldProps = { fontSize: 14, gap: 5 };
  let titleStyle = { fontWeight: "bold", fontSize: 16, color: "rgba(131, 146, 171, 0.7)" };



  const loadTypeArr = [
    { value: "flammable", label: t("bo.addShipmtPg.flammable") },
    { value: "fragile", label: t("bo.addShipmtPg.fragile") }];

  const loadDimensionsArr = [
    { value: "feet", label: t("bo.addShipmtPg.feet") },
    { value: "m", label: t("bo.addShipmtPg.meter") },
    { value: "cm", label: t("bo.addShipmtPg.cm") }];

  const trkLoadTypeArr = [
    { value: "partLoad", label: t("bo.addShipmtPg.partLoad") },
    { value: "fullLoad", label: t("bo.addShipmtPg.fullLoad") }];

  const payTypeArr = [
    { value: "full", label: t("bo.addShipmtPg.fullPay") },
    { value: "advance", label: t("bo.addShipmtPg.adv") },
    { value: "topay", label: t("bo.addShipmtPg.toPay") }];

  const sessRadioArr = [
    { value: "morning", label: t("bo.addShipmtPg.mrng") },
    { value: "noon", label: t("bo.addShipmtPg.noon") },
    { value: "evening", label: t("bo.addShipmtPg.evng") },
    { value: "night", label: t("bo.addShipmtPg.night") }];



  useEffect(() => {
    if (!trksData)
      return;

    let arr = trksData.map((i) => {
      return { ...i, value: i?.id, label: i?.regNo }
    })
    let filteredObj = trksData.filter((i) => tpReqData?.truckId === i?.id)
    setSelection((e) => { return { ...e, trkObj: { ...filteredObj[0] } } });

    setTrksDD([...arr])
  }, [trksData, tpReqData?.truckId]);


  useEffect(() => {
    if (!custReqData)
      return;

    setSelection({ weightUnit: custReqData?.weightUnit })
  }, [custReqData]);


  function handleDDTrkChange(ele) {
    const { value: truckId } = ele.target;
    let filteredObj = trksData.filter((i) => truckId === i?.id)
    setSelection((e) => { return { ...e, trkObj: { ...filteredObj[0] } } });
  }



  const handleSelCusReqClose = (event, reason) => {
    if (reason && reason === "backdropClick")
      handleCancel()
    else
      setSelCusReqOpen(false);
  }

  const handleSelTrkOpReqClose = (event, reason) => {
    if (reason && reason === "backdropClick")
      handleCancel()
    else
      setSelTrkOpReqOpen(false);
  }

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


  function handleTgWeightUnitChange(ele, v) {
    if (v == null)
      return

    setSelection((e) => { return { ...e, weightUnit: v } });
  }

  function handlSelChange(e) {
    const { name, value } = e.target;
    setSelection(prevSel => { return { ...prevSel, [name]: value } })
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);

    inputObject.custId = custReqData?.custId;
    inputObject.truckOpId = tpReqData?.truckopId;
    inputObject.custReqId = custReqId;
    inputObject.truckOpReqId = trkOpReqId;
    inputObject.trkOpDataFilledBy = "backoffice";
    inputObject.custDataFilledBy = "backoffice";

    inputObject.weightUnit = selection?.weightUnit;

    inputObject.truckRegNo = selection?.trkObj?.regNo;
    inputObject.trkPermitType = selection?.trkObj?.permit_type;
    inputObject.trkIns_expDate = datePickerformat(selection?.trkObj?.ins_expDate);
    inputObject.trkFc_expDate = datePickerformat(selection?.trkObj?.fc_expDate);
    inputObject.trkMaxCap = selection?.trkObj?.maxCap;
    inputObject.trkMaxCapUnit = selection?.trkObj?.maxCapUnit;
    inputObject.truck_type = selection?.trkObj?.type;
    inputObject.billCopy = selection?.billCopy;
    inputObject.ewayA = selection?.ewayA;

    console.log(JSON.stringify(inputObject));

    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);

    if (Object.keys(errorsObj).length > 0)
      return;

    setLoadingScreen(true);

    try {
      let postData = getShipmtFormattedData(inputObject);
      await createShipmt(postData);

      notify("success", "Shipment Created Successfully");
      navigate(-1, { replace: true });
      setLoadingScreen(false);
    } catch (err) {
      console.log(err);
      customAlert(err)
    }
    setLoadingScreen(false);
  };



  function handleOnUpload({ fieldName, fileKey }) {
    setSelection(prevSel => { return { ...prevSel, [fieldName]: fileKey } })
  }

  if ((!custReqData && custReqId) || (!tpReqData && trkOpReqId))
    return <h2>Invalid Data</h2>

  if (isCusReqErr || isTpReqErr || isTrksErr || isErrMatType || isCusError) {
    customAlert(cusReqErr || tpReqErr || trksErr || errMatType || cusError);
    return <h2>Something went wrong</h2>
  }

  if (isCusReqLoading || isTpReqLoading || isTrksLoading || isLoadMatType || isCusLoading)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

  console.log(selection)
  return (
    <BgBox>
      <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>
        <Stack direction={'row'} justifyContent='space-between' mt={0.5} mb={2.5} >
          <Stack direction={'row'} alignItems={"end"}>
            <Typography variant='h5' sx={{ fontWeight: "bold", mr: 1 }}>{t("bo.addShipmtPg.createShipment")}</Typography>
          </Stack>
          <Box width={340} mr={5}>
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
          {/* ----------------------------------------------Step 1------------------------------------------ */}
          <Stack direction={"row"} display={activeStep !== 0 && "none"} className={"step1"}>
            <Stack width={"46%"} gap={2} >
              <InfoCard custReqData={custReqData} tpReqData={tpReqData} />
              <Typography sx={titleStyle} mt={1}> {t("bo.addShipmtPg.consignorDet")}</Typography>
              <FillLabelTxtField defaultValue={custReqData?.cnorName} name="cnorName" title={t("bo.addShipmtPg.consignorName")} errMsg={formErrors.cnorName} {...txtFielProps} />
              <Stack direction={"row"} gap={1}>
                <FillLabelTxtField name="cnorMobile" title={t("bo.addCustReqPg.cnorMobile")} errMsg={formErrors.cnorMobile} fontSize={14} height={38} width={247} />
                <FillLabelTxtField name="cnorEmail" title={t("bo.addCustReqPg.cnorEmail")} errMsg={formErrors.cnorEmail} fontSize={14} height={38} width={247} />
              </Stack>
              <PlaceAutofill defaultValue={custReqData?.picLocation} name="picLocation" title={t("bo.addShipmtPg.pickLocation")} errMsg={formErrors.picLocation} {...txtFielProps} />
              <FillLabelTxtField defaultValue={custReqData?.picAddress} name="picAddress" errMsg={formErrors.picAddress} title={t("bo.addShipmtPg.detPickLocation")} {...txtFielProps} height={103} multiline={true} />
            </Stack>

            <Box height={600} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={2}>
              <Typography sx={titleStyle}>{t("bo.addShipmtPg.consigneeDet")}</Typography>
              <FillLabelTxtField defaultValue={custReqData?.cneeName} name="cneeName" title={t("bo.addShipmtPg.consigneeName")} errMsg={formErrors.cneeName} {...txtFielProps} />
              <Stack direction={"row"} gap={1}>
                <FillLabelTxtField name="cneeMobile" title={t("bo.addCustReqPg.cneeMobile")} errMsg={formErrors.cneeMobile} fontSize={14} height={38} width={247} />
                <FillLabelTxtField name="cneeEmail" title={t("bo.addCustReqPg.cneeEmail")} errMsg={formErrors.cneeEmail} fontSize={14} height={38} width={247} />
              </Stack>
              <PlaceAutofill defaultValue={custReqData?.delLocation} name="delLocation" title={t("bo.addShipmtPg.delLocation")} errMsg={formErrors.delLocation} {...txtFielProps} />
              <FillLabelTxtField defaultValue={custReqData?.delAddress} name="delAddress" errMsg={formErrors.delAddress} title={t("bo.addShipmtPg.detDelLocation")} {...txtFielProps} height={103} multiline={true} />
              <Stack direction={"row"} gap={4} mt={1}>
                <FillLabelTxtField defaultValue={datePickerformat(custReqData?.picDate)} type={"date"} name="estPicDate" title={t("bo.addShipmtPg.estPickDate")} errMsg={formErrors.estPicDate} {...txtFielProps} width={220} />
                <FillLabelTxtField defaultValue={datePickerformat(custReqData?.delDate)} type={"date"} name="estDelDate" title={t("bo.addShipmtPg.estDelDate")} errMsg={formErrors.estDelDate} {...txtFielProps} width={220} />
              </Stack>
              <CustomRadio title={t("bo.addShipmtPg.pickSession")} name={"estPicSession"} errMsg={formErrors.estPicSession} radioArr={sessRadioArr} handleRadioChange={handlSelChange} {...radioFieldProps} />
              <CustomRadio title={t("bo.addShipmtPg.delSession")} name={"estDelSession"} errMsg={formErrors.estDelSession} radioArr={sessRadioArr} handleRadioChange={handlSelChange} {...radioFieldProps} />
            </Stack>
          </Stack>

          {/* ----------------------------------------------Step 2------------------------------------------ */}
          <Stack direction={"row"} mt={2} display={activeStep !== 1 && "none"} className={"step2"}>
            <Stack width={"46%"} gap={1.5}>
              <Typography sx={titleStyle}>{t("bo.addShipmtPg.matDet")}</Typography>
              <Stack direction={"row"} marginTop={1}>
                <CustomDropDown defaultValue={custReqData?.matType} title={t("bo.addShipmtPg.selMatType")} name={"matType"} errMsg={formErrors.matType} handleDDChange={handlSelChange} ddArr={matTypesData || []} {...txtFielProps} />
              </Stack>
              <Stack direction={"row"} marginTop={1}>
                <CustomRadio defaultValue={custReqData?.loadType} title={t("bo.addShipmtPg.trkLoadType")} name={"loadType"} errMsg={formErrors.loadType} radioArr={trkLoadTypeArr} {...radioFieldProps} />
              </Stack>
              <Stack direction={"row"} marginTop={1}>
                <CustomRadio defaultValue={custReqData?.matNature} title={t("bo.addShipmtPg.matNat")} name={"matNature"} errMsg={formErrors.matNature} radioArr={loadTypeArr} {...radioFieldProps} />
              </Stack>
              <Stack direction={"row"} marginTop={1} mb={1}>
                <CustomRadio defaultValue={custReqData?.matDimsUnit} title={t("bo.addShipmtPg.dimUnit")} name={"matDimsUnit"} errMsg={formErrors.matDimsUnit} radioArr={loadDimensionsArr} {...radioFieldProps} />
              </Stack>
              <Stack direction={"row"} gap={2}>
                <FillLabelTxtField defaultValue={custReqData?.matLength} type="number" step={0.01} name="matLength" title={t("bo.addShipmtPg.len")} errMsg={formErrors.matLength} {...txtFielProps} width={155} />
                <FillLabelTxtField defaultValue={custReqData?.matWidth} type="number" step={0.01} name="matWidth" title={t("bo.addShipmtPg.wid")} errMsg={formErrors.matWidth} {...txtFielProps} width={155} />
                <FillLabelTxtField defaultValue={custReqData?.matHeight} type="number" step={0.01} name="matHeight" title={t("bo.addShipmtPg.height")} errMsg={formErrors.matHeight} {...txtFielProps} width={155} />
              </Stack>
              <FillLabelTxtField defaultValue={custReqData?.quantity} type="number" name="quantity" title={t("bo.addShipmtPg.quan")} errMsg={formErrors.quantity} {...txtFielProps} />
              <Stack direction={"row"} alignItems={"end"} gap={1}>
                <FillLabelTxtField defaultValue={custReqData?.weight} type="number" step={0.01} name="weight" title={t("bo.addShipmtPg.totWei")} errMsg={formErrors.weight} {...txtFielProps} width={400} />
                <StyledToggleButtonGroup color="primary" size="small" value={selection.weightUnit} exclusive onChange={handleTgWeightUnitChange} sx={{ height: 36 }}>
                  <ToggleButton value="ton">
                    <Typography>{t("bo.addShipmtPg.ton")}</Typography>
                  </ToggleButton>
                  <ToggleButton value="kilolitre">
                    <Typography>{t("bo.addShipmtPg.kl")}</Typography>
                  </ToggleButton>
                </StyledToggleButtonGroup>
              </Stack>
              <FillLabelTxtField defaultValue={custReqData?.loadDesc} name="loadDesc" errMsg={formErrors.loadDesc} title={t("bo.addShipmtPg.desc")} fontSize={14} multiline={true} height={103} />
            </Stack>

            <Box height={650} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={2}>
              <Typography sx={titleStyle}>{t("bo.addShipmtPg.trkDet")}</Typography>
              <Stack direction={"row"} >
                {trksDD[0] && <CustomDropDown defaultValue={tpReqData?.truckId} title={t("bo.addShipmtPg.selTrk")} name={"truckId"} errMsg={formErrors.truckId} ddArr={trksDD || []} handleDDChange={handleDDTrkChange} {...txtFielProps} />}
              </Stack>
              <FillLabelTxtField name="drivName" title={t("bo.addShipmtPg.drivName")} errMsg={formErrors.drivName} {...txtFielProps} />

              <Stack direction={"row"} gap={2}>
                <FillLabelTxtField name="drivMobile1" title={t("bo.addShipmtPg.drivMob1")} errMsg={formErrors.drivMobile1} {...txtFielProps} width={243} />
                <FillLabelTxtField name="drivMobile2" title={t("bo.addShipmtPg.drivMob2")} errMsg={formErrors.drivMobile2} {...txtFielProps} width={243} />
              </Stack>

              <Stack direction={"row"} gap={2}>
                <FillLabelTxtField name="drivLicNo" title={t("bo.addShipmtPg.drivLicNo")} errMsg={formErrors.drivLicNo} {...txtFielProps} width={243} />
                <FillLabelTxtField name="trackingGPSLink" title={t("bo.addShipmtPg.trackGps")} errMsg={formErrors.trackingGPSLink} {...txtFielProps} width={243} endAdornment={(<InputAdornment position={"end"}> <Box component={"img"} src={trackSVG} alt="trackSVG" mt={2} /> </InputAdornment>)} />
              </Stack>
              <Typography sx={titleStyle} mt={3}>{t("bo.addShipmtPg.inchargeDet")}</Typography>
              <FillLabelTxtField name="picIncName" title={t("bo.addShipmtPg.pickInchargeName")} errMsg={formErrors.picIncName} {...txtFielProps} />
              <Stack direction={"row"} gap={2} mb={1}>
                <FillLabelTxtField name="picInchMobile1" title={t("bo.addShipmtPg.pickInchargeMob1")} errMsg={formErrors.picInchMobile1} {...txtFielProps} width={243} />
                <FillLabelTxtField name="picInchMobile2" title={t("bo.addShipmtPg.pickInchargeMob2")} errMsg={formErrors.picInchMobile2} {...txtFielProps} width={243} />
              </Stack>

              <FillLabelTxtField name="delInchName" title={t("bo.addShipmtPg.delInchargeName")} errMsg={formErrors.delInchName} {...txtFielProps} />
              <Stack direction={"row"} gap={2} mb={1}>
                <FillLabelTxtField name="delInchMobile1" title={t("bo.addShipmtPg.delInchargeMob1")} errMsg={formErrors.delInchMobile1} {...txtFielProps} width={243} />
                <FillLabelTxtField name="delInchMobile2" title={t("bo.addShipmtPg.delInchargeMob2")} errMsg={formErrors.delInchMobile2} {...txtFielProps} width={243} />
              </Stack>

            </Stack>
          </Stack>

          {/* ----------------------------------------------Step 3------------------------------------------ */}
          <Stack direction={"row"} display={activeStep !== 2 && "none"} className={"step1"}>
            <Stack width={"46%"} gap={2} >
              <Typography sx={titleStyle} mt={1}>{t("bo.addShipmtPg.pricing")}</Typography>
              <Stack direction={"row"} gap={2} mb={1}>
                <FillLabelTxtField name="cnorGST" title={t("bo.addShipmtPg.consignorGst")} errMsg={formErrors.cnorGST} {...txtFielProps} width={243} />
                <FillLabelTxtField name="cneeGST" title={t("bo.addShipmtPg.consigneeGst")} errMsg={formErrors.cneeGST} {...txtFielProps} width={243} />
              </Stack>
              <FillLabelTxtField type="number" step={0.5} defaultValue={custReqData?.estPrice} name="cust_finalPrc" title={t("bo.addShipmtPg.priceCust")} errMsg={formErrors.cust_finalPrc} {...txtFielProps} />
              <Stack direction={"row"} marginTop={1} mb={3}>
                <CustomRadio defaultValue={custReqData?.payType} title={t("bo.addShipmtPg.payTypeCust")} name={"custPayType"} errMsg={formErrors.custPayType} handleRadioChange={handlSelChange} radioArr={payTypeArr} {...radioFieldProps} />
              </Stack>
            </Stack>

            <Box height={600} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack width={"46%"} gap={2.5} >
              <Typography sx={titleStyle} >{t("bo.addShipmtPg.doc")}</Typography>


              <Fileupload name="billCopy" title={t("bo.addShipmtPg.billCopy")} txtFieldProps={txtFielProps} errMsg={formErrors.billCopy} onUpload={handleOnUpload} />

              <Fileupload name="ewayA" title={t("bo.addShipmtPg.ewayBill")} txtFieldProps={txtFielProps} errMsg={formErrors.ewayA} onUpload={handleOnUpload} />

              <FillLabelTxtField name="ewayA_no" title={t("bo.addShipmtPg.ewayBillNum")} errMsg={formErrors.ewayA_no} {...txtFielProps} />

            </Stack>

          </Stack>

        </ScrollBox>


        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1, display: activeStep === 0 && "none" }} onClick={handleBack} >{t("bo.addShipmtPg.back")}</Button>

          <Button variant="text" sx={{ height: 40, width: 120, mr: 1, display: activeStep !== 0 && "none" }} onClick={handleCancel} >{t("bo.addShipmtPg.cancel")}</Button>

          <Button variant="contained" onClick={handleNext} sx={{
            height: 40, width: 120, mr: 15,
            display: activeStep === (steps.length - 1) && "none"
          }}>{t("bo.addShipmtPg.next")}</Button>

          <Button variant="contained" type='submit' sx={{
            height: 40, width: 120, mr: 15,
            display: activeStep !== (steps.length - 1) && "none"
          }} disabled={activeStep !== (steps.length - 1)} >{t("bo.addShipmtPg.create")}</Button>
        </Stack>

      </form>
      <SelectCustMatReq handleClose={handleSelCusReqClose} open={selCusReqOpen} trkOpReqId={trkOpReqId} />
      <SelectTrkOpMatReq handleClose={handleSelTrkOpReqClose} open={selTrkOpReqOpen} custReqId={custReqId} />
    </BgBox>
  )
}

function InfoCard({ custReqData, tpReqData }) {
  let custFullName = capFirstLetter(custReqData?.custFName) + " " + capFirstLetter(custReqData?.custLName);
  let trkOpFullName = capFirstLetter(tpReqData?.trkOpFName) + " " + capFirstLetter(tpReqData?.trkOpLName);

  let primTxtStyle = { fontSize: 14, fontWeight: 600 }

  return <Stack direction={"row"} bgcolor={"rgb(249, 248, 254)"} borderRadius={3} width={"100%"} height={140} p={2} alignItems={"center"}>
    <Stack maxWidth={250} gap={0.3}>
      <Typography sx={{ ...primTxtStyle, color: "rgba(0, 0, 0, 0.4)" }}>{t("bo.addShipmtPg.cust")}</Typography>
      <Typography sx={primTxtStyle} style={{ wordWrap: 'pre-wrap' }}>{custFullName}</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: "rgba(0, 0, 0, 0.4)" }}>{t("bo.addShipmtPg.id")}{custReqData?.custReqId}</Typography>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Box component={"img"} src={phoneSVG} alt="phoneSVG" height={17} />
        <Typography sx={{ fontSize: 14 }}>{custReqData?.CustContact}</Typography>
      </Stack>
    </Stack>
    <Box component={"img"} src={arrowSVG} alt="arrowSVG" height={17} mx={3} />
    <Stack maxWidth={250} gap={0.3}>
      <Typography sx={{ ...primTxtStyle, color: "rgba(0, 0, 0, 0.4)" }}>{t("bo.addShipmtPg.trkOp")}</Typography>
      <Typography sx={primTxtStyle} style={{ wordWrap: 'pre-wrap' }}>{trkOpFullName}</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: "rgba(0, 0, 0, 0.4)" }}>{t("bo.addShipmtPg.id")} {tpReqData?.truckOpReqId}</Typography>
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Box component={"img"} src={phoneSVG} alt="phoneSVG" height={17} />
        <Typography sx={{ fontSize: 14 }}>{tpReqData?.trkOpContact}</Typography>
      </Stack>
    </Stack>
  </Stack>
}

export default AddShipmtPage;