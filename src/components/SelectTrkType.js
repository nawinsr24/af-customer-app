import { Button, Grid, Modal, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState } from 'react';
import { useQuery } from 'react-query';
import QueryKey from '../QueryKey';
import { getAllTrkTypes } from '../services/cust-service';
import LoadingScreen from './loadingScreen';
import { customAlert } from './notify';
import ScrollBox from './ScrollBox';
import TrkSubTypeCard from './TrkSubTypeCard';
import TrkTypeCard from './TrkTypeCard';
import { useTranslation } from "react-i18next";


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 660,
    bgcolor: 'background.paper',
    border: '2px solid #ffff',
    boxShadow: 24,
    px: 1.5,
    py: 1.5,
    borderRadius: 2,
    height: 600
};


function SelectTrkType({ handleClose, open, handleSetTrkType, initSelTrkTypeObj }) {

    const { isLoading, isError, error, data } = useQuery([QueryKey.trkTypes], getAllTrkTypes);
    const [selTrkType, setSelTrkType] = useState(initSelTrkTypeObj || {})
    const { t } = useTranslation();


    if (isError) {
        customAlert(error);
        return <h2>Something went wrong</h2>
    }

    if (isLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>


    function handleSelTrkType(typeObj) {
        setSelTrkType({ ...typeObj })
    }


    function handleOnConfirm() {
        let copySelTrkType = { ...selTrkType };
        for (var key in copySelTrkType) {
            if (key.startsWith("_"))
                delete copySelTrkType[key]
        }
        handleSetTrkType(copySelTrkType);
        handleClose()
    }


    
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={modalStyle}>
                <Typography sx={{ fontWeight: "bold", fontSize: 22, mb: 2, mt: 1, ml: 5 }}>{t("bo.selTrkType.selTrkType")}</Typography>

                <ScrollBox height={"80%"}>
                    <Box px={2}>
                        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                            {data?.map((i) => <Grid item xs="auto" key={i?.id}><TrkTypeCard trkType={i?.type} handleSelTrkType={handleSelTrkType} selTrkType={selTrkType} /></Grid>)}
                        </Grid>


                        {selTrkType?.a_Vehicle && <Stack className={"val1"} mt={3} >
                            <Typography sx={{ fontWeight: "bold", fontSize: 16, mb: 2, mt: 1, ml: 3 }}>{selTrkType?._vhclObj?.val1[selTrkType?._vhclObj?.val1?.length - 1]}</Typography>
                            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                                {selTrkType?._vhclObj?.val1?.map((value, index) =>
                                    index !== selTrkType?._vhclObj?.val1?.length - 1 && <Grid item xs="auto" key={value}>
                                        <TrkSubTypeCard item={value} index={index} handleSelTrkType={handleSelTrkType} selTrkType={selTrkType} valId={"val1"} />
                                    </Grid>)}
                            </Grid>
                        </Stack>}

                        {(selTrkType?._val2 && selTrkType?._vhclObj?.val2) && <Stack className={"val2"} mt={3} >
                            <Typography sx={{ fontWeight: "bold", fontSize: 16, mb: 2, mt: 1, ml: 3 }}>
                                {selTrkType?._val2[selTrkType?._val2?.length - 1]}
                            </Typography>
                            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                                {selTrkType?._val2?.map((value, index) => {
                                    return index !== selTrkType?._val2?.length - 1 && <Grid item xs="auto" key={value}>
                                        <TrkSubTypeCard item={value} index={index} handleSelTrkType={handleSelTrkType} selTrkType={selTrkType} valId={"val2"} />
                                    </Grid>
                                }
                                )}
                            </Grid>
                        </Stack>}

                        {(selTrkType?._val3 && selTrkType?._vhclObj?.val3) && <Stack className={"val3"} mt={3} >
                            <Typography sx={{ fontWeight: "bold", fontSize: 16, mb: 2, mt: 1, ml: 3 }}>
                                {selTrkType?._val3[selTrkType?._val3?.length - 1]}
                            </Typography>
                            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                                {selTrkType?._val3?.map((value, index) => {
                                    return index !== selTrkType?._val3?.length - 1 && <Grid item xs="auto" key={value}>
                                        <TrkSubTypeCard item={value} index={index} handleSelTrkType={handleSelTrkType} selTrkType={selTrkType} valId={"val3"} />
                                    </Grid>
                                }
                                )}
                            </Grid>
                        </Stack>}

                        {(selTrkType?._val4 && selTrkType?._vhclObj?.val4) && <Stack className={"val4"} mt={3} >
                            <Typography sx={{ fontWeight: "bold", fontSize: 16, mb: 2, mt: 1, ml: 3 }}>
                                {selTrkType?._val4[selTrkType?._val4?.length - 1]}
                            </Typography>
                            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                                {selTrkType?._val4?.map((value, index) => {
                                    return index !== selTrkType?._val4?.length - 1 && <Grid item xs="auto" key={value}>
                                        <TrkSubTypeCard item={value} index={index} handleSelTrkType={handleSelTrkType} selTrkType={selTrkType} valId={"val4"} />
                                    </Grid>
                                }
                                )}
                            </Grid>
                        </Stack>}


                    </Box>
                </ScrollBox>
                <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
                    <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={handleClose}>{t("bo.selTrkType.cancel")}</Button>
                    <Button variant="contained" sx={{ height: 40, width: 120, mr: 2 }} onClick={handleOnConfirm}>{t("bo.selTrkType.confirm")}</Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default SelectTrkType