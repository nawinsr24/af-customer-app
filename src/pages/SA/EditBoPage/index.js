import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BgBox from '../../../components/BgBox';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import ScrollBox from '../../../components/ScrollBox';
import { useAuthContext } from '../../../context/AuthContext';
import { getBoById, putBo } from '../../../services/bo-service';
import validate from "./validate";
import { useTranslation } from "react-i18next";
import PlaceAutofill from '../../../components/PlaceAutofill';

function EditBoPage() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { boId } = useParams();
  const [boData, setBoData] = useState(location.state?.boData || null);
  const { t } = useTranslation();

  async function getBoData() {
    try {
      const data = await getBoById(boId);
      setBoData(data);
    } catch (err) {
      console.log(err);
      customAlert(err);
    }
  }

  useEffect(() => {
    console.log(boData, boId);
    if (!boData) {
      setLoadingScreen(true);
      getBoData().then((e) => setLoadingScreen(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      await putBo(boData?.id, inputObject);
      notify("success", "Back Office Edited Successfully");
      navigate(-1, { replace: true });
    } catch (err) {
      console.log(err);
      customAlert(err);
    }
    setLoadingScreen(false)
  }

  async function handleCancel() {
    navigate(-1, { replace: true });
  }

  return (
    <BgBox>
      {boData ? <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>
        <ScrollBox>
          <Stack direction={'row'} justifyContent='space-between' mt={2} mb={3}>
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.editBoInfoPg.editBoInfo")}</Typography>
          </Stack>
          <Stack direction={"row"} >
            <FillLabelTxtField name="bo_name" title={t("sa.editBoInfoPg.boName")} errMsg={formErrors.bo_name} defaultValue={boData?.bo_name} />
          </Stack>
          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="bo_mobile" title={t("sa.editBoInfoPg.lNum")} errMsg={formErrors.bo_mobile} defaultValue={boData?.bo_mobile} />
          </Stack>
          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="bo_address" title={t("sa.editBoInfoPg.address")} multiline={true} height={103} defaultValue={boData?.bo_address} />
            <Box width={100} />
            {/* <FillLabelTxtField name="bo_city" title={t("sa.editBoInfoPg.city")} errMsg={formErrors.bo_city} defaultValue={boData?.bo_city} /> */}
            <PlaceAutofill name="bo_city" title={t("sa.editBoInfoPg.city")} errMsg={formErrors.bo_city} defaultValue={boData?.bo_city} />
          </Stack>
        </ScrollBox>


        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("sa.editBoInfoPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 150, mr: 15 }}>{t("sa.editBoInfoPg.sChanges")}</Button>
        </Stack>

      </form> : <Typography component={'h1'}>Something went wrong</Typography>}
    </BgBox>
  )
}

export default EditBoPage;