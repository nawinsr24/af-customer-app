import { Box, Button, ButtonBase, CircularProgress, IconButton, Rating, Typography, useMediaQuery } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import BgBox from '../../../components/BgBox'
import LoadingScreen from '../../../components/loadingScreen'
import { customAlert, notify } from '../../../components/notify'
import ScrollBox from '../../../components/ScrollBox'
import { capFirstLetter, formatDateWithJs, formatSess, getFormatedUnit, getLocalStrg, getTruckName, makeTxtOverFLow, shipmtStClrs } from '../../../utils/format'
import phoneSVG from '../../../assets/svg/Phone.svg'
import LabelTxt from '../../../components/LabelTxt'
import LabelTxtWithIcon from '../../../components/LabelTxtWithIcon'
import calendSVG from "../../../assets/svg/calend.svg"
import weightSVG from "../../../assets/svg/weight.svg"
import QueryKey from '../../../QueryKey'
import { getSingleShipmt } from '../../../services/shipmt-service'
import trackSVG from "../../../assets/svg/track.svg"
import { useTranslation } from "react-i18next";
import { Add, Edit } from '@mui/icons-material'
import { useState } from 'react'
import UpdateStatus from './UpdateStatus'
import PicDetails from './PicDetails'
import DelDetails from './DelDetails'
import LoadDetails from './LoadDetails'
import TrkDetails from './TrkDetails'
import LabelTxtWithIconBtn from '../../../components/LabelTxtWithIconBtn'
import DriverDetails from './DriverDetails'
import fileIconSVG from "../../../assets/svg/fileIcon.svg"
import { getFileUrl } from '../../../services/s3-service'
import DocDetails from './DocDetails'
import Feedback from './Feedback'
import UnderLineTxt from '../../../components/UnderLineTxt'
import DataInvalid from './DataInvalid'
import CombineReqCard from '../../../components/combineGrp/CombineReqCard'
import route from '../../../Routes'
import PricingDetails from './PricingDetails'
import CustPymtTable from './CustPymtTable'
import AddCustPymt from './AddCustPymt'

