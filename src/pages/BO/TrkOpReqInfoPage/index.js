import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import BgBox from '../../../components/BgBox'
import LoadingScreen from '../../../components/loadingScreen'
import { customAlert } from '../../../components/notify'
import ScrollBox from '../../../components/ScrollBox'
import { capFirstLetter, formatDateTime, getFormatedUnit, getLocalStrg, getTruckName, makeTxtOverFLow } from '../../../utils/format'
import phoneSVG from '../../../assets/svg/Phone.svg'
import LabelTxt from '../../../components/LabelTxt'
import LabelTxtWithIcon from '../../../components/LabelTxtWithIcon'
import route from '../../../Routes'
import QueryKey from '../../../QueryKey'
import { getSingleTrkOpReq } from '../../../services/req_service'
import { getSingleTrkOp } from '../../../services/trkOp-service'
import mailSVG from "../../../assets/svg/Mail.svg"
import locationSVG from "../../../assets/svg/Location.svg"
import starSVG from "../../../assets/svg/star.svg"
import { Add, Edit, LocationOnRounded, South } from '@mui/icons-material'
import { useTranslation } from "react-i18next";
import TpReqPricing from './TpReqPricing'
import CombineReqCard from '../../../components/combineGrp/CombineReqCard'
import TrkOpPymtTable from './TrkOpPymtTable'
import AddTrkOpPymt from './AddTrkOpPymt'



