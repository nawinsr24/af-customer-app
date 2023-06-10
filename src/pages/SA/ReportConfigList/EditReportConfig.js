import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, List, ListItem, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useQueryClient } from 'react-query';
import FillLabelTxtField from '../../../components/FillLabelTxtField';
import { customAlert, notify } from '../../../components/notify';
import ScrollBox from '../../../components/ScrollBox';
import { useAuthContext } from '../../../context/AuthContext';
import { DragHandle } from '@mui/icons-material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { putReportConfig } from '../../../services/bo-service';
import shipmtReptFieldsArr from '../../../utils/shipmtReptFieldsArr';


function EditReportConfig({ modalOpen, handleModalClose, data }) {
    const [formErrors, setFormErrors] = useState({});
    const { setLoadingScreen } = useAuthContext();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    console.log("data--------------------")
    console.log(data)
    const [selEleArr, setSelEleArr] = useState([]);
    let boxStyle = { borderRadius: 1.4, border: 1, borderColor: "rgba(0, 0, 0, 0.3)", height: 350, width: 350, mt: 0.8, pl: 3 };

    let txtFieldProps = { fontSize: 14, height: 38, width: 520 };



    useEffect(() => {
        if (data)
            setSelEleArr(JSON.parse(data?.config))
    }, [data])

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData); // convert the FormData object to a JSON object
        inputObject.selEleArr = selEleArr;
        let errorsObj = validate(inputObject);
        setFormErrors(errorsObj);

        if (Object.keys(errorsObj).length > 0)
            return;

        setLoadingScreen(true);
        try {

            await putReportConfig({
                configName: inputObject.configName,
                config: selEleArr,
                id: data?.id
            });
            notify("success", "Report Config Updated Successfully");
            handleModalClose();
            queryClient.invalidateQueries();
        } catch (err) {
            console.log(err);
            customAlert(err);
        }
        setLoadingScreen(false)
    }


    function handleEleChange(e) {
        const { value } = e.target
        let selEleObj = shipmtReptFieldsArr.find((i) => i.id === value)
        if (selEleArr.findIndex((i) => i.id === value) >= 0) {
            let filteredArr = selEleArr.filter((x) => x.id !== value)
            setSelEleArr([...filteredArr])
        } else {
            setSelEleArr(prevArr => [...prevArr, selEleObj])
        }
    }

    function onDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(selEleArr);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSelEleArr(items);
    };

    return (
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleSubmit} >
                <Box sx={modalStyle}>
                    <Stack direction={'row'} alignItems={"center"} mb={2}>
                        <Typography sx={{ fontWeight: "bold", fontSize: 17, color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>{t("sa.editReptConfig.editReptConfig")}</Typography>
                    </Stack>
                    <FillLabelTxtField defaultValue={data.configName} name="configName" title={t("sa.editReptConfig.reptConfigName")} errMsg={formErrors.configName} {...txtFieldProps} />

                    <Stack direction={"row"} mt={3} gap={5} >
                        <Stack>
                            <Typography style={{ fontWeight: "bold", fontSize: 14 }} >{t("sa.editReptConfig.fieldUnselect")}</Typography>
                            <Box sx={boxStyle}>
                                <ScrollBox height={"100%"}>
                                    <FormControl>
                                        <FormGroup>
                                            {shipmtReptFieldsArr.map((e) => <FormControlLabel key={e.id}
                                                label={<Typography fontSize={14}>{e.label}</Typography>}
                                                control={<Checkbox value={e.id} checked={selEleArr.findIndex((i) => i.id === e.id) >= 0} onChange={handleEleChange} />}
                                            />)}
                                        </FormGroup>
                                    </FormControl>
                                </ScrollBox>
                            </Box>
                        </Stack>

                        <Stack>
                            <Typography style={{ fontWeight: "bold", fontSize: 14, color: formErrors.selEleArr && "red" }} >{t("sa.editReptConfig.fieldSelect")}
                                <Typography component={"span"} sx={{ color: "red", fontSize: 13 }}>{formErrors.selEleArr} </Typography>
                            </Typography>
                            <Box sx={boxStyle}>
                                <ScrollBox height={"100%"}>
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable style={{ transform: "none" }} droppableId='addelements' >
                                            {(provided) => (
                                                <List  {...provided.droppableProps} ref={provided.innerRef} >
                                                    {selEleArr.map((e, index) => (
                                                        <Draggable key={e.id} draggableId={e.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                if (snapshot.isDragging) {
                                                                    provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
                                                                    provided.draggableProps.style.top = provided.draggableProps.style.offsetTop;
                                                                }
                                                                return (
                                                                    <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}  >
                                                                        <Stack direction={"row"} alignItems="center" justifyContent={"space-between"} width={"100%"}>
                                                                            <Typography fontSize={14}>{e.label}</Typography>
                                                                            <DragHandle />
                                                                        </Stack>
                                                                    </ListItem>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </List>
                                            )
                                            }
                                        </Droppable>
                                    </DragDropContext>
                                </ScrollBox>
                            </Box>
                        </Stack>
                    </Stack>


                    <Stack justifyContent={"flex-end"} direction={"row"} sx={{ mt: 2 }} width={"100%"}>
                        <Button variant="text" sx={{ height: 40, width: 120 }} onClick={handleModalClose}>{t("sa.editReptConfig.cancel")}</Button>
                        <Button variant="contained" type='submit' sx={{ height: 40, width: 150 }}>{t("sa.editReptConfig.save")}</Button>
                    </Stack>
                </Box>
            </form>
        </Modal>
    )
}

export default EditReportConfig;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #ffff',
    boxShadow: 24,
    px: 3,
    py: 2,
    borderRadius: 2
};

function validate(values) {
    const errors = {};

    if (!values.configName)
        errors.configName = "Config Name is required!";

    if ((values.selEleArr).length <= 0)
        errors.selEleArr = "- (Fields Required)";

    return errors;
};