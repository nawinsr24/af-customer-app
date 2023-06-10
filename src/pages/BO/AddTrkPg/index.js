import React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import BgBox from '../../../components/BgBox';
import ScrollBox from '../../../components/ScrollBox';
import { Box, Stack } from '@mui/system';
import { Button, InputAdornment, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import validate from './validate';
import { useTranslation } from "react-i18next";
import CtrlFillLabelTxtField from '../../../components/CtrlFillLabelTxtField';
import SelectTrkType from '../../../components/SelectTrkType';
import { datePickerformat, formatDateWithJs, getTruckName } from '../../../utils/format';
import calendSVG from "../../../assets/svg/calend.svg"
import { useQuery } from 'react-query';
import QueryKey from '../../../QueryKey';
import { addtruck, getSingleTrkOp } from '../../../services/trkOp-service';
import LoadingScreen from '../../../components/loadingScreen';
import { getRcDetails } from '../../../services/serv_services';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    // margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: 10,
    },
    '&:first-of-type': {
      borderRadius: 10,
    },
  },
}));

function AddTrkPg() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const [searchParams] = useSearchParams();
  const { trkOpId } = Object.fromEntries([...searchParams]);
  const navigate = useNavigate();
  const [selection, setSelection] = useState({
    maxCapUnit: "ton",
    regNo: "",
    permit_type: "",
    ins_expDate: "",
    fc_expDate: ""
  });

  const { t } = useTranslation();
  let txtFielProps = { fontSize: 15, height: 38 };
  const [trkTypeTxt, setTrkTypeTxt] = useState("");
  const [selTrkTyp, setSelTrkTyp] = useState(false);

  const { isLoading, isError, error, data: trkOpData } = useQuery([QueryKey.singleTrkOp, trkOpId], () => getSingleTrkOp(trkOpId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleSelTrkTypOpen = () => setSelTrkTyp(true);
  const handleSelTrkTypClose = () => setSelTrkTyp(false);

  function handleSetTrkType(trkTypeObj) {
    setSelection((e) => { return { ...e, trkTypeObj: trkTypeObj } });
    let strg = getTruckName(trkTypeObj);
    setTrkTypeTxt(strg)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const inputObject = Object.fromEntries(formData);
    inputObject.truckopId = trkOpId;
    inputObject.maxCapUnit = selection?.maxCapUnit;
    inputObject.type = JSON.stringify(selection?.trkTypeObj);

    inputObject.ins_expDate = datePickerformat(selection?.ins_expDate)
    inputObject.fc_expDate = datePickerformat(selection?.fc_expDate)


    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);

    console.log(JSON.stringify(inputObject))

    if (Object.keys(errorsObj).length > 0)
      return;

    setLoadingScreen(true);
    try {
      await addtruck(inputObject);
      notify("success", "Truck Added Successfully");
      navigate(-1, { replace: true });
      setLoadingScreen(false);
    } catch (err) {
      console.log(err);
      if (err === 409)
        notify("error", "Truck Already Registred");
      else
        customAlert(err)
    }
    setLoadingScreen(false);
  };

  async function handleCancel() {
    navigate(-1, { replace: true });
  }

  async function verifyRc() {
    setLoadingScreen(true);
    try {
      const res = await getRcDetails({ regNo: selection?.regNo })

      setSelection(prevSel => {
        return {
          ...prevSel,
          permit_type: res.permitType,
          ins_expDate: res.InsExpDate,
          fc_expDate: res.fcExpDate
        }
      })
    } catch (error) {
      console.log(error);
      customAlert(error)
    }
    setLoadingScreen(false);
  }

  function handleTgWeightUnitChange(ele, v) {
    if (v == null)
      return

    setSelection((e) => { return { ...e, maxCapUnit: v } });
  }

  function handlSelChange(e) {
    const { name, value } = e.target;
    setSelection(prevSel => { return { ...prevSel, [name]: value } })
  }

  if (!trkOpData && trkOpId)
    return <h2>Invalid Truck Operator</h2>


  if (isError) {
    customAlert(error);
    return <h2>Something went wrong</h2>
  }

  if (isLoading)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

  return (
    <BgBox>
      <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>
        <ScrollBox>
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.addTrkPg.trkDet")}</Typography>

          <Stack direction={"row"} mt={4}>
            <Stack gap={3}>
              <CtrlFillLabelTxtField value={selection?.regNo} onChange={handlSelChange} name="regNo" title={t("bo.addTrkPg.trkRegNum")} errMsg={formErrors.regNo} {...txtFielProps}
                endAdornment={(
                  <InputAdornment position="end" >
                    <Button variant="contained" onClick={verifyRc} color='info' sx={{ height: 30, mt: 2 }}>Verify</Button>
                  </InputAdornment>
                )}
              />
              <Stack direction={"row"} alignItems="center" gap={3}>
                <CtrlFillLabelTxtField onChange={handlSelChange} value={formatDateWithJs(selection?.ins_expDate) || ""} name="ins_expDate" title={t("bo.addTrkPg.insExpDate")} errMsg={formErrors.ins_expDate} {...txtFielProps} readOnly width={239}
                  endAdornment={(
                    <InputAdornment position="end" >
                      <Box component={"img"} src={calendSVG} alt={"calendSVG"} mt={2} />
                    </InputAdornment>
                  )}
                />
                <CtrlFillLabelTxtField onChange={handlSelChange} value={formatDateWithJs(selection?.fc_expDate) || ""} name="fc_expDate" title={t("bo.addTrkPg.fcExpDate")} errMsg={formErrors.fc_expDate} {...txtFielProps} readOnly width={239}
                  endAdornment={(
                    <InputAdornment position="end" >
                      <Box component={"img"} src={calendSVG} alt={"calendSVG"} mt={2} />
                    </InputAdornment>
                  )}
                />
              </Stack>
              <CtrlFillLabelTxtField onChange={handlSelChange} value={selection?.permit_type || ""} name="permit_type" title={t("bo.addTrkPg.pType")} errMsg={formErrors.permit_type} {...txtFielProps} readOnly />
            </Stack>

            <Box height={600} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={3}>
              <FillLabelTxtField type="number" step={0.01} name="maxCap" title={t("bo.addTrkPg.trkMaxLoadCap")} errMsg={formErrors.maxCap} fontSize={14} height={38}
                endAdornment={(
                  <InputAdornment position="end">
                    <StyledToggleButtonGroup color="primary" size="small" value={selection.maxCapUnit} exclusive onChange={handleTgWeightUnitChange} sx={{ height: 34, mt: 2 }}>
                      <ToggleButton value="ton">
                        <Typography>{t("bo.addTrkPg.ton")}</Typography>
                      </ToggleButton>
                      <ToggleButton value="kilolitre">
                        <Typography>{t("bo.addTrkPg.kl")}</Typography>
                      </ToggleButton>
                    </StyledToggleButtonGroup>
                  </InputAdornment>
                )}
              />
              <Stack direction={"row"} marginTop={1} onClick={handleSelTrkTypOpen}>
                <CtrlFillLabelTxtField value={trkTypeTxt} readOnly={true} name="trkType" title={t("bo.addTrkPg.selTrkType")} errMsg={formErrors.trkType} fontSize={14} height={38} />
              </Stack>
            </Stack>
          </Stack>
        </ScrollBox>
        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("bo.addTrkPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 120, mr: 15 }}>{t("bo.addTrkPg.submit")}</Button>
        </Stack>
      </form>
      <SelectTrkType handleClose={handleSelTrkTypClose} open={selTrkTyp} handleSetTrkType={handleSetTrkType} />
    </BgBox>
  )
}

export default AddTrkPg