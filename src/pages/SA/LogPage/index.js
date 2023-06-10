import React from 'react'
import { styled } from '@mui/material/styles';
import { Pagination, ToggleButton, ToggleButtonGroup, Typography, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import BgBox from "../../../components/BgBox";
import { customAlert } from "../../../components/notify";
import SearchTxtField from "../../../components/SearchTxtField";
import { getLogData } from "../../../services/req_service";
import { FaSortAmountDownAlt, FaSortAmountDown } from 'react-icons/fa';
import CustomDropDown from '../../../components/CustomDropDown';
import { useTranslation } from "react-i18next";
import QueryKey from '../../../QueryKey';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import { capFirstLetter, formatDateTime } from '../../../utils/format';
import StyledTableContainer from '../../../components/StyledTableContainer';



const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        // margin: theme.spacing(0.5),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

function LogPage() {
    const { t } = useTranslation();
    const ddArr = [
        { value: "userType", label: t("sa.logPage.userType") },
        { value: "action", label: t("sa.logPage.action") }
    ];

    const [pageNumber, setPageNumber] = useState(1);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [searchType, setSearchType] = useState(ddArr[0].value);
    const [searchKeyType, setSearchKeyType] = useState(ddArr[0].value);
    const [order, setOrder] = useState('desc');
    const limit = 10

    const { isLoading, isError, error, data: logrow } = useQuery(
        [QueryKey.logPage, pageNumber, searchKeyWord, searchKeyType, order],
        () => getLogData({ pageNumber, limit, searchKeyWord, searchType: searchKeyType, order }), {
        keepPreviousData: true
    });


    const columns = [
        {
            id: 'username',
            label: t("sa.logPage.name"),
            minWidth: 150
        },
        {
            id: 'userType',
            label: t("sa.logPage.userType"),
            minWidth: 150
        },
        {
            id: 'action',
            label: t("sa.logPage.action"),
            minWidth: 150,

        },
        {
            id: 'description',
            label: t("sa.logPage.desc"),
            minWidth: 170
        },
        {
            id: 'c_at',
            label: t("sa.logPage.createdAt"),
            minWidth: 80
        },

    ];




    async function onOrderChange(e, or) {
        if (or == null)
            return

        setOrder(or);
        setPageNumber(1);
    }


    const handlePageChange = async (event, value) => {
        setPageNumber(value);
    };

    async function onSearchBtnClick(e) {
        setSearchKeyWord(searchWord);
        setSearchKeyType(searchType);
        setPageNumber(1);
    }

    function onSearch(e) {
        setSearchWord(e.target.value)
    }

    function handleDDChange(e) {
        const { value } = e.target;
        setSearchType(value);
    }

    function getSrchTypeTxt() {
        let filteredObj = ddArr.filter((i) => i.value === searchType);
        return filteredObj[0]?.label || "";
    }



    if (isError) {
        customAlert(error);
        return <h2>Something went wrong</h2>
    }

    if (isLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>



    return (
        <BgBox height={"100%"} width={"100%"} px={4} py={1}>
            <Stack direction={'row'} justifyContent="space-between" alignItems={"center"} m={2}>
                <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.logPage.logPage")}</Typography>
                <Stack direction={'row'} justifyContent="space-between" alignItems={"center"}>
                    <Box mb={0.5}><SearchTxtField variant={"outlined"} searchKeyWord={searchWord} onSearch={onSearch} onBtnClick={onSearchBtnClick} placeholder={`${t("sa.logPage.search")} ${getSrchTypeTxt()} .....`} /></Box>
                    <CustomDropDown height={36} width={140} handleDDChange={handleDDChange} ddArr={ddArr} defaultValue={ddArr[0].value} />

                    <StyledToggleButtonGroup color="primary" size="small" value={order} exclusive onChange={onOrderChange} sx={{ mb: 0.5, height: 36, mx: 3 }}>
                        <ToggleButton value='desc'>
                            <Stack sx={{ fontSize: 18, justifyContent: "center", alignItems: "center" }}>  <FaSortAmountDown /></Stack>
                        </ToggleButton>
                        <ToggleButton value="asc">
                            <Stack sx={{ fontSize: 18, justifyContent: "center", alignItems: "center" }}>  <FaSortAmountDownAlt /></Stack>
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                </Stack>
            </Stack>


            <StyledTableContainer height={"80%"}>
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
                    {(logrow?.data || []).map((reqRow) => {
                        return (
                            <TableRow hover tabIndex={-1} key={reqRow.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                {columns.map((column) => {
                                    const value = reqRow[column.id];
                                    return (
                                        (column.id === 'userType') ?
                                            <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                {reqRow?.userType === 'sa' && <Typography fontSize={14}>{t("sa.logPage.sa")}</Typography>}
                                                {reqRow?.userType === 'staff' && <Typography fontSize={14}>{t("sa.logPage.staff")}</Typography>}
                                                {reqRow?.userType === 'truckop' && <Typography fontSize={14}>{t("sa.logPage.trkOp")}</Typography>}
                                                {reqRow?.userType === 'customer' && <Typography fontSize={14}>{t("sa.logPage.cust")}</Typography>}
                                                {reqRow?.userType === 'driver' && <Typography fontSize={14}>{t("sa.logPage.driver")}</Typography>}

                                            </TableCell> : (column.id === 'username') ?
                                                <TableCell key={column.id} align={column.align}>
                                                    {reqRow?.userType === 'sa' && "Super Admin (" + (reqRow.username) + ")"}
                                                    {reqRow?.userType === 'staff' && (reqRow.staffName) + " (" + (reqRow.username) + ")"}
                                                    {reqRow?.userType === 'truckop' && (reqRow.trkOpFName) + " " + (reqRow.trkOpLName) + " (" + (reqRow.username) + ")"}
                                                    {reqRow?.userType === 'customer' && (reqRow.custFName) + " " + (reqRow.custLName) + " (" + (reqRow.username) + ")"}
                                                    {reqRow?.userType === 'driver' && " (" + (reqRow.username) + ")"}

                                                </TableCell> : (column.id === 'description') ?
                                                    <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                        {reqRow.description}
                                                    </TableCell> : (column.id === 'c_at') ?
                                                        <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                                                            {formatDateTime(reqRow.c_at)}
                                                        </TableCell> : <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }} >
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>);
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </StyledTableContainer>

            <Stack sx={{ alignItems: "center", mt: 1 }}>
                <Pagination count={Math.ceil(logrow?.totalLength / limit) || 0} color="primary" page={pageNumber} onChange={handlePageChange} variant="outlined" shape="rounded" />
            </Stack>

        </BgBox>

    )
}

export default LogPage;