import { Edit, MoreVert } from '@mui/icons-material'
import { Button, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, MenuItem, ListItemIcon } from '@mui/material'
import { Stack } from '@mui/system'
import { t } from 'i18next';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BgBox from '../../../components/BgBox';
import { customAlert } from '../../../components/notify';
import OptionMenu from '../../../components/OptionMenu';
import StyledSwitch from '../../../components/StyledSwitch';
import StyledTableContainer from '../../../components/StyledTableContainer';
import { useAuthContext } from '../../../context/AuthContext';
import route from '../../../Routes';
import { getAllBoStaffs, putBoStaffStatus } from '../../../services/bo-service';
import { useTranslation } from "react-i18next";

function UserListPage() {

    const [staffRows, setStaffRows] = useState([]);
    const { setLoadingScreen, setAsyncLoading } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    // const isLarge = useMediaQuery("(min-width: 600px)");
    const [currMenuStId, setCurrMenuStId] = useState(null);
    const { t } = useTranslation();
    const columns = [
        {
            id: 'username',
            label: t("sa.userLstPg.username"),
            minWidth: 170
        },
        {
            id: 'bo_name',
            label: t("sa.userLstPg.boName"),
            minWidth: 170
        },
        {
            id: 'mobile1',
            label: t("sa.userLstPg.contact"),
            minWidth: 170,
            // format: (value) => value.toLocaleString('en-IN'),
        },
        {
            id: 'role',
            label: t("sa.userLstPg.role"),
            minWidth: 170
        },
        {
            id: 'status',
            label: t("sa.userLstPg.sts"),
            minWidth: 80
        },
        {
            id: 'options',
            label: '',
            // align: 'right',
            minWidth: 80
        },
    ];

    const optionItems = [
        {
            title: t("sa.userLstPg.edit"),
            icon: <Edit fontSize="small" />,
            fn: handleEdit
        }
    ]


    const handleOptionClick = (event, stId) => {
        setAnchorEl(event.currentTarget);
        setCurrMenuStId(stId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleEdit() {
        const selectedStaff = staffRows.filter((e) => e.staffId === currMenuStId);
        handleClose();
        navigate(route.editUser + selectedStaff[0].staffId, { state: { staffData: selectedStaff[0] } });
    }


    async function handleRowClick(rowStId) {
        const selectedStaff = staffRows.filter((e) => e.staffId === rowStId);
        handleClose();
        navigate(route.userInfo + selectedStaff[0].staffId);
    }

    async function getAllBoStaffsData() {
        try {
            const data = await getAllBoStaffs();
            setStaffRows(data ? data : []);
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
    };

    useEffect(() => {
        setLoadingScreen(true);
        getAllBoStaffsData().then((e) => setLoadingScreen(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function updateStaffStatus(stRows) {
        setAsyncLoading(true);
        try {
            let status = stRows.status === 1 ? 0 : 1;
            await putBoStaffStatus(stRows.staffId, status)
            await getAllBoStaffsData();
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setAsyncLoading(false)
    }

    async function handleBoRowClick(boId) {
        navigate(route.boInfo + boId);
    }


    return (
        <BgBox>
            <Stack direction={'row'} justifyContent='space-between' m={2} >
                <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.userLstPg.boUser")}</Typography>
            </Stack>
            <StyledTableContainer>
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
                    {staffRows.map((stRow) => {
                        return (
                            <TableRow hover tabIndex={-1} key={stRow.staffId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                {columns.map((column) => {
                                    const value = stRow[column.id];
                                    return (
                                        (column.id === 'status') ?
                                            <TableCell key={column.id} align={column.align}>
                                                <StyledSwitch checked={stRow.status ? true : false} onClick={() => { updateStaffStatus(stRow) }} />
                                            </TableCell> : (column.id === 'options') ?
                                                <TableCell key={column.id} align={column.align}>
                                                    <IconButton onClick={(e) => { handleOptionClick(e, stRow.staffId) }}>
                                                        <MoreVert />
                                                    </IconButton>
                                                </TableCell> : (column.id === 'username') ?
                                                    <TableCell key={column.id} align={column.align} >
                                                        <Button variant="text" sx={{ color: "#000000" }} onClick={() => { handleRowClick(stRow.staffId); }}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </Button>
                                                    </TableCell> : (column.id === 'bo_name') ?
                                                        <TableCell key={column.id} align={column.align} >
                                                            <Button variant="text" sx={{ color: "#000000" }} onClick={() => { handleBoRowClick(stRow.backofficeId); }}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
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
            </StyledTableContainer>
        </BgBox>
    )
}

export default UserListPage;