import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import { getSingleCust, putCust } from '../../../services/cust-service';
import BgBox from '../../../components/BgBox';
import ScrollBox from '../../../components/ScrollBox';
import { Box, Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import CustomRadio from '../../../components/CustomRadio';
import validate from './validate';
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";


function EditCustPage() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { custId } = useParams();
  const [custData, setCustData] = useState(location.state?.custData || null);
  const { t } = useTranslation();


  const radioArr = [
    { value: "individual", label: t("bo.editCustInfoPg.individual") },
    { value: "company", label: t("bo.editCustInfoPg.comp") }];



  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object


    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);
    console.log(errorsObj);

    if (Object.keys(errorsObj).length > 0)
      return;


    setLoadingScreen(true);


    try {
      await putCust(custId, inputObject);
      notify("success", "Customer Edited Successfully");
      navigate(-1, { replace: true });
      setLoadingScreen(false);
    } catch (err) {
      console.log(err);
      if (err === 409)
        notify("error", "Mobile Number 1 (Username) Already Exist");
      else
        customAlert(err);
    }
    setLoadingScreen(false);
  };

  async function handleCancel() {
    navigate(-1, { replace: true });
  }



  async function getData() {
    try {
      const data = await getSingleCust(custId);
      console.log("aa-------------------------", data);
      setCustData(data);
    } catch (err) {
      console.log(err);
      customAlert(err);
    }
  }

  useEffect(() => {
    console.log(custData, custId);
    if (!custData) {
      setLoadingScreen(true);
      getData().then((e) => {
        setLoadingScreen(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BgBox>
      {custData ? <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>

        <ScrollBox>
          <Stack direction={'row'} justifyContent='space-between' my={2} >
            <Typography variant='h5' sx={{ fontWeight: "bold" }}> {t("bo.editCustInfoPg.editCust")}</Typography>
          </Stack>

          <Stack direction={"row"} >
            <FillLabelTxtField name="fName" title={t("bo.editCustInfoPg.fName")} errMsg={formErrors.fName} defaultValue={custData?.fName} />
            <Box width={100} />
            <FillLabelTxtField name="lName" title={t("bo.editCustInfoPg.lName")} defaultValue={custData?.lName} />
          </Stack>

          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="mobile1" title={t("bo.editCustInfoPg.mName1")} readOnly={true} errMsg={formErrors.mobile1} defaultValue={custData?.username} />
            <Box width={100} />
            <FillLabelTxtField name="mobile2" title={t("bo.editCustInfoPg.mName2")} defaultValue={custData?.mobile2} />
          </Stack>

          <Stack direction={"row"} marginTop={3} mb={3}>
            <FillLabelTxtField name="email" title={t("bo.editCustInfoPg.email")} errMsg={formErrors.email} defaultValue={custData?.email} />
          </Stack>




          <CustomRadio title={t("bo.editCustInfoPg.selType")} name={"type"} errMsg={formErrors.type} defaultValue={custData?.type} disabled={true} radioArr={radioArr} />



          {custData?.aadhar_no && <FillLabelTxtField name="aadhar_no" readOnly={true} title={t("bo.editCustInfoPg.aadhaarNum")} errMsg={formErrors.aadhar_no} defaultValue={custData?.aadhar_no} />}
          {custData?.pan_no && <FillLabelTxtField name="pan_no" readOnly={true} title={t("bo.editCustInfoPg.panNum")} errMsg={formErrors.pan_no} defaultValue={custData?.pan_no} />}

          {custData?.type === 'company' && <div>
            <Stack direction={"row"} marginTop={3}>
              <FillLabelTxtField name="comName" title={t("bo.editCustInfoPg.cName")} errMsg={formErrors.comName} defaultValue={custData?.comName} />
            </Stack>
            <Stack direction={"row"} marginTop={3}>
              <FillLabelTxtField name="comContact_no" title={t("bo.editCustInfoPg.cContactNum")} defaultValue={custData?.comContact_no} />
              <Box width={100} />
              <FillLabelTxtField name="comAddress" title={t("bo.editCustInfoPg.cAddress")} multiline={true} height={103} defaultValue={custData?.comAddress} />
            </Stack>
            <Stack direction={"row"} marginTop={3} mb={5}>
              <FillLabelTxtField name="gst_no" readOnly={true} title={t("bo.editCustInfoPg.gstNum")} errMsg={formErrors.gst_no} defaultValue={custData?.gst_no} />
              <Box width={100} />
              <FillLabelTxtField name="comDescription" title={t("bo.editCustInfoPg.cDesc")} multiline={true} height={103} defaultValue={custData?.comDescription} />
            </Stack>
          </div>}
        </ScrollBox>




        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("bo.editCustInfoPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 120, mr: 15 }}>{t("bo.editCustInfoPg.sChanges")}</Button>
        </Stack>

      </form> : <Typography component={'h1'}>Something went wrong</Typography>}


    </BgBox>
  )
}

export default EditCustPage