function ShipmtInfoPage() {
    const navigate = useNavigate();
    const { shipmtId } = useParams();
    const { t } = useTranslation();

    const isLarge = useMediaQuery("(min-width: 600px)");
    const { isLoading, isError, error, data: shipmtData } = useQuery([QueryKey.singleShipmt, shipmtId], () => getSingleShipmt(shipmtId));

    const [upStatusMdl, setUpStatusMdl] = useState(false);
    const handleUpStatusMdlClose = () => setUpStatusMdl(false);
    const handleUpStatusMdlOpen = () => setUpStatusMdl(true);

    const [picDetailsMdl, setPicDetailsMdl] = useState(false);
    const handlePicDetailsMdlClose = () => setPicDetailsMdl(false);
    const handlePicDetailsMdlOpen = () => setPicDetailsMdl(true);

    const [delDetailsMdl, setDelDetailsMdl] = useState(false);
    const handleDelDetailsMdlClose = () => setDelDetailsMdl(false);
    const handleDelDetailsMdlOpen = () => setDelDetailsMdl(true);

    const [lodDetailsMdl, setLodDetailsMdl] = useState(false);
    const handleLodDetailsMdlClose = () => setLodDetailsMdl(false);
    const handleLodDetailsMdlOpen = () => setLodDetailsMdl(true);

    const [trkDetailsMdl, setTrkDetailsMdl] = useState(false);
    const handleTrkDetailsMdlClose = () => setTrkDetailsMdl(false);
    const handleTrkDetailsMdlOpen = () => setTrkDetailsMdl(true);

    const [drivDetailsMdl, setDrivDetailsMdl] = useState(false);
    const handleDrivDetailsMdlClose = () => setDrivDetailsMdl(false);
    const handleDrivDetailsMdlOpen = () => setDrivDetailsMdl(true);

    const [feedbackMdl, setFeedbackMdl] = useState(false);
    const handleFeedbackMdlClose = () => setFeedbackMdl(false);
    const handleFeedbackMdlOpen = () => setFeedbackMdl(true);

    const [dataInvalidMdl, setDataInvalidMdl] = useState(false);
    const handleDataInvalidMdlClose = () => setDataInvalidMdl(false);
    const handleDataInvalidMdlOpen = () => setDataInvalidMdl(true);

    const [docDetailsMdl, setDocDetailsMdl] = useState(false);
    const handleDocDetailsMdlClose = () => setDocDetailsMdl(false);
    const handleDocDetailsMdlOpen = () => setDocDetailsMdl(true);
    const [docMdlType, setDocMdlType] = useState("");

    const [pricingDetailsMdl, setPricingDetailsMdl] = useState(false);
    const handlePricingDetailsMdlClose = () => setPricingDetailsMdl(false);
    const handlePricingDetailsMdlOpen = () => setPricingDetailsMdl(true);

    const [addCustPymtMdl, setAddCustPymtMdl] = useState(false);
    const handleAddCustPymtMdlClose = () => setAddCustPymtMdl(false);
    const handleAddCustPymtMdlOpen = () => setAddCustPymtMdl(true);

    function handleDocEdit(type) {
        setDocMdlType(type)
        handleDocDetailsMdlOpen();
    }



    const titleTxtStyle = { fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.3)" }
    const labelStyle = { fontSize: 14, fontWeight: "550" };
    // const secTxtStyle = { fontWeight: "600", color: "rgba(0, 0, 0, 0.5)", fontSize: 15 }
    // const iconStyle = { height: 20 }
    const boxStyle = { bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: 10, fontWeight: "600" }

    function getShipmtStatus(status) {
        let stObj = shipmtStClrs(status);
        return <Typography sx={{ fontWeight: "600", fontSize: 14, color: stObj.txtColor }}>{stObj.label}</Typography>
    }

    function handleCombineReqClick(combShipmtId) {
        navigate(route.boShipmtInfo + combShipmtId);
    }

    function getFullName(fName, lName) {
        return capFirstLetter(fName) + " " + capFirstLetter(lName)
    }

    function getDateSess(dt, sess) {
        return formatDateWithJs(dt) + " & " + formatSess(sess)
    }

    if (!shipmtData && shipmtId)
        return <h2>Invalid Shipment</h2>

    if (isError) {
        customAlert(error);
        return <h2>Something went wrong</h2>
    }

    if (isLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

    if (shipmtData === null)
        return <h2>Invalid Shipment</h2>

    return (
        <>
            <ScrollBox height={"100%"}>
                <Stack direction={'row'} justifyContent='space-between' mb={2} >
                    <Stack direction={'row'} alignItems={"end"}>
                        <Typography variant='h5' sx={{ fontWeight: "bold", mr: 1 }}>{t("bo.shipInfoPg.ship")}</Typography>
                        <Typography sx={titleTxtStyle} mr={1}>({shipmtId})</Typography>
                        {(shipmtData?.shipment?.currStatus === "completed") && <Rating value={shipmtData?.feedback?.average} readOnly precision={0.1} />}
                    </Stack>
                    <Stack direction={'row'} gap={1.5}>
                        {(shipmtData?.shipment?.currStatus === "pending") && <Button variant='contained' color='primary' onClick={handleDataInvalidMdlOpen}>{t("bo.shipInfoPg.dataInvalid")}</Button>}
                        {(shipmtData?.shipment?.currStatus === "completed") && <Button variant='contained' color='primary' onClick={handleFeedbackMdlOpen}>{t("bo.shipInfoPg.updFeedback")}</Button>}
                        <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleUpStatusMdlOpen}> {t("bo.shipInfoPg.updSts")}</Button>
                    </Stack>
                </Stack>

                <Stack direction={"row"} alignItems={"start"} gap={1.2}>
                    <Stack width={isLarge ? "49.5%" : "70%"} gap={1}>
                        <BgBox px={4} py={3} >
                            <Typography sx={titleTxtStyle} mb={1.5}>{t("bo.shipInfoPg.shipInfo")}</Typography>
                            <Stack direction={"row"} alignItems="center" mb={2}>
                                <LabelTxt label={t("bo.shipInfoPg.shipId")} value={shipmtData?.shipment?.shipmtId} minWidth={260} maxWidth={260} />
                                <Stack minWidth={260} maxWidth={260}>
                                    <Typography sx={labelStyle}>{t("bo.shipInfoPg.sts")}</Typography>
                                    {getShipmtStatus(shipmtData?.shipment?.currStatus)}
                                </Stack>
                            </Stack>
                            <Stack direction={"row"} alignItems="center">
                                <ButtonBase component={"div"} onClick={() => navigate(route.boCustInfo + shipmtData?.shipment?.custId)}>
                                    <Stack direction={"row"} alignItems="center">
                                        <LabelTxt label={t("bo.shipInfoPg.cust")} value={getFullName(shipmtData?.custData?.fName, shipmtData?.custData?.lName)} minWidth={150} maxWidth={150} />
                                        <LabelTxtWithIcon label={""} value={shipmtData?.custData?.mobile1} icon={phoneSVG} minWidth={130} maxWidth={130} />
                                    </Stack>
                                </ButtonBase>
                                <Box sx={boxStyle} height={60} mr={1} width={1.5} />
                                <ButtonBase component={"div"} onClick={() => navigate(route.boTrkOpInfo + shipmtData?.shipment?.truckOpId)}>
                                    <Stack direction={"row"} alignItems="center">
                                        <LabelTxt label={t("bo.shipInfoPg.trkOp")} value={getFullName(shipmtData?.trkOpData?.fName, shipmtData?.trkOpData?.lName)} minWidth={150} maxWidth={150} />
                                        <LabelTxtWithIcon label={""} value={shipmtData?.trkOpData?.mobile1} icon={phoneSVG} minWidth={130} maxWidth={130} />
                                    </Stack>
                                </ButtonBase>
                            </Stack>

                            <Stack direction={"row"} alignItems="center" mt={2}>
                                <ButtonBase component={"div"} onClick={() => navigate(route.boCustReqInfo + shipmtData?.shipment?.custReqId)}>
                                    <LabelTxt label={t("bo.shipInfoPg.custReqId")} value={shipmtData?.shipment?.custReqId} minWidth={270} maxWidth={270} />
                                </ButtonBase>
                                <Box sx={boxStyle} height={60} ml={1.2} mr={1} width={1.5} />
                                <ButtonBase component={"div"} onClick={() => navigate(route.boTrkOpReqInfo + shipmtData?.shipment?.truckOpReqId)}>
                                    <LabelTxt label={t("bo.shipInfoPg.trkOpReqId")} value={shipmtData?.shipment?.truckOpReqId} minWidth={270} maxWidth={270} />
                                </ButtonBase>
                            </Stack>
                        </BgBox>

                        <Stack position={"relative"}>
                            <BgBox px={4} py={3} >
                                <Typography sx={titleTxtStyle} mb={1.5}>{t("bo.shipInfoPg.pickDet")}</Typography>
                                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                                    <LabelTxt label={t("bo.shipInfoPg.consignorName")} value={shipmtData?.shipmtPicDel?.cnorName} minWidth={280} maxWidth={280} />
                                    <LabelTxt label={t("bo.shipInfoPg.consignorGst")} value={shipmtData?.shipmtPicDel?.cnorGST} minWidth={280} maxWidth={280} />
                                </Stack>
                                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                                    <LabelTxt label={t("bo.addCustReqPg.cnorMobile")} value={shipmtData?.shipmtPicDel?.cnorMobile} minWidth={280} maxWidth={280} />
                                    <LabelTxt label={t("bo.addCustReqPg.cnorEmail")} value={shipmtData?.shipmtPicDel?.cnorEmail} minWidth={280} maxWidth={280} />
                                </Stack>
                                <Box sx={boxStyle} height={1.5} mt={2} width={"100%"} />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.estDate")} value={getDateSess(shipmtData?.shipmtPicDel?.estPicDate, shipmtData?.shipmtPicDel?.estPicSession)} gap={230} />
                                {shipmtData?.shipmtPicDel?.picDate && <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.date")} value={getDateSess(shipmtData?.shipmtPicDel?.picDate, shipmtData?.shipmtPicDel?.picSession)} gap={230} />}
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.location")} value={shipmtData?.shipmtPicDel?.picLocation} gap={230} />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.address")} value={shipmtData?.shipmtPicDel?.picAddress} gap={230} />
                                <Box sx={boxStyle} height={1.5} my={2} width={"100%"} />
                                <Stack direction={"row"} alignItems="center" gap={1}>
                                    <LabelTxt label={t("bo.shipInfoPg.inchargeName")} value={shipmtData?.shipmtInch?.picIncName} minWidth={210} maxWidth={210} />
                                    <LabelTxt label={t("bo.shipInfoPg.mNum1")} value={shipmtData?.shipmtInch?.picInchMobile1} minWidth={160} maxWidth={160} />
                                    {shipmtData?.shipmtInch?.picInchMobile2 && <LabelTxt label={t("bo.shipInfoPg.mNum2")} value={shipmtData?.shipmtInch?.picInchMobile2} minWidth={160} maxWidth={160} />}
                                </Stack>
                            </BgBox>
                            <EditBtn onClick={handlePicDetailsMdlOpen} />
                        </Stack>

                        <Stack position={"relative"}>
                            <BgBox px={4} py={3} >
                                <Typography sx={titleTxtStyle} mb={1.5}>{t("bo.shipInfoPg.delPointDet")}</Typography>
                                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                                    <LabelTxt label={t("bo.shipInfoPg.consigneeName")} value={shipmtData?.shipmtPicDel?.cneeName} minWidth={280} maxWidth={280} />
                                    <LabelTxt label={t("bo.shipInfoPg.consigneeGst")} value={shipmtData?.shipmtPicDel?.cneeGST} minWidth={280} maxWidth={280} />
                                </Stack>
                                <Stack direction={"row"} alignItems="center" mb={2} gap={2}>
                                    <LabelTxt label={t("bo.addCustReqPg.cneeMobile")} value={shipmtData?.shipmtPicDel?.cneeMobile} minWidth={280} maxWidth={280} />
                                    <LabelTxt label={t("bo.addCustReqPg.cneeEmail")} value={shipmtData?.shipmtPicDel?.cneeEmail} minWidth={280} maxWidth={280} />
                                </Stack>
                                <Box sx={boxStyle} height={1.5} mt={2} width={"100%"} />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.estDate")} value={getDateSess(shipmtData?.shipmtPicDel?.estDelDate, shipmtData?.shipmtPicDel?.estDelSession)} gap={230} />
                                {shipmtData?.shipmtPicDel?.delDate && <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.date")} value={getDateSess(shipmtData?.shipmtPicDel?.delDate, shipmtData?.shipmtPicDel?.delSession)} gap={230} />}
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.location")} value={shipmtData?.shipmtPicDel?.delLocation} gap={230} />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.address")} value={shipmtData?.shipmtPicDel?.delAddress} gap={230} />
                                <Box sx={boxStyle} height={1.5} my={2} width={"100%"} />
                                <Stack direction={"row"} alignItems="center" gap={1}>
                                    <LabelTxt label={t("bo.shipInfoPg.inchargeName")} value={shipmtData?.shipmtInch?.delInchName} minWidth={210} maxWidth={210} />
                                    <LabelTxt label={t("bo.shipInfoPg.mNum1")} value={shipmtData?.shipmtInch?.delInchMobile1} minWidth={160} maxWidth={160} />
                                    {shipmtData?.shipmtInch?.delInchMobile2 && <LabelTxt label={t("bo.shipInfoPg.mNum2")} value={shipmtData?.shipmtInch?.delInchMobile2} minWidth={160} maxWidth={160} />}
                                </Stack>
                            </BgBox>
                            <EditBtn onClick={handleDelDetailsMdlOpen} />
                        </Stack>

                        <Stack position={"relative"}>
                            <BgBox px={4} py={3} >
                                <Typography sx={titleTxtStyle} mb={1.5}>{t("bo.shipInfoPg.drivDet")}</Typography>
                                <Stack direction={"row"} alignItems="center" gap={1} mb={3}>
                                    <LabelTxt label={t("bo.shipInfoPg.drivName")} value={shipmtData?.shipmtDriver?.drivName} minWidth={180} maxWidth={180} />
                                    <LabelTxt label={t("bo.shipInfoPg.mNum1")} value={shipmtData?.shipmtDriver?.drivMobile1} minWidth={220} maxWidth={220} />
                                    {shipmtData?.shipmtDriver?.drivMobile2 && <LabelTxt label={t("bo.shipInfoPg.mNum2")} value={shipmtData?.shipmtDriver?.drivMobile2} minWidth={180} maxWidth={180} />}
                                </Stack>
                                <Stack direction={"row"} alignItems="center" gap={1}>
                                    <LabelTxt label={t("bo.shipInfoPg.licNo")} value={shipmtData?.shipmtDriver?.drivLicNo} minWidth={180} maxWidth={180} />
                                    <LabelTxt label={t("bo.shipInfoPg.username")} value={shipmtData?.shipmtDriver?.shipmtId} minWidth={220} maxWidth={220} />
                                    <LabelTxt label={t("bo.shipInfoPg.pw")} value={shipmtData?.shipmtDriver?.drivMobile1} minWidth={180} maxWidth={180} />
                                </Stack>
                            </BgBox>
                            <EditBtn onClick={handleDrivDetailsMdlOpen} />
                        </Stack>

                        <Stack position={"relative"}>
                            <BgBox px={4} py={3} >
                                <Typography sx={titleTxtStyle} mb={1.5}>{t("bo.shipInfoPg.priceDet")}</Typography>
                                <Typography sx={{ fontSize: 14, fontWeight: "550", mb: 0.8 }}>{t("bo.shipInfoPg.custPrice")}</Typography>
                                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} py={1} px={8} sx={{ backgroundColor: "rgba(223, 218, 248, 0.2)", borderRadius: 1.4, height: 55, border: 1, borderColor: 'rgba(223, 218, 248, 0.9)', width: 580 }}>
                                    <Typography sx={{ fontSize: 14, fontWeight: "600", color: "primary.main" }}>{getFormatedUnit(shipmtData?.shipmtPricing?.custPayType)}</Typography>
                                    <Typography sx={{ fontSize: 20, fontWeight: "bold" }}><span name="Rs">&#8377;</span> {getLocalStrg(shipmtData?.shipmtPricing?.cust_finalPrc)}</Typography>
                                </Stack>

                            </BgBox>
                            <EditBtn onClick={handlePricingDetailsMdlOpen} />
                        </Stack>

                        <Stack position={"relative"}>
                            <BgBox px={1} py={3} height={450}>
                                <Typography sx={titleTxtStyle} mx={4} mb={1.5}>{t("bo.shipInfoPg.custPay")}</Typography>
                                <CustPymtTable pymtData={shipmtData?.shipmtCustPymts} />
                            </BgBox>
                            <Button variant='contained' sx={{ position: "absolute", top: 15, right: 25 }} onClick={handleAddCustPymtMdlOpen} startIcon={<Add fontSize='small' />}>{t("bo.shipInfoPg.addPay")} </Button>
                        </Stack>

                    </Stack>
                    <Stack width={isLarge ? "49.5%" : "70%"} gap={1}>

                        <Stack position={"relative"}>
                            <BgBox px={4} py={3} >
                                <Typography sx={titleTxtStyle} mb={1.5}>{t("bo.shipInfoPg.doc")}</Typography>
                                <Stack direction={"row"} alignItems="center" gap={2.5} >
                                    <FileViewLabel label={t("bo.shipInfoPg.billCopy")} icon={fileIconSVG} fileKey={shipmtData?.shipmtDocs?.billCopy} value={shipmtData?.shipmtDocs?.billCopy ? "Bill Copy" : "No Bill Copy"} minWidth={270} maxWidth={270} onEdit={() => handleDocEdit("billCopy")} />
                                    <FileViewLabel label={`Eway Bill A (${shipmtData?.shipmtDocs?.ewayA_no})`} value={shipmtData?.shipmtDocs?.ewayA ? shipmtData?.shipmtDocs?.ewayA_no : "No Eway Bill A"} icon={fileIconSVG} fileKey={shipmtData?.shipmtDocs?.ewayA} minWidth={270} maxWidth={270} onEdit={() => handleDocEdit("ewayA")} />
                                </Stack>
                                <Stack direction={"row"} alignItems="center" gap={2.5} mt={2}>
                                    <FileViewLabel label={`Eway Bill B (${shipmtData?.shipmtDocs?.ewayB_no})`} value={shipmtData?.shipmtDocs?.ewayB ? shipmtData?.shipmtDocs?.ewayB_no : "No Eway Bill B"} icon={fileIconSVG} fileKey={shipmtData?.shipmtDocs?.ewayB} minWidth={270} maxWidth={270} onEdit={() => handleDocEdit("ewayB")} />
                                </Stack>
                            </BgBox>
                            <EditBtn onClick={() => handleDocEdit("details")} />
                        </Stack>

                        <Stack position={"relative"}>
                            <BgBox px={4} py={3} >
                                <Typography sx={titleTxtStyle} mb={1}>{t("bo.shipInfoPg.loadDet")}</Typography>
                                <UnderLineTxt boxStyle={boxStyle} label={"Load Type"} value={getFormatedUnit(shipmtData?.shipmtLoad?.loadType)} line />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.matType")} value={shipmtData?.shipmtLoad?.matType} line />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.wei")} icon={weightSVG} value={shipmtData?.shipmtLoad?.weight + getFormatedUnit(shipmtData?.shipmtLoad?.weightUnit)} line />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.quan")} value={shipmtData?.shipmtLoad?.quantity} line />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.flam/frag")} value={capFirstLetter(shipmtData?.shipmtLoad?.matNature)} line />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.len")} value={shipmtData?.shipmtLoad?.matLength + getFormatedUnit(shipmtData?.shipmtLoad?.matDimsUnit)} line />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.wid")} value={shipmtData?.shipmtLoad?.matWidth + getFormatedUnit(shipmtData?.shipmtLoad?.matDimsUnit)} line />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.height")} value={shipmtData?.shipmtLoad?.matHeight + getFormatedUnit(shipmtData?.shipmtLoad?.matDimsUnit)} line />
                                <UnderLineTxt boxStyle={boxStyle} label={t("bo.shipInfoPg.desc")} value={shipmtData?.shipmtLoad?.loadDesc} />
                                <Box height={2} />
                            </BgBox>
                            <EditBtn onClick={handleLodDetailsMdlOpen} />
                        </Stack>

                        <Stack position={"relative"}>
                            <BgBox px={4} py={3} >
                                <Typography sx={titleTxtStyle} mb={1.5}>{t("bo.shipInfoPg.trkDet")}</Typography>
                                <Stack direction={"row"} alignItems={"start"} gap={1.5}>
                                    <Stack gap={2.5}>
                                        <LabelTxt label={t("bo.shipInfoPg.regTrkNum")} value={shipmtData?.shipmtTruck?.truckRegNo} minWidth={270} maxWidth={270} />
                                        <LabelTxt label={t("bo.shipInfoPg.pType")} value={shipmtData?.shipmtTruck?.trkPermitType} minWidth={270} maxWidth={270} />
                                        <LabelTxtWithIcon label={t("bo.shipInfoPg.trkMaxLoadCap")} value={shipmtData?.shipmtTruck?.trkMaxCap + getFormatedUnit(shipmtData?.shipmtTruck?.trkMaxCapUnit)} icon={weightSVG} minWidth={270} maxWidth={270} />
                                        <LabelTxt label={t("bo.shipInfoPg.trkType")} value={getTruckName(JSON.parse(shipmtData?.shipmtTruck?.truck_type))} minWidth={330} maxWidth={330} />
                                    </Stack>

                                    <Stack gap={2.5}>
                                        <LabelTxtWithIcon label={t("bo.shipInfoPg.insExpDate")} value={formatDateWithJs(shipmtData?.shipmtTruck?.trkIns_expDate)} icon={calendSVG} minWidth={270} maxWidth={270} />
                                        <LabelTxtWithIcon label={t("bo.shipInfoPg.fcExpDate")} value={formatDateWithJs(shipmtData?.shipmtTruck?.trkFc_expDate)} icon={calendSVG} minWidth={270} maxWidth={270} />
                                        <LabelTxtWithIconBtn onClick={() => window.open(shipmtData?.shipmtDriver?.trackingGPSLink, "_blank")} label={t("bo.shipInfoPg.trackGps")} value={shipmtData?.shipmtDriver?.trackingGPSLink && "GPS LINK"} valueClr={"rgba(5, 49, 227, 1)"} icon={trackSVG} minWidth={270} maxWidth={270} />
                                    </Stack>
                                </Stack>
                                <Box height={3} />
                            </BgBox>
                            <EditBtn onClick={handleTrkDetailsMdlOpen} />
                        </Stack>
                        <BgBox px={1} py={3} >
                            <Stack direction={"row"} justifyContent={"space-between"} mb={1} mx={3} alignItems={"center"}>
                                <Typography sx={titleTxtStyle} >{t("bo.shipInfoPg.combineShip")}&nbsp;&nbsp;({makeTxtOverFLow(shipmtData?.combShipmts[0]?.grpName || "", 30)})</Typography>
                            </Stack>
                            <ScrollBox height={350}>
                                {shipmtData?.combShipmts?.map((i) =>
                                    shipmtData?.shipment?.shipmtId !== i?.shipmtId && <Box pl={3} key={i?.shipmtId} onClick={() => handleCombineReqClick(i?.shipmtId)}><CombineReqCard data={i} itemId={i?.shipmtId} key={i?.custReqId} handleClick={handleCombineReqClick} /></Box>)
                                }
                            </ScrollBox>
                        </BgBox>
                    </Stack>
                </Stack>
            </ScrollBox>
            {shipmtData && <UpdateStatus modalOpen={upStatusMdl} handleModalClose={handleUpStatusMdlClose} shipmtData={shipmtData} />}
            {shipmtData && <PicDetails modalOpen={picDetailsMdl} handleModalClose={handlePicDetailsMdlClose} shipmtData={shipmtData} />}
            {shipmtData && <DelDetails modalOpen={delDetailsMdl} handleModalClose={handleDelDetailsMdlClose} shipmtData={shipmtData} />}
            {shipmtData && <LoadDetails modalOpen={lodDetailsMdl} handleModalClose={handleLodDetailsMdlClose} shipmtData={shipmtData} />}
            {shipmtData && <TrkDetails modalOpen={trkDetailsMdl} handleModalClose={handleTrkDetailsMdlClose} shipmtData={shipmtData} />}
            {shipmtData && <DriverDetails modalOpen={drivDetailsMdl} handleModalClose={handleDrivDetailsMdlClose} shipmtData={shipmtData} />}
            {shipmtData && <DocDetails modalOpen={docDetailsMdl} handleModalClose={handleDocDetailsMdlClose} shipmtData={shipmtData} type={docMdlType} />}
            {shipmtData && <Feedback modalOpen={feedbackMdl} handleModalClose={handleFeedbackMdlClose} shipmtData={shipmtData} type={docMdlType} />}
            {shipmtData && <DataInvalid modalOpen={dataInvalidMdl} handleModalClose={handleDataInvalidMdlClose} shipmtData={shipmtData} type={docMdlType} />}
            {shipmtData && <PricingDetails modalOpen={pricingDetailsMdl} handleModalClose={handlePricingDetailsMdlClose} shipmtData={shipmtData} />}
            {shipmtData && <AddCustPymt modalOpen={addCustPymtMdl} handleModalClose={handleAddCustPymtMdlClose} shipmtData={shipmtData} />}
        </>
    )
}


