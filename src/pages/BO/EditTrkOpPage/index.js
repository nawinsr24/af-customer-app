import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import BgBox from '../../../components/BgBox';
import ScrollBox from '../../../components/ScrollBox';
import { Box, Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import validate from './validate';
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from 'react-query';
import QueryKey from '../../../QueryKey';
import { getSingleTrkOp, putTrkOp } from '../../../services/trkOp-service';
import LoadingScreen from '../../../components/loadingScreen';


function EditTrkOpPage() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const { trkOpId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  let txtFielProps = { fontSize: 15, height: 38 };
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data: trkOpData } = useQuery([QueryKey.singleTrkOp, trkOpId], () => getSingleTrkOp(trkOpId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });



  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);

    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);

    console.log(JSON.stringify(inputObject))

    if (Object.keys(errorsObj).length > 0)
      return;

    setLoadingScreen(true);
    try {
      await putTrkOp(trkOpId, inputObject);
      notify("success", "Truck Operator Updated Successfully");
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
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.editTrkOpPg.editTrkOp")}</Typography>

          <Stack direction={"row"} mt={4}>
            <Stack gap={3}>
              <Stack direction={"row"} alignItems="center" gap={2}>
                <FillLabelTxtField defaultValue={trkOpData?.fName} name="fName" title={t("bo.editTrkOpPg.fName")} errMsg={formErrors.fName} {...txtFielProps} width={241} />
                <FillLabelTxtField defaultValue={trkOpData?.lName} name="lName" title={t("bo.editTrkOpPg.lName")} errMsg={formErrors.lName} {...txtFielProps} width={241} />
              </Stack>
              <FillLabelTxtField defaultValue={trkOpData?.username} name="mobile1" title={t("bo.editTrkOpPg.mNum1")} errMsg={formErrors.mobile1} {...txtFielProps} readOnly />
              <FillLabelTxtField defaultValue={trkOpData?.mobile2} name="mobile2" title={t("bo.editTrkOpPg.mNum2")} errMsg={formErrors.mobile2} {...txtFielProps} />
              <FillLabelTxtField defaultValue={trkOpData?.email} name="email" title={t("bo.editTrkOpPg.email")} errMsg={formErrors.email} {...txtFielProps} />
            </Stack>

            <Box height={600} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={3}>
              <FillLabelTxtField defaultValue={trkOpData?.comName} name="comName" title={t("bo.editTrkOpPg.cName")} errMsg={formErrors.comName} {...txtFielProps} />
              <FillLabelTxtField defaultValue={trkOpData?.comAddress} name="comAddress" title={t("bo.editTrkOpPg.cAddress")} multiline={true} {...txtFielProps} height={103} />
              <FillLabelTxtField defaultValue={trkOpData?.trucks_owned} type="number" step={1} name="trucks_owned" title={t("bo.editTrkOpPg.trkOwn")} errMsg={formErrors.trucks_owned} {...txtFielProps} />
            </Stack>
          </Stack>
        </ScrollBox>
        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("bo.editTrkOpPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 120, mr: 15 }}>{t("bo.editTrkOpPg.submit")}</Button>
        </Stack>
      </form>
    </BgBox>
  )
}

export default EditTrkOpPage