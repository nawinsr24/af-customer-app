import { styled } from '@mui/material/styles';
import { FormatListBulleted, GridViewRounded } from "@mui/icons-material";
import { Grid, Pagination, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import BgBox from "../../../components/BgBox";
import { customAlert } from "../../../components/notify";
import ScrollBox from "../../../components/ScrollBox";
import SearchTxtField from "../../../components/SearchTxtField";
import { FaSortAmountDownAlt, FaSortAmountDown } from 'react-icons/fa';
import CustomDropDown from '../../../components/CustomDropDown';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import QueryKey from '../../../QueryKey';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import MissingPage from '../../MissingPage';
import ShipmtCard from '../../../components/ShipmtCard';
import { getAllShipmts } from '../../../services/shipmt-service';
import ShipmtTable from '../../../components/ShipmtTable';

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

function ShipmentListPage() {
  const { t } = useTranslation(); 
  const { time } = useParams();

  const ddArr = [
    { value: "shipmtId", label: t("bo.shipListPg.shpId") },
    { value: "status", label: t("bo.shipListPg.sts") },
    { value: "custName", label: t("bo.shipListPg.custName") },
    { value: "trkOpName", label: t("bo.shipListPg.opName") },
    { value: "custMobile", label: t("bo.shipListPg.custNum") },
    { value: "trkOpMobile", label: t("bo.shipListPg.opNum") },
    { value: "from", label: t("bo.shipListPg.from") },
    { value: "to", label: t("bo.shipListPg.to") },
    { value: "fromto", label: t("bo.shipListPg.fromTo") },
    { value: "loadType", label: t("bo.shipListPg.loadType") },
    { value: "matType", label: t("bo.shipListPg.mat") }
  ];

  const [pageNumber, setPageNumber] = useState(1);
  const [view, setView] = useState('list');
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [searchType, setSearchType] = useState(ddArr[0].value);
  const [searchKeyType, setSearchKeyType] = useState(ddArr[0].value);
  const [order, setOrder] = useState('desc');
  const limit = 6
  

  const { isLoading, isError, error, data: shipmtRow } = useQuery(
    [QueryKey.shipmtList, pageNumber, searchKeyWord, searchKeyType, order, time],
    () => getAllShipmts({ pageNumber, limit, searchKeyWord, searchType: searchKeyType, order, time }), {
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

    <BgBox px={4} py={1}>
      <Stack direction={'row'} justifyContent="space-between" alignItems={"center"} mb={0.8} mt={2} px={2}>
        <Stack direction={'row'} alignItems={"center"}>
          <Typography variant='h5' sx={{ fontWeight: "bold", mr: 4 }}>{time === "current" ? t("bo.shipListPg.ship") : t("bo.shipListPg.shipHis")}</Typography>
          <StyledToggleButtonGroup color="primary" size="small" value={view} exclusive onChange={onViewChange} sx={{ mb: 0.5, height: 36 }}>
            <ToggleButton value='list'>
              <FormatListBulleted /> <Typography sx={{ ml: 0.3, fontSize: 15 }}>{t("bo.shipListPg.list")}</Typography>
            </ToggleButton>
            <ToggleButton value="grid">
              <GridViewRounded /> <Typography sx={{ ml: 0.3, fontSize: 15 }}>{t("bo.shipListPg.grid")}</Typography>
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Stack>

        <Stack direction={'row'} justifyContent="space-between" alignItems={"center"}>
          <Box mb={0.5}><SearchTxtField variant={"outlined"} searchKeyWord={searchWord} onSearch={onSearch} onBtnClick={onSearchBtnClick} placeholder={`Search ${getSrchTypeTxt()} .....`} /></Box>
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

      {view === 'list' ? <ShipmtTable shipmtRow={shipmtRow?.data} /> :
        <ScrollBox height={"84%"}>
          <Grid container spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {shipmtRow?.data.map((i) => <Grid item xs="auto" key={i.id}> <ShipmtCard i={i} /> </Grid>)}
          </Grid>
        </ScrollBox>
      }

      <Stack sx={{ alignItems: "center", mt: 1 }}>
        <Pagination count={Math.ceil(shipmtRow?.totalLength / limit) || 0} color="primary" page={pageNumber} onChange={handlePageChange} variant="outlined" shape="rounded" />
      </Stack>

    </BgBox>

  )
}

export default ShipmentListPage;