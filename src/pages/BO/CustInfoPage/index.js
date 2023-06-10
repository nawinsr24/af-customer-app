import { Button, Stack, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ScrollBox from '../../../components/ScrollBox';
import complShipmtCount from '../../../assets/svg/complShipmtCount.svg';
import CountCard from '../../../components/CountCard';
import currShipmtCount from '../../../assets/svg/currShipmtCount.svg';
import { ArrowForward } from '@mui/icons-material';
import CustReqCard from '../../../components/CustReqCard';
import Slider from "react-slick";
import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { customAlert } from '../../../components/notify';
import { useEffect } from 'react';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import CustomRadio from '../../../components/CustomRadio';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleCust } from '../../../services/cust-service';
import route from '../../../Routes';
import ChangePwdPopUp from '../../../components/ChangePwdPopUp';
import { capFirstLetter } from '../../../utils/format';
import currCustReqImg from '../../../assets/svg/currCustReq.svg';
import notVerifiedImg from '../../../assets/svg/notVerified.svg';
import totalReqImg from '../../../assets/svg/totalReq.svg';
import verifiedImg from '../../../assets/svg/verified.svg';
import ShipmtCard from '../../../components/ShipmtCard';
import { useTranslation } from "react-i18next";
import ReqGroup from '../../../components/combineGrp/ReqGrp';
import ShipmtGrp from '../../../components/combineGrp/ShipmtGrp';
import FillLabelTxtFieldVfy from '../../../components/FillLabelTxtFieldVfy';
import VerifyAadhaar from '../../../components/VerifyAadhaar';


