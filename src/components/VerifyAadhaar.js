import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from 'react-query';
import { useAuthContext } from '../context/AuthContext';
import QueryKey from '../QueryKey';
import { getPendingAdrVfyByUser, putAdrVerify } from '../services/serv_services';
import { customAlert, notify } from './notify';
import LoadingScreen from './loadingScreen';
import FillLabelTxtField from './FillLabelTxtField';
import { getFileUrl } from '../services/s3-service';
import ScrollBox from './ScrollBox';


function VerifyAadhaar({ modalOpen, handleModalClose, userId }) {
    const [imgUrl, setImgUrl] = useState({ front: "", back: "" });
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    let txtFieldProps = { fontSize: 14, height: 38, width: 520 };
    const { isLoading, isError, error, data: adrData } = useQuery([QueryKey.singleAdrVfy, userId], () => getPendingAdrVfyByUser({ userId }));

    useEffect(() => {
        if (!adrData)
            return;

        if (!adrData?.frontSide || !adrData?.backSide)
            return

        setLoadingScreen(true);
        getData().then((e) => {
            setLoadingScreen(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adrData?.frontSide, adrData?.backSide])

    async function getData() {
        try {
            const frontPage = await getFileUrl({ fileKey: adrData?.frontSide });
            const backPage = await getFileUrl({ fileKey: adrData?.backSide });

            setImgUrl({ front: frontPage, back: backPage });

        } catch (err) {
            console.log(err);
            customAlert(err);
        }
    }

    async function _putStatus(status) {
        setLoadingScreen(true);
        try {
            await putAdrVerify(userId, status)
            notify("success", "Updated Successfully");
            handleModalClose();
            queryClient.invalidateQueries();
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    }


    if (!adrData && userId)
        return <h2>Invalid</h2>

    if (isError) {
        customAlert(error);
        return <h2>Something went wrong</h2>
    }

    if (isLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>


    return (
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Stack direction={'row'} alignItems={"center"} mb={2}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>Verify Aadhaar</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={"center"} mb={3} >
                    <FillLabelTxtField readOnly={true} defaultValue={adrData?.aadhaarNo} name="Aadhaar Number" title={"Aadhaar Number"} {...txtFieldProps} width={250} />
                </Stack>
                <ScrollBox height={"67%"}>
                    <Stack direction={'row'} alignItems={"center"} gap={3}>
                        <Box component={"img"} src={imgUrl?.front} alt={"Aadhaar Front Page"} mr={1.1} width={"48%"} />
                        <Box component={"img"} src={imgUrl?.back} alt={"Aadhaar Back Page"} mr={1.1} width={"48%"} />
                    </Stack>
                </ScrollBox>

                <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 3 }} width={"100%"}>
                    <Button variant="text" sx={{ height: 40, width: 120 }} onClick={() => { _putStatus(0); }}>Reject</Button>
                    <Button variant="contained" type='submit' onClick={() => { _putStatus(1); }} sx={{ height: 40, width: 150 }}>Accept</Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default VerifyAadhaar;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "95%",
    bgcolor: 'background.paper',
    border: '2px solid #ffff',
    boxShadow: 24,
    px: 3,
    py: 2,
    borderRadius: 2,
    // height: "45%"
};