import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ScrollBox from '../../../components/ScrollBox';
import complShipmtCount from '../../../assets/svg/complShipmtCount.svg';
import CountCard from '../../../components/CountCard';
import currShipmtCount from '../../../assets/svg/currShipmtCount.svg';
import { Add, ArrowForward } from '@mui/icons-material';
import Slider from "react-slick";
import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { customAlert } from '../../../components/notify';
import { useEffect } from 'react';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePwdPopUp from '../../../components/ChangePwdPopUp';
import { capFirstLetter } from '../../../utils/format';
import currCustReqImg from '../../../assets/svg/currCustReq.svg';
import notVerifiedImg from '../../../assets/svg/notVerified.svg';
import totalReqImg from '../../../assets/svg/totalReq.svg';
import verifiedImg from '../../../assets/svg/verified.svg';
import ShipmtCard from '../../../components/ShipmtCard';
import { getSingleTrkOp } from '../../../services/trkOp-service';
import TrkOpReqCard from '../../../components/TrkOpReqCard';
import TrkListCard from '../../../components/TrkListCard';
import { useTranslation } from "react-i18next";
import route from '../../../Routes';
import FillLabelTxtFieldVfy from '../../../components/FillLabelTxtFieldVfy';


function TrkOpInfoPage() {
  const { setLoadingScreen } = useAuthContext();
  const { trkOpId } = useParams();
  const [trkOpData, setTrkOpData] = useState(null);
  const [modalOpen, setmodalOpen] = useState(false);
  const handleModalClose = () => setmodalOpen(false);
  const handleModalOpen = () => setmodalOpen(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  let txtFielProps = { fontSize: 15, height: 38 };



  async function getData() {
    try {
      const data = await getSingleTrkOp(trkOpId);
      setTrkOpData(data);

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

  async function handleEdit() {
    navigate(route.boEditTrkOp + trkOpData?.truckopId);
  }

  function verified() {
    if (trkOpData.aadhar_verified === 1 || trkOpData.pan_verified === 1 || trkOpData.gst_verified === 1)
      return <img src={verifiedImg} alt="verifiedImg" />
    else
      return <Stack direction={'row'} alignItems={"center"}>
        <img src={notVerifiedImg} alt="notVerifiedImg" />
        <Typography sx={{ color: "#EB9A55", fontSize: 14, fontWeight: 500, ml: 0.3 }}>Need Verification</Typography>
      </Stack>
  }

  function handleAddTrk() {
    navigate(route.boAddTruck + "?trkOpId=" + trkOpId);
  }



  return (
    <>
      {trkOpData ? <ScrollBox height={"100%"}>
        <Stack direction={'row'} justifyContent='space-between' mt={1.6} mb={1.3} >
          <Stack direction={'row'} alignItems={"center"}>
            <Typography variant='h5' sx={{ fontWeight: "bold", mr: 1 }}>{capFirstLetter(trkOpData?.fName) + " " + capFirstLetter(trkOpData?.lName)} {t("bo.trkOpInfoPg.trkOp")}</Typography>
            {verified()}
          </Stack>
          <Stack direction={'row'} mr={5}>
            <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleEdit}>{t("bo.trkOpInfoPg.editInfo")} </Button>
            <Box width={8} />
            <Button variant='contained' color='primary' sx={{ height: 35 }} onClick={handleModalOpen}>{t("bo.trkOpInfoPg.changePw")}</Button>
          </Stack>
        </Stack>

        <Stack direction={'row'} justifyContent={"space-between"} mb={2}>
          <CountCard imgPath={currCustReqImg} title={t("bo.trkOpInfoPg.currReqCount")} count={trkOpData?.currReq?.length || 0} />
          <CountCard imgPath={totalReqImg} title={t("bo.trkOpInfoPg.totReqCount")} count={trkOpData?.totalReqs} />
          <CountCard imgPath={currShipmtCount} title={t("bo.trkOpInfoPg.currShpCount")} count={trkOpData?.currShipmt?.length || 0} />
          <CountCard imgPath={complShipmtCount} title={t("bo.trkOpInfoPg.complShpCount")} count={trkOpData.completedShipmts} />
        </Stack>


        <Box py={2} pl={5} mr={2} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, border: 1, borderColor: '#E3E3E3', width: "99.5%" }}>
          <Typography variant='h5' sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 22, mt: 1 }}>{t("bo.trkOpInfoPg.trkOpInfo")}</Typography>
          <Stack gap={3} mt={3}>
            <Stack direction={"row"} >
              <FillLabelTxtField title={t("bo.trkOpInfoPg.fName")} defaultValue={trkOpData?.fName} readOnly={true} {...txtFielProps} />
              <Box width={100} />
              <FillLabelTxtField title={t("bo.trkOpInfoPg.lName")} defaultValue={trkOpData?.lName} readOnly={true} {...txtFielProps} />
            </Stack>
            <Stack direction={"row"} >
              <FillLabelTxtField title={t("bo.trkOpInfoPg.mName1")} defaultValue={trkOpData?.username} readOnly={true} {...txtFielProps} />
              <Box width={100} />
              <FillLabelTxtField title={t("bo.trkOpInfoPg.mName2")} defaultValue={trkOpData?.mobile2} readOnly={true} {...txtFielProps} />
            </Stack>
            <Stack direction={"row"} >
              <FillLabelTxtField title={t("bo.trkOpInfoPg.email")} defaultValue={trkOpData?.email} readOnly={true} {...txtFielProps} />
              <Box width={100} />
              <FillLabelTxtField title={t("bo.trkOpInfoPg.trkOwn")} defaultValue={trkOpData?.trucks_owned} readOnly={true} {...txtFielProps} />
            </Stack>
            {trkOpData?.gst_no && <FillLabelTxtFieldVfy status={trkOpData?.gst_verified} readOnly={true} title={t("bo.trkOpInfoPg.gstNum")} defaultValue={trkOpData?.gst_no} {...txtFielProps} />}
            {trkOpData?.pan_no && <FillLabelTxtFieldVfy status={trkOpData?.pan_verified} readOnly={true} title={t("bo.trkOpInfoPg.panNum")} defaultValue={trkOpData?.pan_no} {...txtFielProps} />}
            <Stack direction={"row"} >
              <FillLabelTxtField title={t("bo.trkOpInfoPg.cName")} defaultValue={trkOpData?.comName} readOnly={true} {...txtFielProps} />
              <Box width={100} />
              <FillLabelTxtField title={t("bo.trkOpInfoPg.cAddress")} multiline={true} defaultValue={trkOpData?.comAddress} readOnly={true} {...txtFielProps} height={103} />
            </Stack>
            <Box height={10} />
          </Stack>
        </Box>

        <Stack direction={'row'} justifyContent='space-between' mb={1} mt={2}>
          <Stack direction={"row"} alignItems="center" gap={2}>
            <Typography sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 22 }}>{t("bo.trkOpInfoPg.trkList")}</Typography>
            <Button onClick={handleAddTrk} size='small' sx={{ fontWeight: 600, fontSize: 15 }} color="primary" variant='outlined' startIcon={<Add />} >{t("bo.trkOpInfoPg.addTrk")}</Button>
          </Stack>
          <Button color="secondary" endIcon={<ArrowForward />} sx={{ mr: 2 }} onClick={() => { navigate(route.boTrkListByTpPage + trkOpId) }}> {t("bo.trkOpInfoPg.viewAll")}</Button>
        </Stack>
        {trkOpData?.trucks?.length > 0 ? <Slider {...settings}>
          {trkOpData?.trucks?.map((i) => <TrkListCard key={i.id} i={i} />)}
        </Slider> :
          <Typography sx={{ textAlign: "center" }}>{t("bo.trkOpInfoPg.empList")}</Typography>}


        <Stack direction={'row'} justifyContent='space-between' mb={1} mt={2}>
          <Typography sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 22 }}>{t("bo.trkOpInfoPg.currReq")}</Typography>
          <Button color="secondary" endIcon={<ArrowForward />} sx={{ mr: 2 }}> {t("bo.trkOpInfoPg.viewAll")}</Button>
        </Stack>
        {trkOpData?.currReq?.length > 0 ? <Slider {...settings}>
          {trkOpData?.currReq?.map((i) => <TrkOpReqCard key={i.id} i={i} />)}
        </Slider> :
          <Typography sx={{ textAlign: "center" }}>{t("bo.trkOpInfoPg.empList")}</Typography>}

        <Stack direction={'row'} justifyContent='space-between' mt={2} mb={1}>
          <Typography sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 22 }}>{t("bo.trkOpInfoPg.currShp")}</Typography>
          <Button color="secondary" endIcon={<ArrowForward />} sx={{ mr: 2 }}> {t("bo.trkOpInfoPg.viewAll")}</Button>
        </Stack>

        {trkOpData?.currShipmt?.length > 0 ? <Slider {...settings}>
          {trkOpData?.currShipmt?.map((i) => <ShipmtCard key={i.id} i={i} />)}
        </Slider> :
          <Typography sx={{ textAlign: "center" }}>{t("bo.trkOpInfoPg.empList")}</Typography>}

        <ChangePwdPopUp modalOpen={modalOpen} handleModalClose={handleModalClose} userId={trkOpData.custId} />

      </ScrollBox> : <Typography component={'h1'}>Something went wrong</Typography>

      }

    </>
  )
}

export default TrkOpInfoPage