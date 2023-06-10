import { Add, BorderColor, Delete } from '@mui/icons-material'
import { Button, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BgBox from '../../../components/BgBox';
import { customAlert, notify } from '../../../components/notify';
import StyledTableContainer from '../../../components/StyledTableContainer';
import route from '../../../Routes';
import { deleteReportConfig, getAllReportConfigs } from '../../../services/bo-service';
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from 'react-query';
import QueryKey from '../../../QueryKey';
import LoadingScreen from '../../../components/loadingScreen';
import { formatDateTime, formatReptConfigJson } from '../../../utils/format';
import AddReportConfig from './AddReportConfig';
import EditReportConfig from './EditReportConfig';

function ReportConfigList() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // const isLarge = useMediaQuery("(min-width: 600px)");
    const { t } = useTranslation();
    const { isLoading, isError, error, data } = useQuery([QueryKey.reportConfigList], getAllReportConfigs);

    const [currReptCfgObj, setCurrReptCfgObj] = useState(null)

    const [addRptCfgMdl, setAddRptCfgMdl] = useState(false);
    const handleAddRptCfgMdlClose = () => setAddRptCfgMdl(false);
    const handleAddRptCfgMdlOpen = () => setAddRptCfgMdl(true);

    const [editRptCfgMdl, setEditRptCfgMdl] = useState(false);
    const handleEditRptCfgMdlClose = () => setEditRptCfgMdl(false);
    const handleEditRptCfgMdlOpen = () => setEditRptCfgMdl(true);


    const columns = [
        {
            id: 'configName',
            label: t("sa.reptConfig.name"),
            minWidth: 170
        },
        {
            id: 'config',
            label: t("sa.reptConfig.configElement"),
            minWidth: 280,
            // format: (value) => value.toLocaleString('en-IN'),
        },
        {
            id: 'c_at',
            label: t("sa.reptConfig.createdAt"),
            minWidth: 80
        },
        {
            id: 'edit',
            label: "",
            minWidth: 50
        },
        {
            id: 'delete',
            label: "",
            minWidth: 50
        }
    ];


    async function handleEdit(data) {
        setCurrReptCfgObj(data);
        handleEditRptCfgMdlOpen()
    }

    async function handleDelete(id) {
        try {
            await deleteReportConfig(id)
            queryClient.invalidateQueries();
            notify("success", "Report Config Deleted Successfully");
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
    }



    if (isError) {
        customAlert(error);
        return <h2>Something went wrong</h2>
    }

    if (isLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

    return (
        <BgBox>
            <Stack direction={'row'} justifyContent='space-between' m={2} >
                <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.reptConfig.reptConfig")}</Typography>
                <Button variant='contained' startIcon={<Add />} color='primary' onClick={handleAddRptCfgMdlOpen}>{t("sa.reptConfig.addNewConfig")}</Button>
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
                    {data.map((i) => {
                        return (
                            <TableRow hover tabIndex={-1} key={i.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                {columns.map((column) => {
                                    const value = i[column.id];
                                    return (
                                        (column.id === 'configName') ?
                                            <TableCell key={column.id} align={column.align} >
                                                <Button variant="text" sx={{ color: "#000000" }}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </Button>
                                            </TableCell> : 
                                            (column.id === 'config') ?
                                                <TableCell key={column.id} align={column.align} >
                                                    {formatReptConfigJson(value)}
                                                </TableCell> : (column.id === 'edit') ?
                                                    <TableCell key={column.id} align={column.align} >
                                                        <IconButton onClick={() => { handleEdit(i); }}>
                                                            <BorderColor color='info' fontSize={"small"} />
                                                        </IconButton>
                                                    </TableCell> : (column.id === 'delete') ?
                                                        <TableCell key={column.id} align={column.align} >
                                                            <IconButton onClick={() => { handleDelete(i.id); }}>
                                                                <Delete color='error' fontSize={"small"} />
                                                            </IconButton>
                                                        </TableCell> : (column.id === 'c_at') ?
                                                            <TableCell key={column.id} align={column.align} >
                                                                {formatDateTime(data.c_at)}
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

            </StyledTableContainer>
            {data && <AddReportConfig modalOpen={addRptCfgMdl} handleModalClose={handleAddRptCfgMdlClose} />}
            {currReptCfgObj && <EditReportConfig modalOpen={editRptCfgMdl} handleModalClose={handleEditRptCfgMdlClose} data={currReptCfgObj} />}
        </BgBox>
    )
}

export default ReportConfigList;