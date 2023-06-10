import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BgBox from "../../components/BgBox";
import FillLabelTxtField from "../../components/FillLabelTxtField";
import { customAlert, notify } from "../../components/notify";
import ScrollBox from "../../components/ScrollBox";
import { useAuthContext } from "../../context/AuthContext";
import { getStaffById, putBoStaff } from "../../services/bo-service";
import validate from "./validate";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import QueryKey from "../../QueryKey";
import LoadingScreen from "../../components/loadingScreen";

function EditUserPage() {
  const queryClient = useQueryClient();
  const [formErrors, setFormErrors] = useState({});
  const { setLoadingScreen } = useAuthContext();
  const navigate = useNavigate();
  const { staffId } = useParams();
  const { t } = useTranslation();
  const { isLoading, isError, error, data: staffData } = useQuery([QueryKey.boUser, parseInt(staffId)], () => getStaffById(staffId))




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
      const putData = {
        staff_name: inputObject.staff_name,
        mobile1: inputObject.mobile1,
        mobile2: inputObject.mobile2,
        roleId: staffData.roleId
      }
      await putBoStaff(staffData?.staffId, putData);
      queryClient.invalidateQueries([QueryKey.boUser, parseInt(staffId)]);
      notify("success", "Back Office User Updated Successfully");
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


  if (isError) {
    customAlert(error);
    return <h2>Something went wrong</h2>
  }

  if (isLoading)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

  return (
    <BgBox>
      {staffData ? <form onSubmit={handleSubmit} noValidate style={{ padding: 0, height: "100%" }}>
        <ScrollBox>
          <Stack direction={'row'} justifyContent='space-between' mt={2} mb={3}>
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("userInfoPg.editUserInfo")}</Typography>
          </Stack>
          <Stack direction={"row"} >
            <FillLabelTxtField name="bo_name" title={t("userInfoPg.boName")} errMsg={formErrors.bo_name} defaultValue={staffData?.bo_name} readOnly={true} />
          </Stack>

          <Stack direction={"row"} mt={2}>
            <FillLabelTxtField name="username" title={t("userInfoPg.email")} type={"email"} errMsg={formErrors.username} defaultValue={staffData?.username} readOnly={true} />
            <Box width={100} />
            <FillLabelTxtField name="role" title={t("userInfoPg.role")} defaultValue={staffData?.role} readOnly={true} />
          </Stack>

          <Stack direction={"row"} mt={2}>
            <FillLabelTxtField name="staff_name" title={t("userInfoPg.sName")} errMsg={formErrors.staff_name} defaultValue={staffData?.staff_name} />
          </Stack>

          <Stack direction={"row"} marginTop={3}>
            <FillLabelTxtField name="mobile1" title={t("userInfoPg.mNum1")} errMsg={formErrors.mobile1} defaultValue={staffData?.mobile1} />
            <Box width={100} />
            <FillLabelTxtField name="mobile2" title={t("userInfoPg.mNum2")} defaultValue={staffData?.mobile2} />
          </Stack>

        </ScrollBox>


        <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
          <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleCancel}>{t("userInfoPg.cancel")}</Button>
          <Button variant="contained" type='submit' sx={{ height: 40, width: 150, mr: 15 }}>{t("userInfoPg.sChanges")}</Button>
        </Stack>

      </form> : <Typography component={'h1'}>Something went wrong</Typography>}
    </BgBox>
  )
}

export default EditUserPage;