import { Button, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack } from '@mui/system'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useAuthContext } from '../../../context/AuthContext';
import { getBoById, getStaffById, putStaffStatus } from '../../../services/bo-service';
import { customAlert, notify } from '../../../components/notify';
import route from '../../../Routes';
import ScrollBox from '../../../components/ScrollBox';
import StyledTableContainer from '../../../components/StyledTableContainer';
import StyledSwitch from '../../../components/StyledSwitch';
import { useQuery, useQueryClient } from 'react-query';
import QueryKey from '../../../QueryKey';
import LoadingScreen from '../../../components/loadingScreen';
import BgBox from '../../../components/BgBox';
import ChangePwdPopUp from '../../../components/ChangePwdPopUp';
import { useState } from 'react';
import { capFirstLetter } from '../../../utils/format';
import CtrlFillLabelTxtField from '../../../components/CtrlFillLabelTxtField';


function BoUserInfoPage() {
    const { setLoadingScreen, ctxtUser, setAsyncLoading, ctxtlogout } = useAuthContext();
    const navigate = useNavigate();
    const isLarge = useMediaQuery("(min-width: 600px)");
    const { t } = useTranslation();
    const { isLoading, isError, error, data: staffData } = useQuery([QueryKey.boUser, ctxtUser.userId], () => getStaffById(ctxtUser.userId))
    const { isLoading: isBoLoading, isError: isBoErr, error: boErr, data: boData, refetch } = useQuery([QueryKey.singleBo, staffData?.backofficeId], () => getBoById(staffData?.backofficeId))
    const [modalPwdOpen, setmodalPwdOpen] = useState(false);
    const handleModalPwdClose = () => setmodalPwdOpen(false);
    const handleModalPwdOpen = () => setmodalPwdOpen(true);


    const columns = [
        {
            id: 'username',
            label: t("bo.boUserInfoPg.email1"),
            minWidth: 170
        },
        {
            id: 'status',
            label: t("bo.boUserInfoPg.sts"),
            minWidth: 50
        }
    ];


    async function handleRowClick(rowStId) {
        const selectedStaff = boData.staffs.filter((e) => e.staffId === rowStId);
        navigate(route.BoStaffInfo + selectedStaff[0].staffId);
    }


    async function updateBoStatus(stRows) {
        setLoadingScreen(true);
        try {
            let status = stRows.status === 1 ? 0 : 1;
            await putStaffStatus(stRows.staffId, status)
            refetch()
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    }

    function handleLogout() {
        setAsyncLoading(true);
        ctxtlogout();
        setAsyncLoading(false);
        notify("info", "Logout successfully");
    }

    function handleAbout() {
        navigate(route.BoAbout);
    }

    async function handleEdit() {
        navigate(route.BoEditUser + staffData.staffId, { state: { staffData: staffData } });
    }


    if (isError || isBoErr) {
        customAlert(error || boErr);
        return <h2>Something went wrong</h2>
    }

    if (isLoading || isBoLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>


    return (
        <>
           <ScrollBox height={"100%"} width={"100%"}>
                <BgBox height={"90%"} width={"98.2%"}>
                    <Stack direction={'row'} justifyContent='space-between' my={1} >
                        <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.boUserInfoPg.profile")}</Typography>
                        {/* <Stack direction={'row'}>
                            <Button variant='contained' color='primary' sx={{ height: 35 }} onClick={handleModalPwdOpen}> Change Password</Button>
                            <Box width={8} />
                            <Button variant='outlined' sx={{ border: 2, height: 35, color: "red" }} onClick={handleLogout}> Logout</Button>
                        </Stack> */}
                        <Stack direction={'row'}>
                            <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleEdit}> {t("bo.boUserInfoPg.edit")}</Button>
                            <Box width={8} />
                            <Button variant='contained' color='primary' sx={{ height: 35 }} onClick={handleModalPwdOpen}>{t("bo.boUserInfoPg.changePw")}</Button>
                        </Stack>
                    </Stack>

                    <Stack direction={'row'} my={2}>
                        <Stack gap={3} width={"50%"}>
                            <CtrlFillLabelTxtField title={t("bo.boUserInfoPg.name")} value={capFirstLetter(staffData?.staff_name)} readOnly={true} fontSize={14} height={38} />
                            <CtrlFillLabelTxtField title={t("bo.boUserInfoPg.role")} value={capFirstLetter(staffData?.role)} readOnly={true} fontSize={14} height={38} />
                            <CtrlFillLabelTxtField title={t("bo.boUserInfoPg.email")} value={staffData?.username} readOnly={true} fontSize={14} height={38} />
                        </Stack>
                        <Stack gap={3} >
                            <CtrlFillLabelTxtField title={t("bo.boUserInfoPg.mNum1")} value={staffData?.mobile1} readOnly={true} fontSize={14} height={38} />
                            <CtrlFillLabelTxtField title={t("bo.boUserInfoPg.mNum2")} value={staffData?.mobile2} readOnly={true} fontSize={14} height={38} />
                            <Stack direction={"row"} mt={3}>
                                <Button variant="text" sx={{ height: 35, color: "red", mr: 2 }} onClick={handleLogout}>{t("bo.boUserInfoPg.logout")}</Button>
                                <Button variant="text" sx={{ height: 35 }} onClick={handleAbout}>{t("bo.boUserInfoPg.about")}</Button>
                            </Stack>
                        </Stack>
                    </Stack>


                </BgBox>
                <Stack direction={'row'} sx={{ height: "90%" }} mt={2}>
                    <Box py={2} px={3} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: "100%", border: 1, borderColor: '#E3E3E3', width: isLarge ? "52%" : "40rem", mr: 2 }}>

                        {boData ? <form noValidate>
                            <ScrollBox>
                                <Stack direction={'row'} justifyContent='space-between' my={2} ml={2} width={500}>
                                    <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.boUserInfoPg.boInfo")}</Typography>
                                </Stack>
                                <Stack gap={3} ml={2} mt={1}>
                                    <CtrlFillLabelTxtField name="bo_name" title={t("bo.boUserInfoPg.boInfo")} value={boData?.bo_name} readOnly={true} fontSize={14} height={38} />
                                    <CtrlFillLabelTxtField name="bo_mobile" title={t("bo.boUserInfoPg.lNum")} value={boData?.bo_mobile} readOnly={true} fontSize={14} height={38} />
                                    <CtrlFillLabelTxtField name="bo_address" title={t("bo.boUserInfoPg.address")} multiline={true} height={103} value={boData?.bo_address} readOnly={true} fontSize={14} />
                                    <CtrlFillLabelTxtField name="bo_city" title={t("bo.boUserInfoPg.city")} value={boData?.bo_city} readOnly={true} fontSize={14} height={38} />
                                </Stack>
                            </ScrollBox>

                        </form> : <Typography component={'h1'}>Something went wrong</Typography>}
                    </Box>

                    <Box py={2} px={3} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: "100%", border: 1, borderColor: '#E3E3E3', width: isLarge ? "45%" : "30rem" }}>
                        <Stack direction={'row'} justifyContent='space-between' mx={2} mt={2} mb={1} >
                            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.boUserInfoPg.user")}</Typography>
                        </Stack>
                        {boData ? <StyledTableContainer>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            sx={{ color: "#8392AB", fontWeight: "bold", py: 1 }}
                                            key={column.id}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(boData?.staffs || []).map((stRow) => {
                                    return (
                                        <TableRow hover tabIndex={-1} key={stRow.staffId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                            {columns.map((column) => {
                                                const value = stRow[column.id];
                                                return (
                                                    (column.id === 'status') ?
                                                        <TableCell key={column.id} align={column.align}>
                                                            <StyledSwitch checked={stRow.status ? true : false} onClick={() => { updateBoStatus(stRow) }} disabled />
                                                        </TableCell> : (column.id === 'username') ?
                                                            <TableCell key={column.id} align={column.align} >
                                                                <Button variant="text" sx={{ color: "#000000", fontWeight: stRow.role === 'admin' ? "600" : "normal" }} onClick={() => { handleRowClick(stRow.staffId); }}>
                                                                    {stRow.role === 'admin' ? value + " (Admin)" : value}
                                                                </Button>
                                                            </TableCell> :
                                                            <TableCell key={column.id} align={column.align} >
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                            </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </StyledTableContainer> : <Typography component={'h1'}>Something went wrong</Typography>}

                    </Box>
                </Stack>
            </ScrollBox>
            {staffData && <ChangePwdPopUp modalOpen={modalPwdOpen} handleModalClose={handleModalPwdClose} userId={staffData.staffId} />}
        </>
    )
}

export default BoUserInfoPage