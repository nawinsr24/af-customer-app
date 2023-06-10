import React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { datePickerformat, getTruckName } from '../../../utils/format';
import calendSVG from "../../../assets/svg/calend.svg"
import { useQuery, useQueryClient } from 'react-query';
import QueryKey from '../../../QueryKey';
import { getSingleTrk, putTruck } from '../../../services/trkOp-service';
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
      borderRadius: 10,
    },
    '&:first-of-type': {
      borderRadius: 10,
    },
  },
}));

function EditTrkPg() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const { trkId } = useParams();
  const navigate = useNavigate();
  const [selection, setSelection] = useState({ maxCapUnit: "ton" });
  const { t } = useTranslation();
  let txtFielProps = { fontSize: 15, height: 38 };
  const [trkTypeTxt, setTrkTypeTxt] = useState("");
  const [selTrkTyp, setSelTrkTyp] = useState(false);

  const queryClient = useQueryClient();
  const { isLoading, isError, error, data: trkData } = useQuery([QueryKey.singleTrk, trkId], () => getSingleTrk(trkId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!trkData)
      return;

    let trkTypeObj = JSON.parse(trkData?.type)
    let strg = getTruckName(trkTypeObj)
    setTrkTypeTxt(strg);
    setSelection((e) => {
      return {
        ...e,
        trkTypeObj: JSON.parse(trkData?.type),
        maxCapUnit: trkData?.maxCapUnit
      }
    });
  }, [trkData]);

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
    inputObject.truckopId = trkData?.truckopId;
    inputObject.permit_type = trkData?.truckopId;
    inputObject.ins_expDate = trkData?.truckopId;
    inputObject.fc_expDate = trkData?.truckopId;

    inputObject.maxCapUnit = selection?.maxCapUnit;
    inputObject.type = JSON.stringify(selection?.trkTypeObj);

    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);

    console.log(JSON.stringify(inputObject))

    if (Object.keys(errorsObj).length > 0)
      return;

    setLoadingScreen(true);
    try {
      const putData = {
        permit_type: trkData?.permit_type,
        ins_expDate: datePickerformat(trkData?.ins_expDate),
        fc_expDate: datePickerformat(trkData?.fc_expDate),
        maxCap: inputObject.maxCap,
        maxCapUnit: inputObject.maxCapUnit,
        type: inputObject.type
      }
      await putTruck(trkId, putData);
      notify("success", "Truck Updated Successfully");
      queryClient.invalidateQueries();
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


  function handleTgWeightUnitChange(ele, v) {
    if (v == null)
      return

    setSelection((e) => { return { ...e, maxCapUnit: v } });
  }

  if (!trkData && trkId)
    return <h2>Invalid Truck</h2>


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
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.editTrkPg.editTrkDet")}</Typography>

          <Stack direction={"row"} mt={4}>
            <Stack gap={3}>
              <FillLabelTxtField defaultValue={trkData?.regNo} name="regNo" title={t("bo.editTrkPg.trkRegNum")}  {...txtFielProps} readOnly />
              <Stack direction={"row"} alignItems="center" gap={3}>
                <FillLabelTxtField defaultValue={datePickerformat(trkData?.ins_expDate)} name="ins_expDate" title={t("bo.editTrkPg.insExpDate")} {...txtFielProps} readOnly width={239}
                  endAdornment={(
                    <InputAdornment position="end" >
                      <Box component={"img"} src={calendSVG} alt={"calendSVG"} mt={2} />
                    </InputAdornment>
                  )}
                />
                <FillLabelTxtField defaultValue={datePickerformat(trkData?.fc_expDate)} name="fc_expDate" title={t("bo.editTrkPg.fcExpDate")} {...txtFielProps} readOnly width={239}
                  endAdornment={(
                    <InputAdornment position="end" >
                      <Box component={"img"} src={calendSVG} alt={"calendSVG"} mt={2} />
                    </InputAdornment>
                  )}
                />
              </Stack>
              <FillLabelTxtField defaultValue={trkData?.permit_type} name="permit_type" title={t("bo.editTrkPg.pType")} {...txtFielProps} readOnly />
            </Stack>

            <Box height={600} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={3}>
              <FillLabelTxtField defaultValue={trkData?.maxCap} type="number" step={0.01} name="maxCap" title={t("bo.editTrkPg.trkMaxLoadCap")} errMsg={formErrors.maxCap} fontSize={14} height={38}
                endAdornment={(
                  <InputAdornment position="end">
                    <StyledToggleButtonGroup color="primary" size="small" value={selection.maxCapUnit} exclusive onChange={handleTgWeightUnitChange} sx={{ height: 34, mt: 2 }}>
                      <ToggleButton value="ton">
                        <Typography>{t("bo.editTrkPg.ton")}</Typography>
                      </ToggleButton>
                      <ToggleButton value="kilolitre">
                        <Typography>{t("bo.editTrkPg.kl")}</Typography>
                      </ToggleButton>
                    </StyledToggleButtonGroup>
                  </InputAdornment>
                )}
              />
              <Stack direction={"row"} marginTop={1} onClick={handleSelTrkTypOpen}>
                <CtrlFillLabelTxtField value={trkTypeTxt} readOnly={true} name="trkType" title={t("bo.editTrkPg.selTrkType")} errMsg={formErrors.trkType} fontSize={14} height={38} />
              </Stack>
            </Stack>
          </Stack>
        </ScrollBox>
        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("bo.editTrkPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 120, mr: 15 }}>{t("bo.editTrkPg.submit")}</Button>
        </Stack>
      </form>
      <SelectTrkType handleClose={handleSelTrkTypClose} open={selTrkTyp} handleSetTrkType={handleSetTrkType} />
    </BgBox>
  )
}

export default EditTrkPg