function TrkOpReqInfoPage() {
    const navigate = useNavigate();
    const { trkOpReqId } = useParams();
    const isLarge = useMediaQuery("(min-width: 600px)");
    const { t } = useTranslation();

    const { isLoading, isError, error, data: tpReqData } = useQuery([QueryKey.singleTrkOpReq, trkOpReqId], () => getSingleTrkOpReq(trkOpReqId));
    const { isLoading: isTrkOpLoading, isError: isTrkOpErr, error: trkOpErr, data: trkOpData } = useQuery([QueryKey.singleTrkOp, tpReqData?.truckopId], () => getSingleTrkOp(tpReqData?.truckopId), {
        enabled: Boolean(tpReqData?.truckopId)
    });

    const [pricingDetailsMdl, setPricingDetailsMdl] = useState(false);
    const handlePricingDetailsMdlClose = () => setPricingDetailsMdl(false);
    const handlePricingDetailsMdlOpen = () => setPricingDetailsMdl(true);

    const [addPymtMdl, setAddPymtMdl] = useState(false);
    const handleAddPymtMdlClose = () => setAddPymtMdl(false);
    const handleAddPymtMdlOpen = () => setAddPymtMdl(true);

    if (!tpReqData && trkOpReqId)
        return <h2>Invalid Truck Operator Request</h2>

    if (isError || isTrkOpErr) {
        customAlert(error || trkOpErr);
        return <h2>Something went wrong</h2>
    }

    if (isLoading || isTrkOpLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

    if (tpReqData === null)
        return <h2>Invalid Truck Operator Request</h2>

    const titleTxtStyle = { fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.3)" }
    const labelStyle = { fontSize: 14, fontWeight: "550" };
    // const secTxtStyle = { fontWeight: "600", color: "rgba(0, 0, 0, 0.5)", fontSize: 15 }
    // const iconStyle = { height: 20 }
    const boxStyle = { bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: 10, fontWeight: "600" }
    const medLableStyle = { fontSize: 14, minWidth: 270, maxWidth: 270 }
    const smLableStyle = { fontSize: 14, minWidth: 185, maxWidth: 185 }


    function handleEdit() {
        navigate(route.boEditTrkOpReq + trkOpReqId);
    }

    function handleAddShipmt() {
        navigate(route.boAddShipmt + "?trkOpReqId=" + trkOpReqId);
    }
    function handleLinkShipmtClick(shipmtId) {
        navigate(route.boShipmtInfo + shipmtId);
    }


    return (
        <>
            <ScrollBox height={"100%"}>
                <Stack direction={'row'} justifyContent='space-between' mb={2} >
                    <Stack direction={'row'} alignItems={"end"}>
                        <Typography variant='h5' sx={{ fontWeight: "bold", mr: 1 }}>{t("bo.trkOpReqInfoPg.trkOpReq")}</Typography>
                        <Typography sx={titleTxtStyle}>({trkOpReqId})</Typography>
                    </Stack>
                    <Stack direction={'row'}>
                        <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleEdit}>{t("bo.trkOpReqInfoPg.edit")}</Button>
                        <Box width={8} />
                        <Button variant='contained' color='primary' sx={{ height: 35 }} onClick={handleAddShipmt} >{t("bo.trkOpReqInfoPg.createShipment")}</Button>
                    </Stack>
                </Stack>

                <Stack direction={"row"} alignItems={"start"} gap={1.2}>
                    <Stack width={isLarge ? "49.5%" : "70%"} gap={1}>
                        <BgBox px={4} py={3} >
                            <Typography sx={titleTxtStyle} mb={1.5} >{t("bo.trkOpReqInfoPg.trkOpDet")}</Typography>
                            <Stack direction={"row"} alignItems="center">
                                <Typography sx={{ fontSize: 25, fontWeight: "bold", my: 1, mr: 1.5 }}>{makeTxtOverFLow(tpReqData?.trkOpFName + " " + tpReqData?.trkOpLName, 30)} </Typography>
                                <Stack direction={"row"} alignItems={"center"}>
                                    <Box component={"img"} src={starSVG} alt={"star"} mr={0.8} sx={{ height: 14 }} />
                                    <Typography sx={{ fontSize: 15, fontWeight: "600", color: "rgba(0, 0, 0, 0.5)" }}> {parseFloat(trkOpData?.truckRating).toFixed(2) + " (" + trkOpData?.fedCount + t("bo.trkOpReqInfoPg.reviews")}</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction={"row"} alignItems="start" >
                                <Stack gap={0.7}>
                                    <LabelTxtWithIcon label={""} value={trkOpData?.email} icon={mailSVG} {...medLableStyle} />
                                    <LabelTxtWithIcon label={""} value={trkOpData?.username} icon={phoneSVG}  {...medLableStyle} />
                                    <LabelTxtWithIcon label={""} value={trkOpData?.comAddress} icon={locationSVG}  {...medLableStyle} />
                                </Stack>
                                <Box sx={boxStyle} height={100} mx={2} width={1.5} />
                                <Stack gap={1}>
                                    {trkOpData?.pan_no && <LabelTxt label={t("bo.trkOpReqInfoPg.panNum")} value={trkOpData?.pan_no}  {...medLableStyle} />}
                                    {trkOpData?.gst_no && <LabelTxt label={t("bo.trkOpReqInfoPg.gstNum")} value={trkOpData?.gst_no}   {...medLableStyle} />}
                                    <LabelTxt label={t("bo.trkOpReqInfoPg.cName")} value={trkOpData?.comName}   {...medLableStyle} />
                                </Stack>
                            </Stack>
                        </BgBox>

                        <BgBox px={4} py={3} >
                            <Typography sx={titleTxtStyle} mb={3}>{t("bo.trkOpReqInfoPg.reqDet")}</Typography>
                            <Stack gap={4}>
                                <Stack direction={"row"} alignItems={"start"} gap={1}>
                                    <LabelTxt label={t("bo.trkOpReqInfoPg.loadSts")} value={capFirstLetter(tpReqData?.loadStatus)} {...smLableStyle} />
                                    <LabelTxt label={t("bo.trkOpReqInfoPg.addCapacity")} value={(tpReqData?.addableCap - tpReqData?.filledCap) + getFormatedUnit(tpReqData?.capUnit)} {...smLableStyle} />
                                    <LabelTxtWithIcon label={t("bo.trkOpReqInfoPg.currLocation")} value={tpReqData?.currLocation} icon={locationSVG} {...smLableStyle} />
                                </Stack>
                                <Stack direction={"row"} alignItems={"start"} gap={1} mb={2}>
                                    <LabelTxt label={t("bo.trkOpReqInfoPg.shipCreated")} value={tpReqData?.createdShipmtCount} {...smLableStyle} />
                                    <LabelTxt label={t("bo.trkOpReqInfoPg.desc")} value={tpReqData?.description} {...smLableStyle} />
                                    <Stack sx={{
                                        bgcolor: "rgba(223, 218, 248, 0.4)", borderRadius: 2, width: "100%", height: 70, justifyContent: "center", alignItems: "center"
                                    }}>
                                        <Typography fontSize={14} fontWeight="550" color={"primary.main"}>{t("bo.trkOpReqInfoPg.estPrice")}</Typography>
                                        <Typography sx={{ fontSize: 22, fontWeight: "bold", mt: 0.5 }}><span name="Rs">&#8377;</span> {getLocalStrg(tpReqData?.estPrice)}</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Box height={3} />
                        </BgBox>

                        <Stack position={"relative"}>
                            <BgBox px={4} py={3} >
                                <Typography sx={titleTxtStyle} mb={1.5}>{t("bo.trkOpReqInfoPg.finalPrc")}</Typography>
                                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} py={1} px={8} sx={{ backgroundColor: "rgba(223, 218, 248, 0.2)", borderRadius: 1.4, height: 55, border: 1, borderColor: 'rgba(223, 218, 248, 0.9)', width: 580 }}>
                                    <Typography sx={{ fontSize: 14, fontWeight: "600", color: "primary.main" }}>{tpReqData?.finalPayType ? getFormatedUnit(tpReqData?.finalPayType) : "NA"}</Typography>
                                    <Typography sx={{ fontSize: 20, fontWeight: "bold" }}><span name="Rs">&#8377;</span> {getLocalStrg(tpReqData?.finalPricing)}</Typography>
                                </Stack>

                            </BgBox>
                            <Button variant='text' sx={{ position: "absolute", top: 10, right: 15 }} onClick={handlePricingDetailsMdlOpen} startIcon={<Edit fontSize='small' />}><Typography>{t("bo.trkOpReqInfoPg.update")}</Typography> </Button>
                        </Stack>

                        <Stack position={"relative"}>
                            <BgBox px={1} py={3} height={450}>
                                <Typography sx={titleTxtStyle} mx={4} mb={1.5}>{t("bo.trkOpReqInfoPg.payDet")}</Typography>
                                <TrkOpPymtTable pymtData={tpReqData?.trkOpPymts} />
                            </BgBox>
                            <Button variant='contained' sx={{ position: "absolute", top: 15, right: 25 }} onClick={handleAddPymtMdlOpen} startIcon={<Add fontSize='small' />}>{t("bo.shipInfoPg.addPay")} </Button>
                        </Stack>
                    </Stack>

                    <Stack width={isLarge ? "49.5%" : "70%"} gap={1.2}>
                        <BgBox px={4} py={3} >
                            <Stack direction={"row"} alignItems={"center"} gap={1.5} mb={3}>
                                <Typography sx={{ fontSize: 20, fontWeight: "700", mr: 0.3 }}> {tpReqData?.trkRegNo}</Typography>
                                <Typography sx={{ fontSize: 15, fontWeight: "600", color: "rgba(0, 0, 0, 0.5)" }}>( {getTruckName(JSON.parse(tpReqData?.type))} )</Typography>
                            </Stack>

                            <Stack direction={"row"} alignItems={"start"} gap={1}>
                                <LabelTxt label={t("bo.trkOpReqInfoPg.insExpDate")} value={formatDateTime(tpReqData?.ins_expDate)} {...smLableStyle} />
                                <LabelTxt label={t("bo.trkOpReqInfoPg.fcExpDate")} value={formatDateTime(tpReqData?.fc_expDate)}  {...smLableStyle} />
                                <LabelTxt label={t("bo.trkOpReqInfoPg.pType")} value={capFirstLetter(tpReqData?.trkPermitType)} {...smLableStyle} />
                            </Stack>
                            <Box height={3} />
                        </BgBox>

                        <BgBox px={4} py={3} >
                            <Typography sx={titleTxtStyle} mb={3}>{t("bo.trkOpReqInfoPg.routeDet")}</Typography>
                            {(tpReqData?.routesArr || []).map((route, index) => <RouteEle route={route?.place} index={index} key={route?.id} bgcolor={"rgba(0, 0, 0, 0)"}
                                topLine={index === 0 ? false : true} bottomLine={(tpReqData?.routesArr || []).length - 1 === index ? false : true} />)}
                            <Box height={3} />
                        </BgBox>

                        <BgBox px={1} py={3} >
                            <Stack direction={"row"} justifyContent={"space-between"} mb={1} mx={3} alignItems={"center"}>
                                <Typography sx={titleTxtStyle} >{t("bo.trkOpReqInfoPg.lkshipmt")}</Typography>
                            </Stack>
                            <ScrollBox height={350}>
                                {(tpReqData?.shipments || []).map((i) =>
                                    <Box pl={3} key={i?.shipmtId} onClick={() => handleLinkShipmtClick(i?.shipmtId)}><CombineReqCard data={i} itemId={i?.shipmtId} key={i?.custReqId} handleClick={handleLinkShipmtClick} /></Box>)
                                }
                            </ScrollBox>
                        </BgBox>
                    </Stack>
                </Stack>
            </ScrollBox>
            {tpReqData && <TpReqPricing modalOpen={pricingDetailsMdl} handleModalClose={handlePricingDetailsMdlClose} tpReqData={tpReqData} />}
            {tpReqData && <AddTrkOpPymt modalOpen={addPymtMdl} handleModalClose={handleAddPymtMdlClose} tpReqData={tpReqData} />}

        </>
    )
}



function RouteEle({ route, bottomLine }) {
    return <Stack direction={"row"} alignItems={"Start"} sx={{ height: 40, width: "100%" }}>
        <Stack width={50} alignItems="center" >
            <LocationOnRounded fontSize='small' color='secondary' />
            {/* <Box height={18} width={bottomLine && 30} component={"img"} color="rgba(0, 0, 0, 0.5)" src={routeArrowSVG} alt={routeArrowSVG} mb={0.2} /> */}
            {bottomLine && <South sx={{ fontSize: 18, color: "rgba(0, 0, 0, 0.5)" }} />}
        </Stack>
        <Typography fontSize={14}>{makeTxtOverFLow(route, 60)}</Typography>
    </Stack>
}



export default TrkOpReqInfoPage