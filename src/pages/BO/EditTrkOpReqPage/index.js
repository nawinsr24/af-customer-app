import React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import BgBox from '../../../components/BgBox';
import ScrollBox from '../../../components/ScrollBox';
import { Box, Stack } from '@mui/system';
import { Button, ToggleButton, Typography, ToggleButtonGroup, InputAdornment } from '@mui/material';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import CustomDropDown from '../../../components/CustomDropDown';
import validate from './validate';
import { useQuery, useQueryClient } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import { capFirstLetter } from '../../../utils/format';
import CustomRadio from '../../../components/CustomRadio';
import { getSingleTrkOpReq, putTrkOpReq } from '../../../services/req_service';
import { getSingleTrkOp } from '../../../services/trkOp-service';
import { AddLocationAltRounded } from '@mui/icons-material';
import QueryKey from '../../../QueryKey';
import { useEffect } from 'react';
import RouteCard from '../../../components/RouteCard';
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
      borderRadius: 10,
    },
    '&:first-of-type': {
      borderRadius: 10,
    },
  },
}));




function EditTrkOpReqPage() {
  const queryClient = useQueryClient()
  const { trkOpReqId } = useParams()
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selection, setSelection] = useState({
    truckId: null,
    ddTrkArr: [],
    trkLoadStatus: null,
    capUnit: "ton",
    routeTxtField: ""
  });
  const [routesArr, setRoutesArr] = useState([])

  const { isLoading, isError, error, data: trkOpReqData } = useQuery([QueryKey.singleTrkOpReq, trkOpReqId], () => getSingleTrkOpReq(trkOpReqId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { isLoading: isTpLoading, isError: isTpError, error: tpErr, data: trkOpData } = useQuery([QueryKey.singleTrkOp, trkOpReqData?.truckopId], () => getSingleTrkOp(trkOpReqData?.truckopId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  let trkOpFullName = capFirstLetter(trkOpData?.fName) + " " + capFirstLetter(trkOpData?.lName);



  const loadStatusArr = [
    { value: "empty", label: t("bo.editTrkOpReqPg.emp") },
    { value: "loaded", label:  t("bo.editTrkOpReqPg.load") }];


  useEffect(() => {
    if (!trkOpReqData)
      return;

    let arr = trkOpReqData?.routesArr?.map((i) => i.place);
    setRoutesArr([...arr]);
    setSelection((e) => {
      return {
        ...e,
        truckId: trkOpReqData?.truckId,
        capUnit: trkOpReqData?.capUnit,
        trkLoadStatus: trkOpReqData?.loadStatus
      }
    });
  }, [trkOpReqData]);

  useEffect(() => {
    if (!trkOpData)
      return;

    let trkDDArr = (trkOpData?.trucks || []).map((i) => {
      return { value: i.id, label: i.regNo }
    })
    setSelection((e) => { return { ...e, ddTrkArr: trkDDArr } });
  }, [trkOpData]);



  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);
    inputObject.trkOpReqId = trkOpReqData?.truckOpReqId;
    inputObject.truckopId = trkOpReqData?.truckopId;
    inputObject.routesArr = routesArr;
    inputObject.capUnit = selection.capUnit;
    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);
    console.log(errorsObj)
    if (Object.keys(errorsObj).length > 0)
      return;

    setLoadingScreen(true);

    try {
      await putTrkOpReq(inputObject);
      queryClient.invalidateQueries([QueryKey.singleTrkOpReq, trkOpReqId])
      notify("success", "Request Updated Successfully");
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

  function handleDDTruckChange(ele) {
    const { value } = ele.target;
    setSelection((e) => { return { ...e, truckId: value } });
  }

  function handleROTrkLoadStatusChange(ele) {
    const { value } = ele.target;
    setSelection((e) => { return { ...e, trkLoadStatus: value } });
  }

  function handleTgWeightUnitChange(ele, v) {
    if (v == null)
      return

    setSelection((e) => { return { ...e, capUnit: v } });
  }

  function handleRouteFieldChange(value) {
    setSelection(prevSel => { return { ...prevSel, routeTxtField: value?.place } })
  }

  function handleAddRoute() {
    if (!selection.routeTxtField)
      return;

    setRoutesArr(prevArr => [...prevArr, selection.routeTxtField]);
    setSelection(prevSel => { return { ...prevSel, routeTxtField: "" } })
  }

  function handleRouteClear(index) {
    let arr = [...routesArr];
    arr.splice(index, 1);
    setRoutesArr([...arr])
  }

  if (!trkOpReqData && trkOpReqId)
    return <h2>Invalid Truck Operator Request</h2>

  if (isError || isTpError) {
    customAlert(error || tpErr);
    return <h2>Something went wrong</h2>
  }

  if (isLoading || isTpLoading)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

  return (
    <BgBox>
      <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>
        <Stack direction={'row'} justifyContent='space-between' mt={0.5} mb={2.5} >
          <Stack direction={'row'} alignItems={"end"}>
            <Typography variant='h5' sx={{ fontWeight: "bold", mr: 1 }}>{t("bo.editTrkOpReqPg.editTrkOpReq")}</Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: 18, color: "rgba(0, 0, 0, 0.5)" }}>({trkOpFullName}) ({trkOpReqId})</Typography>
          </Stack>
        </Stack>
        <ScrollBox height={"82%"}>
          <Stack direction={"row"} >
            <Stack width={"46%"}>
              <Stack direction={"row"} marginTop={1}>
                <CustomDropDown title={t("bo.editTrkOpReqPg.selTrk")} name={"truckId"} errMsg={formErrors.truckId} handleDDChange={handleDDTruckChange} ddArr={selection.ddTrkArr} fontSize={14} height={35} defaultValue={trkOpReqData?.truckId} />
              </Stack>
              <Stack direction={"row"} marginTop={2} mb={1}>
                <CustomRadio defaultValue={trkOpReqData?.loadStatus} title={t("bo.editTrkOpReqPg.loadSts")} name={"loadStatus"} errMsg={formErrors.loadStatus} handleRadioChange={handleROTrkLoadStatusChange} radioArr={loadStatusArr} fontSize={14} />
              </Stack>
              <Stack direction={"row"} alignItems={"end"} gap={1} mt={2}>
                <FillLabelTxtField defaultValue={trkOpReqData?.addableCap} type="number" step={0.01} name="addableCap" title={t("bo.editTrkOpReqPg.addCapacity")} errMsg={formErrors.addableCap} fontSize={14} height={38}
                  endAdornment={(
                    <InputAdornment position="end">
                      <StyledToggleButtonGroup color="primary" size="small" value={selection.capUnit} exclusive onChange={handleTgWeightUnitChange} sx={{ height: 34, mt: 2 }}>
                        <ToggleButton value="ton">
                          <Typography>Ton(s)</Typography>
                        </ToggleButton>
                        <ToggleButton value="kilolitre">
                          <Typography>KL</Typography>
                        </ToggleButton>
                      </StyledToggleButtonGroup>
                    </InputAdornment>
                  )}
                />

              </Stack>
              <Stack direction={"row"} mt={2}>
                <PlaceAutofill defaultValue={trkOpReqData?.currLocation} name="currLocation" title={t("bo.editTrkOpReqPg.currLocation")} errMsg={formErrors.currLocation} fontSize={14} height={38} />
              </Stack>
              <Stack direction={"row"} mt={2}>
                <FillLabelTxtField defaultValue={trkOpReqData?.description} name="description" title={t("bo.editTrkOpReqPg.desc")} fontSize={14} multiline={true} height={103} />
              </Stack>
            </Stack>
            <Box height={430} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />
            <Stack >
              <Stack direction={"row"} mt={1}>
                <FillLabelTxtField defaultValue={trkOpReqData?.estPrice} type="number" step={0.5} name="estPrice" title={t("bo.editTrkOpReqPg.estPrice")} errMsg={formErrors.estPrice}
                  fontSize={14} height={38} startAdornment={(
                    <InputAdornment position="start">
                      <Typography name="Rs">&#8377;</Typography>
                    </InputAdornment>
                  )} />
              </Stack>
              <Stack direction={"row"} mt={3} mb={5} alignItems={"center"}>
                <PlaceAutofill name="route" title={"Route"} onSelect={handleRouteFieldChange} fontSize={14} height={38} width={400}/>
                <Button variant='text' sx={{ height: 36, mt: 2.3 }} startIcon={<AddLocationAltRounded />} color='primary' onClick={handleAddRoute}>{t("bo.editTrkOpReqPg.addRoute")}</Button>
              </Stack>
              <Typography sx={{ color: "red", fontSize: 15 }}> {formErrors.routesArr}</Typography>
              {routesArr.map((route, index) => <RouteCard route={route} index={index} key={route} handleClear={handleRouteClear}
                topLine={index === 0 ? false : true} bottomLine={routesArr.length - 1 === index ? false : true} />)}
            </Stack>

          </Stack>


        </ScrollBox>
        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("bo.editTrkOpReqPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 120, mr: 15 }}>{t("bo.editTrkOpReqPg.save")}</Button>
        </Stack>


      </form>

    </BgBox>
  )
}


export default EditTrkOpReqPage;