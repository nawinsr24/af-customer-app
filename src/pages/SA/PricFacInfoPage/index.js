import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack } from '@mui/system'
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import EditPricFacPopup from '../../../components/EditPricFacPopup';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import ScrollBox from '../../../components/ScrollBox';
import StyledTableContainer from '../../../components/StyledTableContainer';
import { useAuthContext } from '../../../context/AuthContext';
import { deletePricFactor, getAllPricFactors, postPriceFactor } from '../../../services/pricing-service';
import validate from "./validate";
import { useTranslation } from "react-i18next";


function PricFacInfoPage() {
    const { setLoadingScreen } = useAuthContext();
    const [pricRows, setPricRows] = useState([]);
    const isLarge = useMediaQuery("(min-width: 600px)");
    const [currMenuPricFac, setCurrMenuPricFac] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [modalOpen, setmodalOpen] = useState(false);
    const { t } = useTranslation();

    const columns = [
        {
            id: 'factor',
            label: t("sa.priceCal.factor"),
            minWidth: 170
        },
        {
            id: 'percent',
            label:  t("sa.priceCal.percentage"),
            minWidth: 170
        },
        {
            id: 'edit',
            label: '',
            minWidth: 50
        },
        {
            id: 'delete',
            label: '',
            // align: 'right',
            minWidth: 50
        },
    ];
    

    const handleModalClose = () => setmodalOpen(false);
    const handleModalOpen = () => setmodalOpen(true);

    async function getPricFacData() {
        try {
            const data = await getAllPricFactors();
            console.log(data);
            setPricRows(data ? data : []);
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
    }

    useEffect(() => {
        setLoadingScreen(true);
        getPricFacData().then((e) => setLoadingScreen(false));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object

        console.log(inputObject);
        let errorsObj = validate(inputObject);
        setFormErrors(errorsObj);

        if (Object.keys(errorsObj).length > 0)
            return;

        setLoadingScreen(true);

        try {
            await postPriceFactor(inputObject);
            await getPricFacData();
            notify("success", "Pricing Factor Added Successfully");
            setLoadingScreen(false);
            cancelCourse();
        } catch (err) {
            console.log(err);
            customAlert(err)
        }
        setLoadingScreen(false);
    };

    async function handleDelete(pricFacId) {
        setLoadingScreen(true);
        try {
            await deletePricFactor(pricFacId)
            await getPricFacData();
            notify("success", "Pricing Factor Deleted Successfully");
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    };

    function handleEdit(pricFac) {
        setCurrMenuPricFac(pricFac);
        handleModalOpen();
    }

    const cancelCourse = () => {
        document.getElementById("pricFacForm").reset();
    }



    return (
        <Stack direction={'row'} alignItems={''} sx={{ height: "100%" }} >
            <Box py={2} px={3} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: "100%", border: 1, borderColor: '#E3E3E3', width: isLarge ? "52%" : "40rem", mr: 2 }}>
                <Stack direction={'row'} justifyContent='space-between' mx={2} mt={2} mb={1} >
                    <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.priceCal.priceCalc")}</Typography>
                </Stack>
                <StyledTableContainer>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{ color: "#8392AB", fontWeight: "bold" , py: 1}}
                                    key={column.id}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pricRows.map((pricRow) => {
                            return (
                                <TableRow hover tabIndex={-1} key={pricRow.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    {columns.map((column) => {
                                        const value = pricRow[column.id];
                                        return (

                                            (column.id === 'edit') ?
                                                <TableCell key={column.id} align={column.align}>
                                                    <IconButton onClick={() => handleEdit(pricRow)}>
                                                        <Edit color='info' />
                                                    </IconButton>
                                                </TableCell> : (column.id === 'delete') ?
                                                    <TableCell key={column.id} align={column.align}>
                                                        <IconButton onClick={() => handleDelete(pricRow.id)}>
                                                            <Delete color='error' />
                                                        </IconButton>
                                                    </TableCell> : (column.id === 'percent') ?
                                                        <TableCell key={column.id} align={column.align} >
                                                            {value.toFixed(2) + "%"}
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
            </Box>

            <Box py={2} px={3} sx={{ backgroundColor: "#ffff", borderRadius: 1.4, height: "60%", border: 1, borderColor: '#E3E3E3', width: isLarge ? "45%" : "30rem" }}>

                <form onSubmit={handleSubmit} noValidate style={{ padding: 0, height: "100%" }} id={"pricFacForm"}>
                    <ScrollBox height={"80%"}>

                        <Stack direction={'row'} justifyContent='space-between' mx={4} mt={2} mb={1} >
                            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{t("sa.priceCal.addFactor")}</Typography>
                        </Stack>


                        <Stack gap={3} mt={1} ml={4}>
                            <FillLabelTxtField name="factor" title={t("sa.priceCal.fName")} width={400} errMsg={formErrors.factor} />
                            <FillLabelTxtField name="percent" type="number" step={0.01} title={t("sa.priceCal.percentage")} errMsg={formErrors.percent} width={400} />
                        </Stack>

                    </ScrollBox>


                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 1.5 }}>
                        <Button variant="text" sx={{ height: 40, width: 120, mr: 1 }} onClick={cancelCourse}>{t("sa.priceCal.clear")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150, mr: 13 }}>{t("sa.priceCal.sChanges")}</Button>
                    </Stack>

                </form>
                {pricRows && <EditPricFacPopup modalOpen={modalOpen} handleModalClose={handleModalClose} pricFacData={currMenuPricFac} />}

            </Box>
        </Stack>
    )
}

export default PricFacInfoPage