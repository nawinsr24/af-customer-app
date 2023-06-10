import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import BgBox from '../../../components/BgBox'
import LoadingScreen from '../../../components/loadingScreen'
import { customAlert } from '../../../components/notify'
import ScrollBox from '../../../components/ScrollBox'
import { getSingleCust } from '../../../services/cust-service'
import { getSingleCustReq } from '../../../services/req_service'
import { capFirstLetter, formatDateWithJs, getFormatedUnit, makeTxtOverFLow } from '../../../utils/format'
import mailSVG from '../../../assets/svg/Mail.svg'
import phoneSVG from '../../../assets/svg/Phone.svg'
import LabelTxt from '../../../components/LabelTxt'
import LabelTxtWithIcon from '../../../components/LabelTxtWithIcon'
import calendSVG from "../../../assets/svg/calend.svg"
import locationSVG from "../../../assets/svg/Location.svg"
import weightSVG from "../../../assets/svg/weight.svg"
import { useState } from 'react'
import route from '../../../Routes'
import QueryKey from '../../../QueryKey'
import { useEffect } from 'react'
import CombineReqCard from '../../../components/combineGrp/CombineReqCard'
import { useTranslation } from "react-i18next";


function CustReqInfoPage() {
    const navigate = useNavigate();
    const { custReqId } = useParams();
    const isLarge = useMediaQuery("(min-width: 600px)");
    const { t } = useTranslation();

    const [trkTypeObj, setTrkTypeObj] = useState({})
    const { isLoading, isError, error, data: custReqData } = useQuery([QueryKey.singleCustReq, custReqId], () => getSingleCustReq(custReqId));
    const { isLoading: isCusLoading, isError: isCusError, error: cusError, data: custData } = useQuery([QueryKey.singleCust, custReqData?.custId], () => getSingleCust(custReqData?.custId), {
        //enabled: Boolean(custReqData?.custId)
    });

    useEffect(() => {
        if (!custReqData)
            return;

        let obj = JSON.parse(custReqData?.preTruckTypes);
        delete obj.c_ImgPath
        delete obj.b_Suggestions
        setTrkTypeObj(obj)
    }, [custReqData]);

    if (!custReqData && custReqId)
        return <h2>Invalid Customer Request</h2>

    if (isError || isCusError) {
        customAlert(error || cusError);
        return <h2>Something went wrong</h2>
    }

    if (isLoading || isCusLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

    if (custReqData === null)
        return <h2>Invalid Customer Request Id</h2>

    const titleTxtStyle = { fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.3)" }
    const secTxtStyle = { fontWeight: "600", color: "rgba(0, 0, 0, 0.5)", fontSize: 15 }
    const iconStyle = { height: 20 }
    const boxStyle = { bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: 10, fontWeight: "600" }



    function handleCombineReqClick(combCustReqId) {
        navigate(route.boCustReqInfo + combCustReqId);
    }

    function handleEdit() {
        navigate(route.boEditCustReq + custReqId);
    }

    async function handleAddShipmt() {
        navigate(route.boAddShipmt + "?custReqId=" + custReqId);
    }


    return (
        <>
            <ScrollBox height={"100%"}>
                <Stack direction={'row'} justifyContent='space-between' mb={2} >
                    <Stack direction={'row'} alignItems={"end"}>
                        <Typography variant='h5' sx={{ fontWeight: "bold", mr: 1 }}>{t("bo.custReqInfoPg.custReq")}</Typography>
                        <Typography sx={titleTxtStyle}>({custReqId})</Typography>
                    </Stack>
                    <Stack direction={'row'}>
                        <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleEdit}>{t("bo.custReqInfoPg.edit")}</Button>
                        <Box width={8} />
                        <Button variant='contained' color='primary' sx={{ height: 35 }} onClick={handleAddShipmt}>{t("bo.custReqInfoPg.createShipment")}</Button>
                    </Stack>
                </Stack>
                {custData?.type === "individual" ?
                    <IndividualDetails custReqData={custReqData} custData={custData} titleTxtStyle={titleTxtStyle} secTxtStyle={secTxtStyle} iconStyle={iconStyle} boxStyle={boxStyle} /> :
                    <CompanyDetails custReqData={custReqData} custData={custData} titleTxtStyle={titleTxtStyle} secTxtStyle={secTxtStyle} iconStyle={iconStyle} boxStyle={boxStyle} />}
                <Stack direction={isLarge ? "row" : "column"} mt={1.5}  >
                    <BgBox px={4} py={3} width={isLarge ? "49.5%" : "70%"}>
                        <Typography sx={titleTxtStyle}>{t("bo.custReqInfoPg.delDet")}</Typography>
                        <Stack direction={"row"} mt={3} >
                            <LabelTxt label={t("bo.custReqInfoPg.consignorName")} value={capFirstLetter(custReqData?.cnorName)} minWidth={300} maxWidth={300} />
                            <LabelTxt label={t("bo.custReqInfoPg.consigneeName")} value={capFirstLetter(custReqData?.cneeName)} minWidth={300} maxWidth={300} />
                        </Stack>
                        <Stack direction={"row"} mt={3} >
                            <LabelTxt label={t("bo.custReqInfoPg.cnorContDet")} value={custReqData?.cnorMobile + " - " + custReqData?.cnorEmail} minWidth={300} maxWidth={300} />
                            <LabelTxt label={t("bo.custReqInfoPg.cneeContDet")} value={custReqData?.cneeMobile + " - " + custReqData?.cneeEmail} minWidth={300} maxWidth={300} />
                        </Stack>
                        <Box sx={boxStyle} height={1.5} mr={7} width={"100%"} my={2} />
                        <Stack direction={"row"} mt={1.5}>
                            <Stack gap={2.5}>
                                <LabelTxtWithIcon label={t("bo.custReqInfoPg.pickDate")} value={formatDateWithJs(custReqData?.picDate)} icon={calendSVG} minWidth={260} maxWidth={260} />
                                <LabelTxtWithIcon label={t("bo.custReqInfoPg.pickLocation")} value={capFirstLetter(custReqData?.picLocation)} icon={locationSVG} minWidth={260} maxWidth={260} />
                            </Stack>
                            <Box sx={boxStyle} height={120} width={1.5} ml={2} mr={3} />
                            <LabelTxt label={t("bo.custReqInfoPg.pickAddress")} value={capFirstLetter(custReqData?.picAddress)} minWidth={270} maxWidth={270} />
                        </Stack>
                        <Box sx={boxStyle} height={1.5} mr={7} width={"100%"} my={2} />
                        <Stack direction={"row"} mt={1.5}>
                            <Stack gap={2.5}>
                                <LabelTxtWithIcon label={t("bo.custReqInfoPg.delDate")} value={formatDateWithJs(custReqData?.delDate)} icon={calendSVG} minWidth={260} maxWidth={260} />
                                <LabelTxtWithIcon label={t("bo.custReqInfoPg.delLocation")} value={capFirstLetter(custReqData?.delLocation)} icon={locationSVG} minWidth={260} maxWidth={260} />
                            </Stack>
                            <Box sx={boxStyle} height={120} width={1.5} ml={2} mr={3} />
                            <LabelTxt label={t("bo.custReqInfoPg.delAddress")} value={capFirstLetter(custReqData?.delAddress)} minWidth={270} maxWidth={270} />
                        </Stack>
                    </BgBox>
                    <Box width={12} />
                    <BgBox px={4} py={3} width={isLarge ? "49.5%" : "70%"}   >
                        <Typography sx={titleTxtStyle} mb={1}>{t("bo.custReqInfoPg.matDet")}</Typography>
                        <UnderLineTxt boxStyle={boxStyle} label={t("bo.custReqInfoPg.loadType")} value={getFormatedUnit(custReqData?.loadType)} line />
                        <UnderLineTxt boxStyle={boxStyle} label={t("bo.custReqInfoPg.matType")} value={custReqData?.matType} line />
                        <UnderLineTxt boxStyle={boxStyle} label={t("bo.custReqInfoPg.wei")} icon={weightSVG} value={custReqData?.weight + getFormatedUnit(custReqData?.weightUnit)} line />
                        <UnderLineTxt boxStyle={boxStyle} label={t("bo.custReqInfoPg.quan")} value={custReqData?.quantity} line />
                        <UnderLineTxt boxStyle={boxStyle} label={t("bo.custReqInfoPg.flam/frag")} value={capFirstLetter(custReqData?.matNature)} line />
                        <UnderLineTxt boxStyle={boxStyle} label={t("bo.custReqInfoPg.len")} value={custReqData?.matLength + getFormatedUnit(custReqData?.matDimsUnit)} line />
                        <UnderLineTxt boxStyle={boxStyle} label={t("bo.custReqInfoPg.wid")} value={custReqData?.matWidth + getFormatedUnit(custReqData?.matDimsUnit)} line />
                        <UnderLineTxt boxStyle={boxStyle} label={t("bo.custReqInfoPg.height")} value={custReqData?.matHeight + getFormatedUnit(custReqData?.matDimsUnit)} line />
                        <UnderLineTxt boxStyle={boxStyle} label={t("bo.custReqInfoPg.desc")} value={custReqData?.loadDesc} />
                    </BgBox>
                </Stack>
                <Stack direction={isLarge ? "row" : "column"} mt={1.5}  >
                    <BgBox px={4} py={3} width={isLarge ? "24.5%" : "40%"}>
                        <Typography sx={titleTxtStyle} mb={1}>{t("bo.custReqInfoPg.trkDet")}</Typography>
                        {Object.keys(trkTypeObj).map((key) => <UnderLineTxt value={capFirstLetter(trkTypeObj[key])} key={key}
                            label={capFirstLetter(key.split("_")[1])} minWidth={135} maxWidth={135} boxStyle={boxStyle} line />
                        )}
                    </BgBox>
                    <Box width={8} />
                    <BgBox px={4} py={3} width={isLarge ? "24.5%" : "40%"}>
                        <Typography sx={titleTxtStyle} mb={1}>{t("bo.custReqInfoPg.payDet")}</Typography>
                        <UnderLineTxt label={t("bo.custReqInfoPg.payMet")} value={getFormatedUnit(custReqData?.payType)} minWidth={135} maxWidth={135} />
                        <Stack sx={{
                            bgcolor: "rgba(223, 218, 248, 0.4)", borderRadius: 2, width: "100%", height: 70,
                            mt: 3, justifyContent: "center", alignItems: "center"
                        }}>
                            <Typography fontSize={14} color={"primary.main"}>{t("bo.custReqInfoPg.appPrice")}</Typography>
                            <Typography sx={{ fontSize: 22, fontWeight: "bold", mt: 0.5 }}><span name="Rs">&#8377;</span>{custReqData?.estPrice}</Typography>
                        </Stack>
                    </BgBox>
                    <Box width={12} />
                    <BgBox px={4} py={3} width={isLarge ? "49.5%" : "70%"}>
                        <Stack direction={"row"} justifyContent={"space-between"} mb={1} alignItems={"center"}>
                            <Typography sx={titleTxtStyle} >{t("bo.custReqInfoPg.combDet")}&nbsp;&nbsp;({makeTxtOverFLow(custReqData?.combineReqArr[0]?.grpName || "", 30)})</Typography>
                        </Stack>
                        <ScrollBox height={350}>
                            {custReqData?.combineReqArr?.map((i) =>
                                custReqId !== i?.custReqId && <Box key={i?.custReqId} onClick={() => handleCombineReqClick(i?.custReqId)}><CombineReqCard data={i} itemId={i?.custReqId} key={i?.custReqId} handleClick={handleCombineReqClick} /></Box>)
                            }
                        </ScrollBox>
                    </BgBox>
                </Stack>
            </ScrollBox>
        </>
    )
}



