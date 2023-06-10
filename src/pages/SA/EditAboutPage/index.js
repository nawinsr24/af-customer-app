import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BgBox from "../../../components/BgBox";
import FillLabelTxtField from "../../../components/FillLabelTxtField";
import { customAlert, notify } from "../../../components/notify";
import ScrollBox from "../../../components/ScrollBox";
import { useAuthContext } from "../../../context/AuthContext";
import { getBoAbout, putBoAbout } from "../../../services/bo-service";
import { useTranslation } from "react-i18next";
import validate from "./validate";


function EditAboutPage() {
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState(null);
  const { t } = useTranslation();

  async function getAboutData() {
    try {
      const data = await getBoAbout();
      if (data)
        setAboutData(data);
      else
        setAboutData({
          termsAndCond: "",
          contact_no: "",
          cust_care_no: ""
        })
    } catch (err) {
      console.log(err);
      customAlert(err);
    }
  }

  useEffect(() => {
    if (!aboutData) {
      setLoadingScreen(true);
      getAboutData().then((e) => setLoadingScreen(false));
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

      await putBoAbout(inputObject);
      notify("success", "About Info Updated Successfully");
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
      {(aboutData) ? <form onSubmit={handleSubmit} noValidate style={{ padding: 0, height: "100%" }}>
        <ScrollBox>
          <Stack direction={'row'} justifyContent='space-between' my={2} >
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.editInfoPg.aboutComp")}</Typography>
          </Stack>

          <Stack direction={'row'} mt={1}>
            <Stack direction={"row"} >
              <FillLabelTxtField name="termsAndCond" title={t("sa.editInfoPg.termpol")} defaultValue={aboutData?.termsAndCond} errMsg={formErrors.termsAndCond} multiline={true} height={406} rows={16.5} width={650} />
            </Stack>
            <Box width={100} />
            <Stack gap={3} mr={10}>
              <FillLabelTxtField name="contact_no" title={t("sa.editInfoPg.conNum")} defaultValue={aboutData?.contact_no} width={400} />
              <FillLabelTxtField name="cust_care_no" title={t("sa.editInfoPg.ccNum")} defaultValue={aboutData?.cust_care_no} errMsg={formErrors.cust_care_no} width={400} />
            </Stack>
          </Stack>
        </ScrollBox>


        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("sa.editInfoPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 150, mr: 15 }}>{t("sa.editInfoPg.sChanges")}</Button>
        </Stack>

      </form> : <Typography component={'h1'}>Something went wrong</Typography>}
    </BgBox>
  )
}

export default EditAboutPage;