import { Box, Stack } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import IcBackBtn from "../../../assets/icons/IcBackBtn";
import { useAuthContext } from "../../../context/AuthContext";
import { Grid, IconButton, Typography } from "@mui/material";
import { useQuery } from "react-query";
import QueryKey from "../../../QueryKey";
import { getAllTrksByTpId, getSingleTrkOp } from "../../../services/trkOp-service";
import { customAlert } from "../../../components/notify";
import LoadingScreen from "../../../components/loadingScreen";
import ScrollBox from "../../../components/ScrollBox";
import TrkListCard from "../../../components/TrkListCard";



function TrkListByTpPage() {
  const { trkOpId } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, error, data: trkData } = useQuery([QueryKey.allTrks, trkOpId], () => getAllTrksByTpId(trkOpId));
  const { isLoading: isTpLoading, isError: isTpErr, error: tpErr, data: tpData } = useQuery([QueryKey.singleTrkOp, trkOpId], () => getSingleTrkOp(trkOpId));


  if (!trkData && trkOpId)
    return <h2>Invalid Truck Operator</h2>

  if (isError || isTpErr) {
    customAlert(error || tpErr);
    return <h2>Something went wrong</h2>
  }

  if (isLoading || isTpLoading)
    return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

  if (tpData === null)
    return <h2>Invalid Truck Operator</h2>


  return (
    <Box height={"100%"} width={"100%"}>
      <Stack direction={'row'} justifyContent='space-between' mb={2} >
        <Stack direction={'row'} alignItems="center">
          <IconButton onClick={() => navigate(-1, { replace: true })}><IcBackBtn /></IconButton>
          <Box width={10} />
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>Truck List ({tpData?.fName + " " + tpData?.lName})</Typography>
        </Stack>
      </Stack>
      <ScrollBox height={"84%"}>
        {trkData.length === 0 ?
          <Stack height={"100%"} alignItems={"center"} justifyContent={"center"}>
            <h2>Empty List</h2>
          </Stack>
          : <Grid container spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {trkData.map((i) => <Grid item xs="auto" key={i.id}> <TrkListCard i={i} /> </Grid>)}
          </Grid>}
      </ScrollBox>
    </Box>
  )
}

export default TrkListByTpPage;