import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import QueryKey from '../../QueryKey';
import { addGrpItems, getNotCombGrItemList } from '../../services/comGrp-service';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import CombineReqCard from './CombineReqCard';
import { customAlert, notify } from '../notify';
import LoadingScreen from '../loadingScreen';
import { makeTxtOverFLow } from '../../utils/format';
import { useTranslation } from "react-i18next";


function AddReqGrpListPopup({ modalOpen, handleModalClose, type, custId, grpData }) {
  const { isLoading, isError, error, data } = useQuery([QueryKey.notCombGrpReq, custId, type], () => getNotCombGrItemList({ custId, type }))
  const [pageSize, setPageSize] = useState(4);
  const [selRows, setSelRows] = useState([]);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { isLoading: isMuLoad, isError: isMuErr, error: muErr, mutate: addItems } = useMutation(addGrpItems, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.reqGrp, custId, type]);
      queryClient.invalidateQueries([QueryKey.shipmtGrp, custId, type]);
      queryClient.invalidateQueries([QueryKey.grpList, grpData?.id]);
      queryClient.invalidateQueries([QueryKey.notCombGrpReq, custId, type]);
      notify("success", "Successfully Added");
      handleModalClose();
    }
  });


  const columns = [
    {
      field: 'c_at',
      headerName: 'Not Combined Requests',
      width: 600,
      sortable: true,
      filterable: false,
      renderCell: (params) => <CombineReqCard data={params.row} itemId={params.row.custReqId} />
    }
  ]

  function handleSelChange(rows) {
    setSelRows((prev) => [ ...rows])
  }

  function handleSubmit() {
    if (selRows.length <= 0)
      return;

    addItems({
      combineId: grpData?.id, type, ids: [...selRows]
    })
  }

  if (isError || isMuErr) {
    customAlert(error || muErr);
    return <h2>Something went wrong</h2>
  }

  if (isLoading || isMuLoad)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={modalStyle}>
        <Stack direction={"row"} justifyContent={"space-between"} mb={1} alignItems={"center"}>
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("bo.addReqGrp.addReq")} {makeTxtOverFLow(grpData?.grpName, 25)}</Typography>
          <Stack direction={"row"} gap={2}>
            <Button variant='outlined' color='primary' sx={{ height: 35 }} onClick={handleModalClose}>{t("bo.addReqGrp.cancel")}</Button>
            <Button variant='contained' color='primary' sx={{ height: 35 }} onClick={handleSubmit}>{t("bo.addReqGrp.submit")}</Button>
          </Stack>
        </Stack>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={handleSelChange}
            getRowId={(row) => row.custReqId}
            rowsPerPageOptions={[4, 8, 10, 20]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            sx={{ fontSize: 14, height: "100%" }}
            getRowHeight={() => 'auto'}
          />
        </Box>
      </Box>

    </Modal>
  )
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 735,
  bgcolor: 'background.paper',
  border: '2px solid #ffff',
  boxShadow: 24,
  px: 4,
  py: 3,
  borderRadius: 2,
};

export default AddReqGrpListPopup