function UnderLineTxt({ boxStyle, label, value, line, icon, minWidth, maxWidth }) {
    return <Stack justifyContent={"center"}>
        <Stack direction={"row"} alignItems={"center"} mt={2}>
            <Typography sx={{ fontSize: 14, fontWeight: "550" }} minWidth={minWidth || 300} maxWidth={maxWidth || 300} >{label}</Typography>
            <Stack direction={"row"} alignItems={"center"} minWidth={minWidth || 300} maxWidth={maxWidth || 300} >
                {icon && <Box component={"img"} src={icon} alt={icon} mr={1.1} sx={{ height: 18 }} />}
                <Typography sx={{ fontSize: 14.5, fontWeight: "600", color: "rgba(0, 0, 0, 0.5)" }}>{value}</Typography>
            </Stack>
        </Stack>
        {line && <Box sx={boxStyle} height={1.5} width={"100%"} mt={1.3} />}
    </Stack>
}

function CompanyDetails({ custData, titleTxtStyle, secTxtStyle, iconStyle, boxStyle, custReqData }) {
    const { t } = useTranslation();

    return <BgBox height={200} px={4} py={3}>
        <Stack direction={"row"}>
            <Stack width={"49.5%"} pl={3}>
                <Typography sx={titleTxtStyle}>{t("bo.custReqInfoPg.custDet")}</Typography>
                <Stack direction={"row"}>
                    <Stack width={350}>
                        <Typography sx={{ fontSize: 22, fontWeight: "bold", my: 2 }}>{makeTxtOverFLow(capFirstLetter(custData?.fName) + " " + capFirstLetter(custData?.lName), 30)}</Typography>
                        <Stack direction={"row"} alignItems={"center"} mb={1.5}>
                            <Box component={"img"} src={mailSVG} alt={"Mail icon"} mr={1} sx={iconStyle} />
                            <Typography sx={secTxtStyle}>{custData?.email}</Typography>
                        </Stack>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box component={"img"} src={phoneSVG} alt={"Phone icon"} mr={1} sx={iconStyle} />
                            <Typography sx={secTxtStyle}>{custData?.username}</Typography>
                        </Stack>
                    </Stack>
                    <Stack gap={2} mt={2}>
                        {custData?.aadhar_no && <LabelTxt label={t("bo.custReqInfoPg.aadhaarNum")} value={custData?.aadhar_no} />}
                        {custData?.pan_no && <LabelTxt label={t("bo.custReqInfoPg.panNum")} value={custData?.pan_no} />}
                        {custData?.gst_no && <LabelTxt label={t("bo.custReqInfoPg.gstNum")} value={custData?.gst_no} />}
                        <LabelTxt label={t("bo.custReqInfoPg.type")} value={capFirstLetter(custReqData?.type)} />
                    </Stack>
                </Stack>
            </Stack>
            <Box sx={boxStyle} height={160} mr={7} width={1.5} />
            <Stack>
                <Typography sx={titleTxtStyle} mb={2} >{t("bo.custReqInfoPg.compDet")}</Typography>
                <Stack direction={"row"} >
                    <Stack gap={2} width={280}>
                        <LabelTxt label={t("bo.custReqInfoPg.cName")} value={custData?.comName} />
                        <LabelTxt label={t("bo.custReqInfoPg.cContactNum")} value={custData?.comContact_no} />
                    </Stack>
                    <Stack width={230} gap={2}>
                        <LabelTxt label={t("bo.custReqInfoPg.cAddress")} value={custData?.comContact_no} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    </BgBox>
}

