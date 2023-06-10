import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { postCust } from '../../../services/cust-service';
import route from '../../../Routes';
import BgBox from '../../../components/BgBox';
import ScrollBox from '../../../components/ScrollBox';
import { Box, Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import PwdFillLabelTxtField from '../../../components/PwdFillLabelTxtField';
import CustomRadio from '../../../components/CustomRadio';
import CustomDropDown from '../../../components/CustomDropDown';
import validate from './validate';
import { useTranslation } from "react-i18next"; //rithika


function AddCustPage() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const [selection, setSelection] = useState({ custType: null, dop: null });
  const { t } = useTranslation(); 


  const radioArr = [
    { value: "individual", label: t("bo.addCusPg.individual") },
    { value: "company", label: t("bo.addCusPg.comp") }];

  const ddArr = [
    { value: "aadhaar", label: t("bo.addCusPg.aadhaarNum") },
    { value: "pan", label: t("bo.addCusPg.panNum") }];

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
      await postCust(inputObject);
      notify("success", "Customer Created Successfully");
      navigate(route.saBoLists, { replace: true });
      setLoadingScreen(false);
    } catch (err) {
      console.log(err);
      if (err === 409)
        notify("error", "Mobile Number 1 (Username) Already Exist");
      else
        customAlert(err)
    }
    setLoadingScreen(false);
  };

  async function handleCancel() {
    navigate(-1, { replace: true });
  }

  function handleRadioChange(e) {
    const { value } = e.target;
    setSelection((e) => { return { custType: value, dop: null } });

  }

  function handleDDChange(e) {
    const { value } = e.target;
    setSelection((e) => { return { ...e, dop: value } });
  }


  return (
    <BgBox>
      <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>

        <ScrollBox>
          <Stack direction={'row'} justifyContent='space-between' my={2} >
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.addCusPg.dCust")}</Typography>
          </Stack>

          <Stack direction={"row"} >
            <FillLabelTxtField name="fName" title={t("bo.addCusPg.fName")} errMsg={formErrors.fName} />
            <Box width={100} />
            <FillLabelTxtField name="lName" title={t("bo.addCusPg.lName")} />
          </Stack>

          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="mobile1" title={t("bo.addCusPg.mName1")} errMsg={formErrors.mobile1} />
            <Box width={100} />
            <FillLabelTxtField name="mobile2" title={t("bo.addCusPg.mName2")} />
          </Stack>

          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="email" title={t("bo.addCusPg.email")} errMsg={formErrors.email} />
          </Stack>



          <Stack direction={"row"} marginTop={3} mb={3}>
            <PwdFillLabelTxtField name="password" title={t("bo.addCusPg.pw")} errMsg={formErrors.password} />
            <Box width={100} />
            <PwdFillLabelTxtField name="c_password" title={t("bo.addCusPg.cpw")} errMsg={formErrors.c_password} />
          </Stack>

          <CustomRadio title={t("bo.addCusPg.sType")} name={"type"} errMsg={formErrors.type} handleRadioChange={handleRadioChange} radioArr={radioArr} />


          {selection.custType === 'individual' && <Stack direction={"row"} marginTop={3} mb={3}>
            <CustomDropDown title={t("bo.addCusPg.sDoc")} name={"pod"} errMsg={formErrors.pod} handleDDChange={handleDDChange} ddArr={ddArr} />
          </Stack>}
          {selection.dop === "aadhaar" && <FillLabelTxtField name="aadhar_no" title={t("bo.addCusPg.rAadhaarNum")} errMsg={formErrors.aadhar_no} />}
          {selection.dop === "pan" && <FillLabelTxtField name="pan_no" title={t("bo.addCusPg.rPanNum")} errMsg={formErrors.pan_no} />}

          {selection.custType === 'company' && <div>
            <Stack direction={"row"} marginTop={3}>
              <FillLabelTxtField name="comName" title={t("bo.addCusPg.cName")} errMsg={formErrors.comName} />
            </Stack>
            <Stack direction={"row"} marginTop={3}>
              <FillLabelTxtField name="comContact_no" title={t("bo.addCusPg.cContactNum")} />
              <Box width={100} />
              <FillLabelTxtField name="comAddress" title={t("bo.addCusPg.cAddress")} multiline={true} height={103} />
            </Stack>
            <Stack direction={"row"} marginTop={3} mb={5}>
              <FillLabelTxtField name="gst_no" title={t("bo.addCusPg.gstNum")} errMsg={formErrors.gst_no} />
              <Box width={100} />
              <FillLabelTxtField name="comDescription" title={t("bo.addCusPg.cDesc")} multiline={true} height={103} />
            </Stack>
          </div>}
        </ScrollBox>




        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("bo.addCusPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 120, mr: 15 }}>{t("bo.addCusPg.create")}</Button>
        </Stack>

      </form>


    </BgBox>
  )
}

export default AddCustPage