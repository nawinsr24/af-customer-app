import { Add, MoreVert } from "@mui/icons-material";
import { Box, Button, IconButton, MenuItem, Stack, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import QueryKey from "../../QueryKey";
import { getCombGrpList } from "../../services/comGrp-service";
import { capFirstLetter } from "../../utils/format";
import CreateGrpPopup from "./CreateGrpPopup";
import LoadingScreen from "../loadingScreen";
import { customAlert } from "../notify";
import OptionMenu from "../OptionMenu";
import StyledTableContainer from "../StyledTableContainer";
import ViewGrpListPopup from "./ViewGrpListPopup";
import AddShipmtGrpListPopup from "./AddShipmtGrpListPopup";
import EditGrpListPopup from "./EditGrpListPopup";
import { useTranslation } from "react-i18next";


function ShipmtGrp({ custId }) {
    const isLarge = useMediaQuery("(min-width: 600px)");
    let type = "shipmt";
    const { isLoading, isError, error, data } = useQuery([QueryKey.shipmtGrp, custId, type], () => getCombGrpList({ custId, type }));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [currRow, setCurrRow] = useState(null);
    const { t } = useTranslation();

    const [modalCreGrpOpen, setmodalCreGrpOpen] = useState(false);
    const handleModalCreGrpClose = () => setmodalCreGrpOpen(false);
    const handleModalCreGrpOpen = () => setmodalCreGrpOpen(true);

    const [modalViwGrpOpen, setmodalViwGrpOpen] = useState(false);
    const handleModalViwGrpClose = () => setmodalViwGrpOpen(false);
    const handleModalViwGrpOpen = (row) => {
        setCurrRow(row);
        setmodalViwGrpOpen(true);
    }

    const [modalAddLstpOpen, setmodalAddLstOpen] = useState(false);
    const handleModalAddLstClose = () => setmodalAddLstOpen(false);
    const handleModalAddLstOpen = () => setmodalAddLstOpen(true);

    const [modalEdiLstpOpen, setmodalEdiLstOpen] = useState(false);
    const handleModalEdiLstClose = () => setmodalEdiLstOpen(false);
    const handleModalEdiLstOpen = () => setmodalEdiLstOpen(true);


    const columns = [
        {
            id: 'grpName',
            label: t("bo.shipGrp.grpName"),
            align: 'left',
            minWidth: 100
        },
        {
            id: 'count',
            label: t("bo.shipGrp.reqCount"),
            // align: 'right',
            minWidth: 80,
            format: (value) => value.toLocaleString('en-IN'),
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
            title: t("bo.shipGrp.addReq"),
            fn: handleModalAddLstOpen
        },
        {
            title: t("bo.shipGrp.delReq"),
            fn: handleModalEdiLstOpen
        }
    ];


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setCurrRow(row);
    };

    if (isError) {
        customAlert(error);
        return <h2>Something went wrong</h2>
    }

    if (isLoading)
        return <Box sx={{ position: "absolute", top: 0, left: 0 }}><LoadingScreen /></Box>

    return <Box py={2} px={3} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: 380, border: 1, borderColor: '#E3E3E3', width: isLarge ? "49%" : "52%" }}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography sx={{ fontWeight: "bold", color: "rgba(131, 146, 171, 0.6)", fontSize: 18 }}>{t("bo.shipGrp.shipGrp")}</Typography>
            <Button variant="outlined" startIcon={<Add />} onClick={handleModalCreGrpOpen}>{t("bo.shipGrp.createGrp")}</Button>
        </Stack>
        <StyledTableContainer height={"83%"} size={data?.length > 5 ? "small" : "medium"}>
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
                {(data || []).map((reqRow) => {
                    return (
                        <TableRow hover tabIndex={-1} key={reqRow.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            {columns.map((column) => {
                                const value = reqRow[column.id];
                                return ((column.id === 'options') ?
                                    <TableCell key={column.id} align={column.align}>
                                        <IconButton onClick={(e) => { handleOptionClick(e, reqRow) }}>
                                            <MoreVert />
                                        </IconButton>
                                    </TableCell> : <TableCell key={column.id} align={column.align} sx={{ textAlign: "left" }} onClick={() => handleModalViwGrpOpen(reqRow)}>
                                        {column.format && typeof value === 'number' ? column.format(value) : capFirstLetter(value)}
                                    </TableCell>);
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
                    {i.title}
                </MenuItem>)}
            </OptionMenu>
        </StyledTableContainer>
        <CreateGrpPopup modalOpen={modalCreGrpOpen} handleModalClose={handleModalCreGrpClose} type={type} custId={custId} />
        <ViewGrpListPopup modalOpen={modalViwGrpOpen} handleModalClose={handleModalViwGrpClose} type={type} custId={custId} grpData={currRow} />
        <AddShipmtGrpListPopup modalOpen={modalAddLstpOpen} handleModalClose={handleModalAddLstClose} type={type} custId={custId} grpData={currRow} />
        <EditGrpListPopup modalOpen={modalEdiLstpOpen} handleModalClose={handleModalEdiLstClose} type={type} custId={custId} grpData={currRow} />
    </Box>
}

export default ShipmtGrp