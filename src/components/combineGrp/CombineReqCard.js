import { ButtonBase, Stack, Typography } from "@mui/material";
import { formatDateWithJs, makeTxtOverFLow } from "../../utils/format";
import { useTranslation } from "react-i18next";


function CombineReqCard({ data, itemId }) {
    const { t } = useTranslation();


    return <ButtonBase component="div" sx={{ borderRadius: 1.4, mt: 1.3 }}>
        <Stack alignItems={"center"} py={1} px={2} sx={{ backgroundColor: "rgba(223, 218, 248, 0.2)", borderRadius: 1.4, height: 80, border: 1, borderColor: 'rgba(223, 218, 248, 0.9)', width: 580 }}>
            <Stack direction={"row"}>
                <Typography sx={{ fontSize: 14, fontWeight: "600", color: "primary.main", mr: 6 }}>{itemId}</Typography>

                <Stack direction={"row"} >
                    <Typography sx={{ fontSize: 12, }}>{data?.picDate ? t("bo.combReqCard.pick") : "Est Pickup:"}&nbsp; {formatDateWithJs(data?.picDate ? data?.picDate : data?.estPicDate)}</Typography>

                    <Typography sx={{ fontSize: 12, ml: 2 }}>{data?.delDate ? t("bo.combReqCard.del") : "Est Delivery:"}&nbsp; {formatDateWithJs(data?.delDate ? data?.delDate : data?.estDelDate)}</Typography>

                </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
                <Typography sx={{ fontWeight: "600", fontSize: 14 }} >{makeTxtOverFLow(data?.picLocation, 31)}</Typography>
                <Typography component={'span'} sx={{ fontWeight: "600", fontSize: 30, mx: 2, mb: 0.5 }} > &#8594;</Typography>
                <Typography component={'span'} sx={{ fontWeight: "600", fontSize: 14 }}> {makeTxtOverFLow(data?.delLocation, 31)}</Typography>
            </Stack>
        </Stack>
    </ButtonBase>
}

export default CombineReqCard;