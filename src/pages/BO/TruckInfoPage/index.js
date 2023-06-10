import { Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IcBackBtn from "../../../assets/icons/IcBackBtn";
import BgBox from "../../../components/BgBox";
import FillLabelTxtField from "../../../components/FillLabelTxtField";
import { customAlert, notify } from "../../../components/notify";
import ScrollBox from "../../../components/ScrollBox";
import { useAuthContext } from "../../../context/AuthContext";
import { getSingleTrk, putTruck } from "../../../services/trkOp-service";
import { capFirstLetter, formatDateWithJs } from "../../../utils/format";
import expiredImg from "../../../assets/svg/expired.svg";
import { useTranslation } from "react-i18next";
import { getRcDetails } from "../../../services/serv_services";
import { useQueryClient } from "react-query";


function TruckInfoPage() {
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const { trkId } = useParams();
  const [truckData, setTruckData] = useState(null);
  const { t } = useTranslation();
  let txtFielProps = { fontSize: 14, height: 38 };
  const [trkTypeObj, setTrkTypeObj] = useState({})
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!truckData?.type)
      return;

    let obj = JSON.parse(truckData?.type);
    delete obj.c_ImgPath
    delete obj.b_Suggestions
    setTrkTypeObj(obj)
  }, [truckData?.type]);

  async function getTruckData() {
    try {
      const data = await getSingleTrk(trkId);
      data.type = data.type || "{}";
      setTruckData(data);
    } catch (err) {
      console.log(err);
      customAlert(err);
    }
  }

  useEffect(() => {
    setLoadingScreen(true);
    getTruckData().then((e) => setLoadingScreen(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  async function handleUpdateData() {
    setLoadingScreen(true);
    try {
      const res = await getRcDetails({ regNo: truckData?.regNo })
      const putData = {
        permit_type: res.permitType,
        ins_expDate: res.InsExpDate,
        fc_expDate: res.fcExpDate,
        maxCap: truckData.maxCap,
        maxCapUnit: truckData.maxCapUnit,
        type: truckData.type
      }
      await putTruck(trkId, putData);
      notify("success", "Truck Updated Successfully");
      queryClient.invalidateQueries();
      window.location.reload();
    } catch (err) {
      console.log(err);
      customAlert(err)
    }
    setLoadingScreen(false);
  };

  return (
    <Box height={"100%"} width={"100%"}>
      {truckData && <Stack direction={'row'} justifyContent='space-between' mb={2} >
        <Stack direction={'row'} alignItems="center">
          <IconButton onClick={() => navigate(-1, { replace: true })}><IcBackBtn /></IconButton>

          <Box width={10} />
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>{truckData?.regNo?.toUpperCase()}&nbsp;({JSON.parse(truckData?.type).a_Vehicle})</Typography>
        </Stack>
        <Stack direction={'row'} mr={5}>
          <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleUpdateData}>{t("bo.trkInfoPg.updData")}</Button>
          <Box width={8} />

        </Stack>
      </Stack>}
      <BgBox height={"90%"} >
        {truckData ? <form noValidate style={{ padding: 0, height: "100%" }}>
          <ScrollBox height={"100%"}>
            <Typography variant='h5' sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 22, mb: 1, mt: 0.5 }}>{t("bo.trkInfoPg.trkInfo")}</Typography>

            <Stack direction={"row"} marginTop={1}>
              <FillLabelTxtField title={t("bo.trkInfoPg.trkNum")} defaultValue={truckData?.regNo} readOnly={true} {...txtFielProps} />
            </Stack>

            <Stack direction={"row"} marginTop={3}>
              <Stack direction={"row"} sx={{ position: "relative" }}>
                <FillLabelTxtField title={t("bo.trkInfoPg.insExpDate")} defaultValue={formatDateWithJs(truckData?.ins_expDate)} readOnly={true}  {...txtFielProps} />
                {new Date(truckData?.ins_expDate) < new Date() && <Box sx={{ position: "absolute", top: -10, left: 160 }}><img src={expiredImg} alt={expiredImg} /></Box>}
              </Stack>
              <Box width={100} />
              <Stack direction={"row"} sx={{ position: "relative" }}>
                <FillLabelTxtField title={t("bo.trkInfoPg.fcExpDate")} defaultValue={formatDateWithJs(truckData?.fc_expDate)} readOnly={true}  {...txtFielProps} />
                {new Date(truckData?.fc_expDate) < new Date() && <Box sx={{ position: "absolute", top: -10, left: 110 }}><img src={expiredImg} alt={expiredImg} /></Box>}
              </Stack>
            </Stack>


            <Stack direction={"row"} marginTop={3}>
              <FillLabelTxtField title={t("bo.trkInfoPg.pType")} defaultValue={capFirstLetter(truckData?.permit_type)} readOnly={true}  {...txtFielProps} />
              <Box width={100} />
              <FillLabelTxtField title={t("bo.trkInfoPg.maxLoadCap")} defaultValue={capFirstLetter(truckData?.maxCap) + " " + capFirstLetter(truckData?.maxCapUnit) + "(s)"} readOnly={true}  {...txtFielProps} />
            </Stack>

            {(Object.keys(trkTypeObj) || []).map((key) => <Stack direction={"row"} mt={3} key={key}>
              <FillLabelTxtField title={capFirstLetter(key.split("_")[1])} defaultValue={capFirstLetter(trkTypeObj[key])} readOnly={true}  {...txtFielProps} />
            </Stack>)}

          </ScrollBox>
        </form> : <Typography component={'h1'}>Something went wrong</Typography>}
      </BgBox>
    </Box>
  )
}

export default TruckInfoPage;