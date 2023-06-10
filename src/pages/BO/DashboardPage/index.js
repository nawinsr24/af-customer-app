import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import BgBox from '../../../components/BgBox';
import dashDelImg from '../../../assets/svg/dashDelImg.svg'
import ScrollBox from '../../../components/ScrollBox';
import custReqCount from '../../../assets/svg/custReqCount.svg';
import CurrReqCountBox from '../../../components/CurrReqCountBox';
import trkOpReqCount from '../../../assets/svg/trkOpReqCount.svg';
import complShipmtCount from '../../../assets/svg/complShipmtCount.svg';
import CountCard from '../../../components/CountCard';
import currShipmtCount from '../../../assets/svg/currShipmtCount.svg';
import custCount from '../../../assets/svg/custCount.svg';
import trkOpCount from '../../../assets/svg/trkOpCount.svg';
import { ArrowForward } from '@mui/icons-material';
import CustReqCard from '../../../components/CustReqCard';
import Slider from "react-slick";
import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { customAlert } from '../../../components/notify';
import { useEffect } from 'react';
import { getDashboardService, getStaffById } from '../../../services/bo-service';
import { getAllCurrCustReqWPag, getAllCurrTrkOpReq } from '../../../services/req_service';
import TrkOpReqCard from '../../../components/TrkOpReqCard';
import { useNavigate } from 'react-router-dom';
import route from '../../../Routes';
import { useTranslation } from "react-i18next";
import AddClick from '../../../components/AddClick';
import { useQuery } from 'react-query';
import QueryKey from '../../../QueryKey';
import LoadingScreen from '../../../components/loadingScreen';

function DashboardPage() {
  const { setLoadingScreen, ctxtUser } = useAuthContext();
  const [countsData, setCountsData] = useState({
    currCustReq: 0,
    currTrkOpReq: 0,
    complShipmt: 0,
    currShipmt: 0,
    cust: 0,
    trkOp: 0
  });
  const [currCustReq, setCurrCustReq] = useState([]);
  const [currTrkOpReq, setcurrTrkOpReq] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, isError, error, data: staffData } = useQuery([QueryKey.boUser, ctxtUser.userId], () => getStaffById(ctxtUser.userId))


  async function getData() {
    try {
      const countData = await getDashboardService();
      setCountsData(countData);

      const custReqData = await getAllCurrCustReqWPag(10, 0);
      setCurrCustReq(custReqData);


      const trkOpReqData = await getAllCurrTrkOpReq();
      setcurrTrkOpReq(trkOpReqData);
    } catch (err) {
      console.log(err);
      customAlert(err);
    }
  }

  useEffect(() => {
    setLoadingScreen(true);
    getData().then((e) => setLoadingScreen(false));
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

  function handleAllCustReq() {
    navigate(route.boCustReqList + "current");
  }

  function handleAllTrkOpReq() {
    navigate(route.boTrkOpReqList + "current");
  }

  if (isError) {
    customAlert(error);
    return <h2>Something went wrong</h2>
  }

  if (isLoading)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

  return (
    <>
      <ScrollBox height={"100%"}>
        <BgBox height={330} px={4} py={4}>
          <Stack direction={'row'} justifyContent='space-between'>
            <div>
              <Typography variant='h5' sx={{ fontWeight: "500" }} style={{ display: 'inline-block' }}>
                {t("bo.dashPg.welcome")} <Typography variant='h5' component={'span'} sx={{ fontWeight: "700" }} style={{ display: 'inline-block' }}> {staffData.bo_name}
                </Typography>
              </Typography>
              <Typography sx={{ mb: 4, fontWeight: "400", color: "secondary.main" }}>{t("bo.dashPg.subLable")}</Typography>

              <Stack direction={'row'}>
                <AddClick path={route.boCustReqList + "current"}>
                  <CurrReqCountBox imgPath={custReqCount} title={t("bo.dashPg.custReqCount")} count={countsData.currCustReq} />
                </AddClick>
                <Box width={30} />
                <AddClick path={route.boTrkOpReqList + "current"}>
                  <CurrReqCountBox imgPath={trkOpReqCount} title={t("bo.dashPg.trkOpReqCount")} count={countsData.currTrkOpReq} />
                </AddClick>
              </Stack>
            </div>
            <img src={dashDelImg} alt="Dashboard_Image" height={"270rem"} style={{ marginTop: "1rem" }} />
          </Stack>
        </BgBox>
        <Stack direction={'row'} justifyContent={"space-between"}>
          <AddClick path={route.boShipmtList + "history"}>  <CountCard imgPath={complShipmtCount} title={t("bo.dashPg.complShpCount")} count={countsData.complShipmt} />    </AddClick>
          <AddClick path={route.boShipmtList + "current"}> <CountCard imgPath={currShipmtCount} title={t("bo.dashPg.currShpCount")} count={countsData.currShipmt} />    </AddClick>
          <AddClick path={route.boCustList}> <CountCard imgPath={custCount} title={t("bo.dashPg.custCount")} count={countsData.cust} />    </AddClick>
          <AddClick path={route.boTrkOpList}> <CountCard imgPath={trkOpCount} title={t("bo.dashPg.trkopCount")} count={countsData.trkOp} />    </AddClick>
        </Stack>

        <Stack direction={'row'} justifyContent='space-between' mt={4} mb={2}>
          <Typography sx={{ fontWeight: "600", fontSize: 23 }}>{t("bo.dashPg.cusReq")}</Typography>
          <Button color="secondary" endIcon={<ArrowForward />} sx={{ mr: 2 }} onClick={handleAllCustReq}>{t("bo.dashPg.viewAll")}</Button>
        </Stack>
        {
          currCustReq?.length > 0 ? <Slider {...settings}>
            {currCustReq.map((i) => <CustReqCard key={i.id} i={i} />)}
          </Slider> :
            <Typography sx={{ textAlign: "center" }}>{t("bo.dashPg.empList")}</Typography>
        }

        <Stack direction={'row'} justifyContent='space-between' mt={4} mb={2}>
          <Typography sx={{ fontWeight: "600", fontSize: 23 }}>{t("bo.dashPg.trkOpReq")}</Typography>
          <Button color="secondary" endIcon={<ArrowForward />} sx={{ mr: 2 }} onClick={handleAllTrkOpReq}>{t("bo.dashPg.viewAll")}</Button>
        </Stack>
        {
          currTrkOpReq?.length > 0 ? <Slider {...settings}>
            {currTrkOpReq.map((i) => <TrkOpReqCard key={i.id} i={i} />)}
          </Slider> :
            <Typography sx={{ textAlign: "center" }}>{t("bo.dashPg.empList")}</Typography>
        }
      </ScrollBox></>
  )
}

export default DashboardPage