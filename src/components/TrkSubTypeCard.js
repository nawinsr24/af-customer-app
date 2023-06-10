import { ButtonBase, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

function TrkSubTypeCard({ item, index, handleSelTrkType, selTrkType, valId }) {
    let keyName = getKeyName()

    function getKeyName() {
        for (var key in selTrkType) {
            if (key.startsWith(valId + "_"))
                return key
        }
    }

    function handleClick() {

        if (valId === "val1") {
            let specObj = {};
            let valArr = selTrkType?._vhclObj[valId]

            let keyName = valArr[valArr.length - 1].split(" ")[2];
            specObj["val1_" + keyName] = item; //specification

            let nxtValStrg = "val2";

            if (selTrkType?._vhclObj[nxtValStrg]) {
                let nxtValArr = selTrkType?._vhclObj[nxtValStrg];
                specObj["_" + nxtValStrg] = nxtValArr[index];
            }

            specObj["_val1_index"] = index;

            deleteObjProp(valId, specObj, selTrkType)

        } else if (valId === "val2") {
            let specObj = {};
            let valArr = selTrkType?._val2

            let keyName = valArr[valArr.length - 1].split(" ")[2];
            specObj["val2_" + keyName] = item; //specification

            let nxtValStrg = "val3";

            if (selTrkType?._vhclObj[nxtValStrg]) {
                let nxtValArr = selTrkType?._vhclObj[nxtValStrg];
                specObj["_" + nxtValStrg] = nxtValArr[selTrkType?._val1_index][index];
            }

            specObj["_val2_index"] = index;

            deleteObjProp(valId, specObj, selTrkType)

        } else if (valId === "val3") {
            let specObj = {};
            let valArr = selTrkType?._val3

            let keyName = valArr[valArr.length - 1].split(" ")[2];
            specObj["val3_" + keyName] = item; //specification

            let nxtValStrg = "val4";

            if (selTrkType?._vhclObj[nxtValStrg]) {
                let nxtValArr = selTrkType?._vhclObj[nxtValStrg];
                specObj["_" + nxtValStrg] = nxtValArr[selTrkType?._val1_index][selTrkType?._val2_index][index];
            }

            specObj["_val3_index"] = index;

            deleteObjProp(valId, specObj, selTrkType)
        }
        else if (valId === "val4") {
            let specObj = {};
            let valArr = selTrkType?._val4

            let keyName = valArr[valArr.length - 1].split(" ")[2];
            specObj["val4_" + keyName] = item; //specification

            let nxtValStrg = "val5";

            if (selTrkType?._vhclObj[nxtValStrg]) {
                let nxtValArr = selTrkType?._vhclObj[nxtValStrg];
                specObj["_" + nxtValStrg] = nxtValArr[selTrkType?._val1_index][selTrkType?._val2_index][index];
            }

            specObj["_val4_index"] = index;

            deleteObjProp(valId, specObj, selTrkType)
        }
    }


    function deleteObjProp(valId, specObj, selTrkTypeObj) {
        let newSelTrkTypObj = { ...selTrkTypeObj }
        for (var key in newSelTrkTypObj) {

            if (valId === "val1") {
                if (key.startsWith("_val2") || key.startsWith("_val3") || key.startsWith("_val4") || key.startsWith("_val5") || key.startsWith("val2") || key.startsWith("val3") || key.startsWith("val4") || key.startsWith("val5"))
                    delete newSelTrkTypObj[key]

            } else if (valId === "val2") {
                if (key.startsWith("_val3") || key.startsWith("_val4") || key.startsWith("_val5") || key.startsWith("val3") || key.startsWith("val4") || key.startsWith("val5"))
                    delete newSelTrkTypObj[key]

            } else if (valId === "val3") {
                if (key.startsWith("_val4") || key.startsWith("_val5") || key.startsWith("val4") || key.startsWith("val5"))
                    delete newSelTrkTypObj[key]

            } else if (valId === "val4") {
                if (key.startsWith("_val5") || key.startsWith("val5"))
                    delete newSelTrkTypObj[key]


            }
        }
        handleSelTrkType({ ...newSelTrkTypObj, ...specObj });
    }



    return (
        <ButtonBase component="div" sx={{
            borderRadius: 2,
            bgcolor: selTrkType[keyName] === item && "action.hover"
        }} onClick={handleClick}>
            <Stack sx={{
                border: 1, borderColor: 'rgba(0,0,0,0.3)',
                color: selTrkType[keyName] === item ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.6)',
                borderRadius: 2, width: 140, height: 50, alignItems: "center", justifyContent: "center"
            }}>
                <Typography fontSize={14}>{item}</Typography>
            </Stack>
        </ButtonBase>
    )
}

export default TrkSubTypeCard