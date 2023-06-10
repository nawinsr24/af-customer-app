import { Box, Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgBox from '../../../components/BgBox';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import PwdFillLabelTxtField from '../../../components/PwdFillLabelTxtField';
import ScrollBox from '../../../components/ScrollBox';
import { useAuthContext } from '../../../context/AuthContext';
import route from '../../../Routes';
import { addBo } from '../../../services/bo-service';
import validate from "./validate";
import { useTranslation } from "react-i18next";
import PlaceAutofill from '../../../components/PlaceAutofill';

function AddBoPage() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();



  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object

    console.log(inputObject);
    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);

    if (Object.keys(errorsObj).length > 0)
      return;

    setLoadingScreen(true);

    try {
      await addBo(inputObject);
      notify("success", "Back Office Created Successfully");
      navigate(route.saBoLists, { replace: true });
      setLoadingScreen(false);
    } catch (err) {
      console.log(err);
      if (err === 409)
        notify("error", "Email (Username) Already Exist");
      else
        customAlert(err);
    }
    setLoadingScreen(false);
  };

  async function handleCancel() {
    navigate(route.saBoLists, { replace: true });
  }



  return (
    <BgBox>
      <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>

        <ScrollBox>
          <Stack direction={'row'} justifyContent='space-between' my={2} >
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.addBoPg.boInfo")}</Typography>
          </Stack>

          <Stack direction={"row"} >
            <FillLabelTxtField name="bo_name" title={t("sa.addBoPg.boName")} errMsg={formErrors.bo_name} />
            <Box width={100} />
            <FillLabelTxtField name="bo_mobile" title={t("sa.addBoPg.lNum")} errMsg={formErrors.bo_mobile} />
          </Stack>
          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="bo_address" title={t("sa.addBoPg.address")} multiline={true} height={103} />
            <Box width={100} />
            {/* <FillLabelTxtField name="bo_city" title={t("sa.addBoPg.city")} errMsg={formErrors.bo_city} /> */}
            <PlaceAutofill name="bo_city" title={t("sa.addBoPg.city")} errMsg={formErrors.bo_city} />

          </Stack>

          <Stack direction={'row'} justifyContent='space-between' mb={2} mt={5}>
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.addBoPg.adminInfo")}</Typography>
          </Stack>
          <Stack direction={"row"} >
            <FillLabelTxtField name="staff_name" title={t("sa.addBoPg.aName")} errMsg={formErrors.staff_name} />
          </Stack>
          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="mobile1" title={t("sa.addBoPg.mNum1")} errMsg={formErrors.mobile1} />
            <Box width={100} />
            <FillLabelTxtField name="mobile2" title={t("sa.addBoPg.mNum2")} />
          </Stack>
          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="username" title={t("sa.addBoPg.email")} type={"email"} errMsg={formErrors.username} />
          </Stack>
          <Stack direction={"row"} marginTop={3}>
            <PwdFillLabelTxtField name="password" title={t("sa.addBoPg.pw")} errMsg={formErrors.password} />
            <Box width={100} />
            <PwdFillLabelTxtField name="c_password" title={t("sa.addBoPg.cpw")} errMsg={formErrors.c_password} />
          </Stack>
        </ScrollBox>


        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("sa.addBoPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 120, mr: 15 }}>{t("sa.addBoPg.create")}</Button>
        </Stack>

      </form>


    </BgBox>
  )
}

export default AddBoPage