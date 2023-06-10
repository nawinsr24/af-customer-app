import { Button, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import BgBox from "../../../components/BgBox";
import { customAlert } from "../../../components/notify";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import QueryKey from '../../../QueryKey';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../components/loadingScreen';
import { getAllPendingAdrVfy } from '../../../services/serv_services';
import StyledTableContainer from "../../../components/StyledTableContainer";
import { capFirstLetter, formatDateTime } from "../../../utils/format";
import route from "../../../Routes";
import { KeyboardArrowRight } from "@mui/icons-material";


function AdrReqListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, isError, error, data: adrReqList } = useQuery(
    [QueryKey.getAllPenAdrReqs],
    () => getAllPendingAdrVfy());

  const columns = [
    {
      id: 'custName',
      label: t("bo.adrPenReqPg.cust"),
      minWidth: 170
    },
    {
      id: 'custMobile1',
      label: t("bo.adrPenReqPg.contact"),
      minWidth: 170
    },
    {
      id: 'aadhaarNo',
      label: t("bo.adrPenReqPg.aadhaarNum"),
      minWidth: 170
    },
    {
      id: 'c_at',
      label: t("bo.adrPenReqPg.cat"),
      minWidth: 170
    },
    {
      id: 'view',
      label: '',
      // align: 'right',
      minWidth: 80
    },
  ];


  async function handleRowClick(reqRow) {
    navigate(route.boCustInfo + reqRow.userId);
  }
  async function handleViewClick(reqRow) {
    navigate(route.boCustInfo + reqRow.userId);
  }



  if (isError) {
    customAlert(error);
    return <h2>Something went wrong</h2>
  }

  if (isLoading)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>



  return (
    <Box height={"100%"} width={"100%"}>
      <Stack direction={'row'} justifyContent='space-between' mb={1.5} >
        <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.adrPenReqPg.title")}</Typography>

      </Stack>

      <BgBox height={"95%"} px={4} py={1}>
        <StyledTableContainer height={"83%"}>
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
            {adrReqList?.map((adrReq) => {
              return (
                <TableRow hover tabIndex={-1} key={adrReq.custId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  {columns.map((column) => {
                    const value = adrReq[column.id];
                    return (
                      (column.id === 'c_at') ?
                        <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }}>
                          {formatDateTime(adrReq.c_at)}
                        </TableCell> : (column.id === 'custName') ?
                          <TableCell key={column.id} align={column.align} >
                            <Button variant="text" sx={{ color: "#000000" }} onClick={() => { handleRowClick(adrReq); }}>
                              {capFirstLetter(adrReq.custFName) + " " + capFirstLetter(adrReq.custLName)}
                            </Button>
                          </TableCell> : (column.id === 'view') ?
                            <TableCell key={column.id} align={column.align} >
                              <Button variant='outlined' sx={{ ml: 5 }} endIcon={<KeyboardArrowRight />} color='primary' onClick={() => { handleViewClick(adrReq) }}>{t("bo.adrPenReqPg.view")}</Button>
                            </TableCell> :
                            <TableCell key={column.id} align={column.align} >
                              {column.format && typeof value === 'number' ? column.format(value) : capFirstLetter(value)}
                            </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </StyledTableContainer>


      </BgBox>
    </Box>
  )
}

export default AdrReqListPage;