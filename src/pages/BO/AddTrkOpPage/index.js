import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customAlert, notify } from '../../../components/notify';
import { useAuthContext } from '../../../context/AuthContext';
import BgBox from '../../../components/BgBox';
import ScrollBox from '../../../components/ScrollBox';
import { Box, Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import validate from './validate';
import { useTranslation } from "react-i18next";
import { createTrkOp } from '../../../services/trkOp-service';
import PwdFillLabelTxtField from '../../../components/PwdFillLabelTxtField';



function AddTrkOpPage() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  let txtFielProps = { fontSize: 15, height: 38 };

  
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
      await createTrkOp(inputObject);
      notify("success", "Truck Operator Created Successfully");
      navigate(-1, { replace: true });
      setLoadingScreen(false);
    } catch (err) {
      console.log(err);
      if (err === 409)
        notify("error", "Mobile Number-1 (Username) Already Exist");
      else
        customAlert(err)
    }
    setLoadingScreen(false);
  };

  async function handleCancel() {
    navigate(-1, { replace: true });
  }

  return (
    <BgBox>
      <form onSubmit={handleSubmit} noValidate id='addBo' style={{ padding: 0, height: "100%" }}>
        <ScrollBox>
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.addTrkOpPg.trkOp")}</Typography>

          <Stack direction={"row"} mt={4}>
            <Stack gap={3}>
              <Stack direction={"row"} alignItems="center" gap={2}>
                <FillLabelTxtField name="fName" title={t("bo.addTrkOpPg.fName")} errMsg={formErrors.fName} {...txtFielProps} width={241} />
                <FillLabelTxtField name="lName" title={t("bo.addTrkOpPg.lName")} errMsg={formErrors.lName} {...txtFielProps} width={241} />
              </Stack>
              <FillLabelTxtField name="mobile1" title={t("bo.addTrkOpPg.mNum1")} errMsg={formErrors.mobile1} {...txtFielProps} />
              <FillLabelTxtField name="mobile2" title={t("bo.addTrkOpPg.mNum2")} errMsg={formErrors.mobile2} {...txtFielProps} />
              <FillLabelTxtField name="email" title={t("bo.addTrkOpPg.email")} errMsg={formErrors.email} {...txtFielProps} />
              <FillLabelTxtField name="pan_no" title={t("bo.addTrkOpPg.panNum")} errMsg={formErrors.pan_no} {...txtFielProps} />
              <FillLabelTxtField name="gst_no" title={t("bo.addTrkOpPg.gstNum")} errMsg={formErrors.gst_no} {...txtFielProps} />
            </Stack>

            <Box height={600} width={2} bgcolor={"rgba(131, 146, 171, 0.1)"} borderRadius={10} mr={8} ml={1} />

            <Stack gap={3}>
              <FillLabelTxtField name="comName" title={t("bo.addTrkOpPg.cName")} errMsg={formErrors.comName} {...txtFielProps} />
              <FillLabelTxtField name="comAddress" title={t("bo.addTrkOpPg.cAddress")} multiline={true} {...txtFielProps} height={103} />
              <FillLabelTxtField type="number" step={1} name="trucks_owned" title={t("bo.addTrkOpPg.trkOwn")} errMsg={formErrors.trucks_owned} {...txtFielProps} />
              <PwdFillLabelTxtField name="password" title={t("bo.addTrkOpPg.pw")} errMsg={formErrors.password}  {...txtFielProps} />
              <PwdFillLabelTxtField name="c_password" title={t("bo.addTrkOpPg.cpw")} errMsg={formErrors.c_password}  {...txtFielProps} />
            </Stack>
          </Stack>
        </ScrollBox>
        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("bo.addTrkOpPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 120, mr: 15 }}>{t("bo.addTrkOpPg.create")}</Button>
        </Stack>
      </form>
    </BgBox>
  )
}

export default AddTrkOpPage