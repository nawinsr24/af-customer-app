import { Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BgBox from "../../components/BgBox";
import ChangePwdPopUp from "../../components/ChangePwdPopUp";
import FillLabelTxtField from "../../components/FillLabelTxtField";
import { customAlert } from "../../components/notify";
import ScrollBox from "../../components/ScrollBox";
import { useAuthContext } from "../../context/AuthContext";
import route from "../../Routes";
import { getStaffById } from "../../services/bo-service";
import IcBackBtn from '../../assets/icons/IcBackBtn';
import { useTranslation } from "react-i18next";

function UserInfoPage() {
  const { setLoadingScreen, ctxtUser } = useAuthContext();
  const navigate = useNavigate();
  const { staffId } = useParams();
  const [staffData, setStaffData] = useState(null);
  const [modalOpen, setmodalOpen] = useState(false);
  const { t } = useTranslation();
  const handleModalClose = () => setmodalOpen(false);
  const handleModalOpen = () => setmodalOpen(true);

  async function getStaffData() {
    try {
      const data = await getStaffById(staffId);
      setStaffData(data);
    } catch (err) {
      console.log(err);
      customAlert(err);
    }
  }

  useEffect(() => {
    if (!staffData) {
      setLoadingScreen(true);
      getStaffData().then((e) => setLoadingScreen(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  async function handleEdit() {
    navigate(route.editUser + staffId, { state: { staffData: staffData } });
  }


  return (
    <BgBox>
      {staffData ? <form noValidate style={{ padding: 0, height: "100%" }}>
        <ScrollBox>
          <Stack direction={'row'} justifyContent='space-between' my={2} >
            <Stack direction={'row'} alignItems="center">
              <IconButton onClick={() => navigate(-1, { replace: true })}><IcBackBtn /></IconButton>

              <Box width={10} />
              <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("userInfoPg.userInfo")}</Typography>
            </Stack>
            <Stack direction={'row'} mr={14} display={ctxtUser.type === 'staff' && "none"}>
              <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleEdit}> {t("userInfoPg.editInfo")}</Button>
              <Box width={8} />
              <Button variant='contained' color='primary' sx={{ height: 35 }} onClick={handleModalOpen}> {t("userInfoPg.changePw")}</Button>
            </Stack>
          </Stack>

          <Stack direction={"row"} marginTop={1}>
            <FillLabelTxtField name="bo_name" title={t("userInfoPg.boName")} defaultValue={staffData?.bo_name} readOnly={true} />
          </Stack>


          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="staff_name" title={t("userInfoPg.sName")} defaultValue={staffData?.staff_name} readOnly={true} />
          </Stack>

          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="username" title={t("userInfoPg.email")} type={"email"} defaultValue={staffData?.username} readOnly={true} />
            <Box width={100} />
            <FillLabelTxtField name="role" title={t("userInfoPg.role")} defaultValue={staffData?.role} readOnly={true} />
          </Stack>

          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="mobile1" title={t("userInfoPg.mNum1")} defaultValue={staffData?.mobile1} readOnly={true} />
            <Box width={100} />
            <FillLabelTxtField name="mobile2" title={t("userInfoPg.mNum2")} defaultValue={staffData?.mobile2} readOnly={true} />
          </Stack>
        </ScrollBox>
      </form> : <Typography component={'h1'}>Something went wrong</Typography>}

      {staffData && <ChangePwdPopUp modalOpen={modalOpen} handleModalClose={handleModalClose} userId={staffData.staffId} />}
    </BgBox>
  )
}

export default UserInfoPage;