function CustInfoPage() {
  const { setLoadingScreen } = useAuthContext();
  const isLarge = useMediaQuery("(min-width: 600px)");
  const { custId } = useParams();
  const [custData, setCustData] = useState(null);
  const navigate = useNavigate();
  const [modalOpen, setmodalOpen] = useState(false);
  const handleModalClose = () => setmodalOpen(false);
  const handleModalOpen = () => setmodalOpen(true);
  const { t } = useTranslation();

  const [adrVfyMdl, setAdrVfyMdl] = useState(false);
  const handleAdrVfyMdlMdlClose = () => {
    setAdrVfyMdl(false);
    getData();
  };
  const handleAdrVfyMdlMdlOpen = () => setAdrVfyMdl(true);


  async function getData() {
    try {
      const custData = await getSingleCust(custId);

      setCustData(custData);

    } catch (err) {
      console.log(err);
      customAlert(err);
    }
  }

  useEffect(() => {
    setLoadingScreen(true);
    getData().then((e) => {
      setLoadingScreen(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  const radioArr = [
    { value: "individual", label: t("bo.custInfoPg.individual") },
    { value: "company", label: t("bo.custInfoPg.comp") }];

  async function handleEdit() {
    navigate(route.boEditCust + custData.custId, { state: { custData: custData } });
  }

  function verified() {
    if (custData.aadhar_verified === 1 || custData.pan_verified === 1 || custData.gst_verified === 1)
      return <img src={verifiedImg} alt="verifiedImg" />
    else
      return <Stack direction={'row'} alignItems={"center"}>
        <img src={notVerifiedImg} alt="notVerifiedImg" />
        <Typography sx={{ color: "#EB9A55", fontSize: 14, fontWeight: 500, ml: 0.3 }}>Need Verification</Typography>
      </Stack>
  }



  return (
    <>
      {custData ? <ScrollBox height={"100%"}>
        <Stack direction={'row'} justifyContent='space-between' mt={1.6} mb={1.3} >
          <Stack direction={'row'} alignItems={"center"}>
            <Typography variant='h5' sx={{ fontWeight: "bold", mr: 1 }}>{capFirstLetter(custData?.fName) + " " + capFirstLetter(custData?.lName)}{t("bo.custInfoPg.cust")}</Typography>
            {verified()}
          </Stack>
          <Stack direction={'row'} mr={5}>
            <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleEdit}> {t("bo.custInfoPg.editInfo")}</Button>
            <Box width={8} />
            <Button variant='contained' color='primary' sx={{ height: 35 }} onClick={handleModalOpen}>{t("bo.custInfoPg.changePw")}</Button>
          </Stack>
        </Stack>

        <Stack direction={'row'} justifyContent={"space-between"} mb={2}>
          <CountCard imgPath={currCustReqImg} title={t("bo.custInfoPg.currReqCount")} count={custData?.currReq?.length || 0} />
          <CountCard imgPath={totalReqImg} title={t("bo.custInfoPg.totReqCount")} count={custData?.totalReqs} />
          <CountCard imgPath={currShipmtCount} title={t("bo.custInfoPg.currShpCount")} count={custData?.currShipmt?.length || 0} />
          <CountCard imgPath={complShipmtCount} title={t("bo.custInfoPg.complShpCount")} count={custData.completedShipmts} />
        </Stack>

        <Stack direction={isLarge ? 'row' : "column"} alignItems={''} sx={{ mb: 2 }} >
          <Box py={2} pl={5} mr={2} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: "100%", border: 1, borderColor: '#E3E3E3', width: isLarge ? "46%" : "52%     " }}>
            <Typography variant='h5' sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 22, mb: 2, mt: 0.5 }}>{t("bo.custInfoPg.perInfo")}</Typography>
            <Stack gap={3} mt={1}>
              <FillLabelTxtField title={t("bo.custInfoPg.fName")} defaultValue={custData?.fName} readOnly={true} />
              <FillLabelTxtField title={t("bo.custInfoPg.lName")} defaultValue={custData?.lName} readOnly={true} />
              <FillLabelTxtField title={t("bo.custInfoPg.mName1")} defaultValue={custData?.username} readOnly={true} />
              <FillLabelTxtField title={t("bo.custInfoPg.mName2")} defaultValue={custData?.mobile2} readOnly={true} />
              <FillLabelTxtField title={t("bo.custInfoPg.email")} defaultValue={custData?.email} readOnly={true} />
              {custData?.type === 'company' && <FillLabelTxtFieldVfy status={custData?.gst_verified} name="gst_no" readOnly={true} title={t("bo.custInfoPg.gstNum")} defaultValue={custData?.gst_no} />}
              <Box height={10} />
            </Stack>
          </Box>

          <Box py={2} pl={10} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: "100%", border: 1, borderColor: '#E3E3E3', width: "52%" }}>
            <Typography variant='h5' sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 22, mb: 2, mt: 0.5 }}>{t("bo.custInfoPg.addiInfo")}</Typography>
            <Stack gap={3} mt={1}>
              <CustomRadio title={t("bo.custInfoPg.selType")} name={"type"} defaultValue={custData?.type} disabled={true} radioArr={radioArr} />
              {custData?.aadhar_no && <FillLabelTxtFieldVfy onVerifyClick={handleAdrVfyMdlMdlOpen} status={custData?.aadhar_verified} title={t("bo.custInfoPg.aadhaarNum")} defaultValue={custData?.aadhar_no} readOnly={true} />}
              {custData?.pan_no && <FillLabelTxtFieldVfy status={custData?.pan_verified} title={t("bo.custInfoPg.panNum")} defaultValue={custData?.pan_no} readOnly={true} />}

              {custData?.type === 'company' && <Stack gap={3}>
                <FillLabelTxtField name="comName" title={t("bo.custInfoPg.cName")} defaultValue={custData?.comName} readOnly={true} />
                <FillLabelTxtField name="comContact_no" title={t("bo.custInfoPg.cContactNum")} defaultValue={custData?.comContact_no} readOnly={true} />
                <FillLabelTxtField name="comAddress" title={t("bo.custInfoPg.cAddress")} multiline={true} height={103} defaultValue={custData?.comAddress} readOnly={true} />
                <FillLabelTxtField name="comDescription" title={t("bo.custInfoPg.cDesc")} multiline={true} height={103} defaultValue={custData?.comDescription} readOnly={true} />
              </Stack>}
              {/* <FillLabelTxtField title={"First Name"} defaultValue={custData?.staff_name} readOnly={true} /> */}
              <Box height={10} />
            </Stack>
          </Box>
        </Stack>

        <Stack direction={isLarge ? 'row' : "column"} alignItems={''} sx={{ height: custData?.type === 'company' ? "120%" : "100%", mb: 2 }} >
          <ReqGroup custId={custId} />

          <ShipmtGrp custId={custId} />
        </Stack>

        <Stack direction={'row'} justifyContent='space-between' mb={1}>
          <Typography sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 22 }}>{t("bo.custInfoPg.currReq")}</Typography>
          <Button color="secondary" endIcon={<ArrowForward />} sx={{ mr: 2 }}> {t("bo.custInfoPg.viewAll")}</Button>
        </Stack>
        {custData?.currReq?.length > 0 ? <Slider {...settings}>
          {custData?.currReq?.map((i) => <CustReqCard key={i.id} i={i} />)}
        </Slider> :
          <Typography sx={{ textAlign: "center" }}>{t("bo.custInfoPg.empList")}</Typography>}

        <Stack direction={'row'} justifyContent='space-between' mt={2} mb={1}>
          <Typography sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 22 }}>{t("bo.custInfoPg.currShp")}</Typography>
          <Button color="secondary" endIcon={<ArrowForward />} sx={{ mr: 2 }}>{t("bo.custInfoPg.viewAll")}</Button>
        </Stack>

        {custData?.currShipmt?.length > 0 ? <Slider {...settings}>
          {custData?.currShipmt?.map((i) => <ShipmtCard key={i.id} i={i} />)}
        </Slider> :
          <Typography sx={{ textAlign: "center" }}>{t("bo.custInfoPg.empList")}</Typography>}

        <ChangePwdPopUp modalOpen={modalOpen} handleModalClose={handleModalClose} userId={custData.custId} />

      </ScrollBox> : <Typography component={'h1'}>Something went wrong</Typography>

      }
      {custData && <VerifyAadhaar modalOpen={adrVfyMdl} handleModalClose={handleAdrVfyMdlMdlClose} userId={custId} />}
    </>
  )
}



export default CustInfoPage