function EditBtn({ onClick }) {
    return <Button variant='text' sx={{ position: "absolute", top: 10, right: 15 }} onClick={onClick} startIcon={<Edit fontSize='small' />}><Typography>Edit</Typography> </Button>
}


function FileViewLabel({ label, minWidth, maxWidth, bgcolor, icon, fontSize, fileKey, value, onEdit }) {

    const [loading, setLoading] = useState(false)

    async function handleClick() {
        if (!fileKey) {
            notify("info", "No File Found")
            return
        }
        setLoading(true);
        try {
            const fileUrl = await getFileUrl({ fileKey });
            window.open(fileUrl, "_blank")
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoading(false);
    }

    return (
        <Stack minWidth={minWidth} maxWidth={maxWidth} bgcolor={bgcolor}>
            <Stack direction={"row"} gap={0.3} alignItems={"center"} mb={0.4}>
                <Typography sx={{ fontSize: 14, fontWeight: "550" }}>{label}</Typography>
                <IconButton onClick={onEdit}><Edit sx={{ fontSize: 18, color: "primary.main" }} /></IconButton>
            </Stack>
            <ButtonBase component="div" onClick={handleClick} sx={{ backgroundColor: "rgba(249, 248, 254, 1)", height: 35, width: 200, borderRadius: 1, justifyContent: "start" }}>
                <Stack direction={"row"} alignItems={"center"} >
                    <Box component={"img"} src={icon} alt={icon} mx={1.3} sx={{ height: 18 }} />
                    <Typography sx={{ fontSize: fontSize || 14.5, fontWeight: "600", color: "rgba(5, 49, 227, 1)", mr: 2 }}>{value ? value : label}</Typography>
                    {loading && <CircularProgress size={20} />}
                </Stack>
            </ButtonBase>
        </Stack>
    )
}


export default ShipmtInfoPage