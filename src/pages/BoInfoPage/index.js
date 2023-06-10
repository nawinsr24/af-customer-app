import { Add, Edit, MoreVert } from '@mui/icons-material';
import { Button, IconButton, ListItemIcon, MenuItem, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack } from '@mui/system'
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FillLabelTxtField from '../../components/FillLabelTxtField';
import { customAlert } from '../../components/notify';
import OptionMenu from '../../components/OptionMenu';
import ScrollBox from '../../components/ScrollBox';
import StyledSwitch from '../../components/StyledSwitch';
import StyledTableContainer from '../../components/StyledTableContainer';
import { useAuthContext } from '../../context/AuthContext';
import route from '../../Routes';
import { getBoById, putStaffStatus } from '../../services/bo-service';
import { useTranslation } from "react-i18next";


function BoInfoPage() {
    const { setLoadingScreen } = useAuthContext();
    const navigate = useNavigate();
    const { boId } = useParams();
    const [boData, setBoData] = useState(null);
    const isLarge = useMediaQuery("(min-width: 600px)");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [currMenuStaffId, setCurrMenuStaffId] = useState(null);
    const { t } = useTranslation();

    const columns = [
        {
            id: 'username',
            label: t("boInfoPg.email"),
            minWidth: 170
        },
        {
            id: 'status',
            label: t("boInfoPg.sts"),
            minWidth: 50
        },
        {
            id: 'options',
            label: '',
            // align: 'right',
            minWidth: 50
        },
    ];
    

    async function getBoData() {
        try {
            const data = await getBoById(boId);
            console.log();
            setBoData(data);
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
    }


    const optionItems = [
        {
            title: t("boInfoPg.edit"),
            icon: <Edit fontSize="small" />,
            fn: handleStaffEdit
        }
    ]
    async function handleStaffEdit() {
        const selectedStaff = boData.staffs.filter((e) => e.staffId === currMenuStaffId);
        navigate(route.editUser + selectedStaff[0].staffId, { state: { staffData: selectedStaff[0] } });
    }

    async function handleEdit() {
        navigate(route.editBo + boId, { state: { boData: boData } });
    }

    async function handleAddUser() {
        navigate(route.addUser + "?boId=" + boData.id, { state: { boData: boData } });
    }

    const handleOptionClick = (event, staffId) => {
        setAnchorEl(event.currentTarget);
        setCurrMenuStaffId(staffId);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleRowClick(rowStId) {
        const selectedStaff = boData.staffs.filter((e) => e.staffId === rowStId);
        handleClose();
        navigate(route.userInfo + selectedStaff[0].staffId);
    }

    async function updateBoStatus(stRows) {
        setLoadingScreen(true);
        try {
            let status = stRows.status === 1 ? 0 : 1;
            await putStaffStatus(stRows.staffId, status)
            await getBoData();
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    }



    useEffect(() => {
        setLoadingScreen(true);
        getBoData().then((e) => setLoadingScreen(false));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Stack direction={'row'} alignItems={''} sx={{ height: "100%" }} >
            <Box py={2} px={3} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: "100%", border: 1, borderColor: '#E3E3E3', width: isLarge ? "52%" : "40rem", mr: 2 }}>

                {boData ? <form noValidate>
                    <ScrollBox>
                        <Stack direction={'row'} justifyContent='space-between' my={2} ml={2} width={500}>
                            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("boInfoPg.boInfo")}</Typography>
                            <Button variant='outlined' color='primary' sx={{ border: 2, height: 35, '&:hover': { border: 2 } }} onClick={handleEdit}> {t("boInfoPg.editInfo")}</Button>
                        </Stack>
                        <Stack gap={2} ml={2} mt={1}>
                            <FillLabelTxtField name="bo_name" title={t("boInfoPg.boName")} defaultValue={boData?.bo_name} readOnly={true} />
                            <FillLabelTxtField name="bo_mobile" title={t("boInfoPg.lNum")} defaultValue={boData?.bo_mobile} readOnly={true} />
                            <FillLabelTxtField name="bo_address" title={t("boInfoPg.address")} multiline={true} height={103} defaultValue={boData?.bo_address} readOnly={true} />
                            <FillLabelTxtField name="bo_city" title={t("boInfoPg.city")} defaultValue={boData?.bo_city} readOnly={true} />
                        </Stack>
                    </ScrollBox>

                </form> : <Typography component={'h1'}>Something went wrong</Typography>}
            </Box>

            <Box py={2} px={3} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: "100%", border: 1, borderColor: '#E3E3E3', width: isLarge ? "45%" : "30rem" }}>
                <Stack direction={'row'} justifyContent='space-between' mx={2} mt={2} mb={1} >
                    <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("boInfoPg.user")}</Typography>
                    <Button variant='contained' color='primary' startIcon={<Add />} sx={{ height: 35 }} onClick={handleAddUser}>{t("boInfoPg.addUser")}</Button>
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
                                                    <StyledSwitch checked={stRow.status ? true : false} onClick={() => { updateBoStatus(stRow) }} />
                                                </TableCell> : (column.id === 'options') ?
                                                    <TableCell key={column.id} align={column.align}>
                                                        <IconButton onClick={(e) => { handleOptionClick(e, stRow.staffId) }}>
                                                            <MoreVert />
                                                        </IconButton>
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

                    <OptionMenu open={open} handleClose={handleClose} anchorEl={anchorEl} >
                        {optionItems.map((i) => <MenuItem
                            sx={{ pl: 2, pr: 5 }}
                            key={i.title}
                            onClick={i.fn}>
                            <ListItemIcon > {i.icon}</ListItemIcon>
                            {i.title}
                        </MenuItem>)}
                    </OptionMenu>
                </StyledTableContainer> : <Typography component={'h1'}>Something went wrong</Typography>}

            </Box>
        </Stack>
    )
}

export default BoInfoPage