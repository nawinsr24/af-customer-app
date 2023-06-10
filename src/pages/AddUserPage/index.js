import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import BgBox from "../../components/BgBox";
import FillLabelTxtField from "../../components/FillLabelTxtField";
import { customAlert, notify } from "../../components/notify";
import PwdFillLabelTxtField from "../../components/PwdFillLabelTxtField";
import ScrollBox from "../../components/ScrollBox";
import { useAuthContext } from "../../context/AuthContext";
import { getBoById, postBoUser } from "../../services/bo-service";
import validate from "./validate";
import { useTranslation } from "react-i18next";


function AddUserPage() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { boId } = Object.fromEntries([...searchParams]);
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

    console.log(inputObject);
    let errorsObj = validate(inputObject);
    setFormErrors(errorsObj);

    if (Object.keys(errorsObj).length > 0)
      return;

    setLoadingScreen(true);
    try {

      await postBoUser({ ...inputObject, backofficeId: boId });
      notify("success", "Back Office User Added Successfully");
      navigate(-1, { replace: true });
    } catch (err) {
      console.log(err);
      if (err === 409)
        notify("error", "Email (Username) Already Exist");
      else
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
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("addUserPg.addUser")}</Typography>
          </Stack>
          <Stack direction={"row"} >
            <FillLabelTxtField name="bo_name" title={t("addUserPg.boName")} errMsg={formErrors.bo_name} defaultValue={boData.bo_name} readOnly={true} />
          </Stack>

          <Stack direction={"row"} mt={2}>
            <FillLabelTxtField name="staff_name" title={t("addUserPg.sName")} errMsg={formErrors.staff_name} />
            <Box width={100} />
            <FillLabelTxtField name="Role" title={t("addUserPg.role")} defaultValue={"Staff"} readOnly={true} />
          </Stack>

          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="mobile1" title={t("addUserPg.mNum1")} errMsg={formErrors.mobile1} />
            <Box width={100} />
            <FillLabelTxtField name="mobile2" title={t("addUserPg.mNum2")} />
          </Stack>
          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="username" title={t("addUserPg.email")} type={"email"} errMsg={formErrors.username} />
          </Stack>
          <Stack direction={"row"} marginTop={3}>
            <PwdFillLabelTxtField name="password" title={t("addUserPg.pw")} errMsg={formErrors.password} />
            <Box width={100} />
            <PwdFillLabelTxtField name="c_password" title={t("addUserPg.cpw")} errMsg={formErrors.c_password} />
          </Stack>

        </ScrollBox>

        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("addUserPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 150, mr: 15 }}>{t("addUserPg.sChanges")}</Button>
        </Stack>

      </form> : <Typography component={'h1'}>Something went wrong</Typography>}
    </BgBox>
  )
}

export default AddUserPage;