function IndividualDetails({ custData, titleTxtStyle, secTxtStyle, iconStyle, boxStyle, custReqData }) {
    const { t } = useTranslation();

    const custFullName = capFirstLetter(custData?.fName) + " " + capFirstLetter(custData?.lName);

    return <BgBox height={200} px={4} py={2} width={"200%"}>
        <Typography sx={titleTxtStyle}>{t("bo.custReqInfoPg.custDet")}</Typography>
        <Stack direction={"row"} mt={2} >
            <Stack justifyContent={"center"}>
                <Typography sx={{ fontSize: 25, fontWeight: "bold", my: 2, ml: 5, mr: 5 }}>{makeTxtOverFLow(custFullName, 30)} </Typography>
            </Stack>
            <Box sx={boxStyle} height={120} mr={7} width={1.5} />
            <Stack direction={"row"} gap={custFullName.length > 25 ? 7 : 13}>
                <Stack gap={2}>
                    <LabelTxt label={t("bo.custReqInfoPg.mNum1")} value={custData?.username} />
                    <LabelTxt label={t("bo.custReqInfoPg.mNum2")} value={custData?.mobile2} />
                </Stack>
                <Stack gap={2}>
                    <LabelTxt label={t("bo.custReqInfoPg.email")} value={custData?.email} />
                    <LabelTxt label={t("bo.custReqInfoPg.type")} value={capFirstLetter(custReqData?.type)} />
                </Stack>
                <Stack gap={2}>
                    {custData?.aadhar_no && <LabelTxt label={t("bo.custReqInfoPg.aadhaarNum")} value={custData?.aadhar_no} />}
                    {custData?.pan_no && <LabelTxt label={t("bo.custReqInfoPg.panNum")} value={custData?.pan_no} />}
                    {custData?.gst_no && <LabelTxt label={t("bo.custReqInfoPg.gstNum")} value={custData?.gst_no} />}
                </Stack>
            </Stack>

        </Stack>
    </BgBox>
}

export default CustReqInfoPage