import { Button, ListItemIcon, MenuItem, Pagination, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import BgBox from "../../../components/BgBox";
import { customAlert } from "../../../components/notify";
import CustomDropDown from '../../../components/CustomDropDown';
import { useTranslation } from "react-i18next";

import QueryKey from '../../../QueryKey';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import ReportsTable from '../../../components/ReportsTable';
import { getAllReportConfigs } from '../../../services/bo-service';
import { ArrowDropDown, ArrowDropUp, Description, FilterAlt, PictureAsPdf } from '@mui/icons-material';
import OptionMenu from '../../../components/OptionMenu';
import { downloadExcel, downloadPDF } from '../../../utils/export';
import { getAllShipmtRepts } from "../../../services/shipmt-service";
import FilterMdl from "./FilterMdl";



function ReportsListPage() {
  const { t } = useTranslation();

  const [pageNumber, setPageNumber] = useState(1);
  const limit = 8
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [filterObj, setFilterObj] = useState({});
  console.log({ ...filterObj })
  const { isLoading, isError, error, data: shipmtRow } = useQuery(
    [QueryKey.shipmtsRepts, pageNumber, filterObj],
    () => getAllShipmtRepts({ limit, pageNumber, ...filterObj }), {
    keepPreviousData: true
  });

  const { isLoading: isLoadRC, isError: isErrRC, error: errRC, data: rptCfgArr } = useQuery([QueryKey.reportConfigList], getAllReportConfigs);
  const [rptCfg, setRptCfg] = useState("");

  const [filterMdl, setFilterMdl] = useState(false);
  const handleFilterMdlClose = () => setFilterMdl(false);
  const handleFilterMdlOpen = () => setFilterMdl(true);


  useEffect(() => {
    if (!rptCfgArr)
      return;

    setRptCfg(rptCfgArr[0])
  }, [rptCfgArr]);


  const optionItems = [
    {
      title: t("bo.reptListPg.pdf"),
      icon: <PictureAsPdf fontSize="small" />,
      fn: () => downloadPDF({ jsonDataArr: shipmtRow?.data, columns: JSON.parse(rptCfg?.config) })
    },
    {
      title: t("bo.reptListPg.excel"),
      icon: <Description fontSize="small" />,
      fn: () => downloadExcel({ jsonDataArr: shipmtRow?.data, columns: JSON.parse(rptCfg?.config) })
    }
  ]





  const handlePageChange = async (event, value) => {
    setPageNumber(value);
  };

  function handleFilterObj(obj) {
    setFilterObj({ ...obj })
  }

  function handleRptCfgChange(e) {
    const { value } = e.target;
    let selRptCfg = rptCfgArr.find((i) => i.id === value)
    setRptCfg(selRptCfg);
  }



  if (isError || isErrRC) {
    customAlert(error || errRC);
    return <h2>Something went wrong</h2>
  }

  if (isLoading || isLoadRC)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>


  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (

    <BgBox px={4} py={1}>
      <Stack direction={'row'} justifyContent="space-between" alignItems={"center"} mb={0.8} mt={2} px={2}>
        <Stack direction={'row'} alignItems={"center"}>
          <Typography variant='h5' sx={{ fontWeight: "bold", mr: 4, mb: 1 }}>{t("bo.reptListPg.rept")}</Typography>
        </Stack>

        <Stack direction={'row'} justifyContent="space-between" alignItems={"center"}>
          <CustomDropDown height={36} width={200} handleDDChange={handleRptCfgChange} ddArr={rptCfgArr || []} defaultValue={rptCfgArr[0]?.id || ""} />
          <Button variant='outlined' sx={{ ml: 2, mb: 0.4 }} startIcon={<FilterAlt />} color='primary' onClick={handleFilterMdlOpen} >{t("bo.reptListPg.filter")}</Button>
          <Button variant='contained' sx={{ ml: 2, mb: 0.4 }} endIcon={open ? <ArrowDropUp /> : <ArrowDropDown />} color='primary' onClick={handleExportClick} >{t("bo.reptListPg.export")}</Button>

        </Stack>
      </Stack>

      {rptCfg?.config && <ReportsTable shipmtRow={shipmtRow?.data} columns={JSON.parse(rptCfg?.config)} />}



      <Stack sx={{ alignItems: "center", mt: 1 }}>
        <Pagination count={Math.ceil(shipmtRow?.totalLength / limit) || 0} color="primary" page={pageNumber} onChange={handlePageChange} variant="outlined" shape="rounded" />
      </Stack>
      <OptionMenu open={open} handleClose={handleExportClose} anchorEl={anchorEl} >
        {optionItems.map((i) => <MenuItem sx={{ pl: 2, pr: 5 }} key={i.title} onClick={i.fn}>
          <ListItemIcon > {i.icon}</ListItemIcon>
          {i.title}
        </MenuItem>)}
      </OptionMenu>

      <FilterMdl modalOpen={filterMdl} handleModalClose={handleFilterMdlClose} filterObj={filterObj} handleFilterObj={handleFilterObj} />
    </BgBox>

  )
}

export default ReportsListPage;