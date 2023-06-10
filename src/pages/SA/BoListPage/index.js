import { Add, Edit, MoreVert, PersonAdd } from '@mui/icons-material'
import { Button, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, MenuItem, ListItemIcon } from '@mui/material'
import { Stack } from '@mui/system'
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
import { getAllBo, putBoStatus } from '../../../services/bo-service';
import { useTranslation } from "react-i18next";

function BoListPage() {

    const [boRows, setBoRows] = useState([]);
    const { setLoadingScreen, setAsyncLoading } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    // const isLarge = useMediaQuery("(min-width: 600px)");
    const [currMenuBoId, setCurrMenuBoId] = useState(null);
    const { t } = useTranslation();

    const optionItems = [
        {
            title: t("sa.boLstPg.edit"),
            icon: <Edit fontSize="small" />,
            fn: handleEdit
        },
        {
            title: t("sa.boLstPg.addUser"),
            icon: <PersonAdd fontSize="small" />,
            fn: handleAddUser
        }
    ]
    
    const columns = [
        {
            id: 'bo_name',
            label: t("sa.boLstPg.bo"),
            minWidth: 170
        },
        {
            id: 'staffsCount',
            label: t("sa.boLstPg.sCount"),
            minWidth: 170,
            format: (value) => value.toLocaleString('en-IN'),
        },
        {
            id: 'bo_city',
            label: t("sa.boLstPg.location"),
            minWidth: 170
        },
        {
            id: 'bo_mobile',
            label: t("sa.boLstPg.contact"),
            minWidth: 170
        },
        {
            id: 'status',
            label: t("sa.boLstPg.sts"),
            minWidth: 80
        },
        {
            id: 'options',
            label: '',
            // align: 'right',
            minWidth: 80
        },
    ];


    const handleOptionClick = (event, boId) => {
        setAnchorEl(event.currentTarget);
        setCurrMenuBoId(boId);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleEdit() {
        const selectedBo = boRows.filter((e) => e.id === currMenuBoId);
        handleClose();
        navigate(route.editBo + selectedBo[0].id, { state: { boData: selectedBo[0] } });
    }
    async function handleAddUser() {
        const selectedBo = boRows.filter((e) => e.id === currMenuBoId);
        handleClose();
        navigate(route.addUser + "?boId=" + selectedBo[0].id, { state: { boData: selectedBo[0] } });
    }

    async function handleRowClick(rowBoId) {
        const selectedBo = boRows.filter((e) => e.id === rowBoId);
        handleClose();
        navigate(route.boInfo + selectedBo[0].id);
    }

    async function getAllBoData() {
        try {
            const data = await getAllBo();
            setBoRows(data ? data : []);
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
    };

    useEffect(() => {
        setLoadingScreen(true);
        getAllBoData().then((e) => setLoadingScreen(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function updateBoStatus(boRows) {
        setAsyncLoading(true);
        try {
            let status = boRows.status === 1 ? 0 : 1;
            await putBoStatus(boRows.id, status)
            await getAllBoData();
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setAsyncLoading(false)
    }

    function handleAddBoClick() {
        navigate(route.saAddBo);
    }



    return (
        <BgBox>
            <Stack direction={'row'} justifyContent='space-between' m={2} >
                <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.boLstPg.bo")}</Typography>
                <Button variant='contained' startIcon={<Add />} color='primary' onClick={handleAddBoClick}>{t("sa.boLstPg.addBo")}</Button>
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
                    {boRows.map((boRows) => {
                        return (
                            <TableRow hover tabIndex={-1} key={boRows.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                {columns.map((column) => {
                                    const value = boRows[column.id];
                                    return (
                                        (column.id === 'status') ?
                                            <TableCell key={column.id} align={column.align}>
                                                <StyledSwitch checked={boRows.status ? true : false} onClick={() => { updateBoStatus(boRows) }} />
                                            </TableCell> : (column.id === 'options') ?
                                                <TableCell key={column.id} align={column.align}>
                                                    <IconButton onClick={(e) => { handleOptionClick(e, boRows.id) }}>
                                                        <MoreVert />
                                                    </IconButton>
                                                </TableCell> : (column.id === 'bo_name') ?
                                                    <TableCell key={column.id} align={column.align} >
                                                        <Button variant="text" sx={{ color: "#000000" }} onClick={() => { handleRowClick(boRows.id); }}>
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

export default BoListPage;