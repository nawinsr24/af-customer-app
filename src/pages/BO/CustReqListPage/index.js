import { styled } from '@mui/material/styles';
import { Add, FormatListBulleted, GridViewRounded } from "@mui/icons-material";
import { Button, ButtonBase, Grid, Pagination, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import BgBox from "../../../components/BgBox";
import CustReqCard from "../../../components/CustReqCard";
import CustReqTable from "../../../components/CustReqTable";
import { customAlert } from "../../../components/notify";
import ScrollBox from "../../../components/ScrollBox";
import SearchTxtField from "../../../components/SearchTxtField";
import { getAllCustReqWPagSrch } from "../../../services/req_service";
import { FaSortAmountDownAlt, FaSortAmountDown } from 'react-icons/fa';
import CustomDropDown from '../../../components/CustomDropDown';
import { useNavigate, useParams } from 'react-router-dom';
import route from '../../../Routes';
import { useTranslation } from "react-i18next";
import QueryKey from '../../../QueryKey';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import MissingPage from '../../MissingPage';

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

function CustReqListPage() {
  const { t } = useTranslation();
  const { time } = useParams();

  const ddArr = [
    { value: "name", label: t("bo.cusReqLstPg.dCus") },
    { value: "reqId", label: t("bo.cusReqLstPg.dReqId") },
    { value: "mobile", label: t("bo.cusReqLstPg.dContact") },
    { value: "from", label: t("bo.cusReqLstPg.dFrom") },
    { value: "to", label: t("bo.cusReqLstPg.dTo") },
    { value: "fromto", label: t("bo.cusReqLstPg.dFromTo") },
    { value: "loadType", label: t("bo.cusReqLstPg.dLoadType") },
    { value: "matType", label: t("bo.cusReqLstPg.dMat") }
  ];

  const [pageNumber, setPageNumber] = useState(1);
  const [view, setView] = useState('list');
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [searchType, setSearchType] = useState(ddArr[0].value);
  const [searchKeyType, setSearchKeyType] = useState(ddArr[0].value);
  const [order, setOrder] = useState('desc');
  const navigate = useNavigate();
  const limit = 6

  const { isLoading, isError, error, data: custReqRow } = useQuery(
    [QueryKey.custReqList, pageNumber, searchKeyWord, searchKeyType, order, time],
    () => getAllCustReqWPagSrch({ pageNumber, limit, searchKeyWord, searchType: searchKeyType, order, time }), {
    keepPreviousData: true
  });

  function onViewChange(e, v) {
    if (v == null)
      return

    setView(v);
  }

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

  function handleTrkOp() {
    navigate(route.boTrkOpReqList + time)
  }

  async function handleAddReq() {
    navigate(route.boAddCustReq);
  }

  if (isError) {
    customAlert(error);
    return <h2>Something went wrong</h2>
  }

  if (isLoading)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

  if (time !== "current" && time !== "history") {
    return <MissingPage />
  }

  return (
    <Box height={"100%"} width={"100%"}>
      <Stack direction={'row'} justifyContent='space-between' mb={1.5} >
        <Typography variant='h5' sx={{ fontWeight: "bold" }}>{time === "current" ? t("bo.cusReqLstPg.reqLstScrn") : t("bo.cusReqLstPg.reqHis")}</Typography>
        <Stack mr={5}>
          <Stack direction={'row'} mx={1} gap={2}>
            <ButtonBase component="div">  <Typography sx={{ fontWeight: "600", color: "primary.main" }}>{t("bo.cusReqLstPg.cust")}</Typography></ButtonBase>
            <ButtonBase component="div" onClick={handleTrkOp}> <Typography sx={{ fontWeight: "600", }}>{t("bo.cusReqLstPg.trkOp")}</Typography></ButtonBase>
          </Stack>
          <Box sx={{ width: 228, backgroundColor: "#E3E3E3", borderRadius: 10, height: 5, mt: 0.5 }}>
            <Stack direction={'row'} height={4}>
              <Box sx={{ width: 88, backgroundColor: "primary.main", borderRadius: 10 }} />
              <Box sx={{ width: 140, borderRadius: 10 }} />
            </Stack>
          </Box>
        </Stack>
      </Stack>

      <BgBox height={"95%"} px={4} py={1}>
        <Stack direction={'row'} justifyContent="space-between" alignItems={"center"} mb={1.2} mt={0.4} px={2}>
          <StyledToggleButtonGroup color="primary" size="small" value={view} exclusive onChange={onViewChange} sx={{ mb: 0.5, height: 36 }}>
            <ToggleButton value='list'>
              <FormatListBulleted /> <Typography sx={{ ml: 0.3, fontSize: 15 }}>{t("bo.cusReqLstPg.list")}</Typography>
            </ToggleButton>
            <ToggleButton value="center">
              <GridViewRounded /> <Typography sx={{ ml: 0.3, fontSize: 15 }}>{t("bo.cusReqLstPg.grid")}</Typography>
            </ToggleButton>
          </StyledToggleButtonGroup>

          <Stack direction={'row'} justifyContent="space-between" alignItems={"center"}>
            <Box mb={0.5}><SearchTxtField variant={"outlined"} searchKeyWord={searchWord} onSearch={onSearch} onBtnClick={onSearchBtnClick} placeholder={`${t("bo.cusReqLstPg.search")} ${getSrchTypeTxt()} .....`} /></Box>
            <CustomDropDown height={36} width={140} handleDDChange={handleDDChange} ddArr={ddArr} defaultValue={ddArr[0].value} />

            <StyledToggleButtonGroup color="primary" size="small" value={order} exclusive onChange={onOrderChange} sx={{ mb: 0.5, height: 36, mx: 3 }}>
              <ToggleButton value='desc'>
                <Stack sx={{ fontSize: 18, justifyContent: "center", alignItems: "center" }}>  <FaSortAmountDown /></Stack>
              </ToggleButton>
              <ToggleButton value="asc">
                <Stack sx={{ fontSize: 18, justifyContent: "center", alignItems: "center" }}>  <FaSortAmountDownAlt /></Stack>
              </ToggleButton>
            </StyledToggleButtonGroup>

            <Button variant='contained' sx={{ height: 36, mb: 0.5 }} startIcon={<Add />} color='primary' onClick={handleAddReq}>{t("bo.cusReqLstPg.addReq")}</Button>
          </Stack>
        </Stack>

        {view === 'list' ? <CustReqTable custReqRow={custReqRow?.data} /> :
          <ScrollBox height={"84%"}>
            <Grid container spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {custReqRow?.data.map((i) => <Grid item xs="auto" key={i.id}> <CustReqCard i={i} /> </Grid>)}
            </Grid>
          </ScrollBox>
        }

        <Stack sx={{ alignItems: "center", mt: 1 }}>
          <Pagination count={Math.ceil(custReqRow?.totalLength / limit) || 0} color="primary" page={pageNumber} onChange={handlePageChange} variant="outlined" shape="rounded" />
        </Stack>

      </BgBox>
    </Box>
  )
}

export default CustReqListPage;