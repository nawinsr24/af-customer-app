import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BgBox from "../../../components/BgBox";
import FillLabelTxtField from "../../../components/FillLabelTxtField";
import { customAlert } from "../../../components/notify";
import ScrollBox from "../../../components/ScrollBox";
import { useAuthContext } from "../../../context/AuthContext";
import route from "../../../Routes";
import { getBoAbout } from "../../../services/bo-service";
import { useTranslation } from "react-i18next";


function AboutInfoPage() {
  const { setLoadingScreen, ctxtUser } = useAuthContext();
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


  async function handleEdit() {
    navigate(route.editAbout, { state: { aboutData: aboutData } });
  }


  return (
    <BgBox>
      {(aboutData) ? <form noValidate style={{ padding: 0, height: "100%" }}>
        <ScrollBox height={"98%"}>
          <Stack direction={'row'} justifyContent='space-between' my={2} >
            <Stack direction={'row'} alignItems="center">
              <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.infoPg.aboutComp")}</Typography>
            </Stack>
            <Stack direction={'row'} mr={10} display={ctxtUser.type === 'staff' && "none"}>
              <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleEdit}> {t("sa.infoPg.editInfo")}</Button>
            </Stack>
          </Stack>

          <Stack direction={'row'} mt={1}>
            <Stack direction={"row"} >
              <FillLabelTxtField name="termsAndCond" title={t("sa.infoPg.termpol")} defaultValue={aboutData?.termsAndCond} readOnly={true} multiline={true} height={448} rows={19} width={650} />
            </Stack>
            <Box width={100} />
            <Stack gap={3} mr={10}>
              <FillLabelTxtField name="contact_no" title={t("sa.infoPg.conNum")} defaultValue={aboutData?.contact_no} readOnly={true} width={400} />
              <FillLabelTxtField name="cust_care_no" title={t("sa.infoPg.ccNum")} defaultValue={aboutData?.cust_care_no} readOnly={true} width={400} />
            </Stack>
          </Stack>


        </ScrollBox>
      </form> : <Typography component={'h1'}>Something went wrong</Typography>}
    </BgBox>
  )
}

export default AboutInfoPage;