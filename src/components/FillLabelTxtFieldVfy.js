import { Cancel, CheckCircle, Error } from '@mui/icons-material'
import { Button, colors, InputAdornment, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

function FillLabelTxtFieldVfy({ name, title, placeholder, type, errMsg, defaultValue, readOnly, disabled, multiline, height, rows, width, step, fontSize, startAdornment, status, onVerifyClick }) {
    const labelStyle = {
        color: errMsg && colors.red[500],
        fontWeight: "600",
        fontSize: fontSize || 16
    }

    return (
        <Stack sx={{ width: width ? width : 500 }}>
            <Stack direction={"row"} alignItems={"center"}>
                <Typography htmlFor={title} style={labelStyle} component={'label'} sx={{ mr: 0.5 }}>{title}</Typography>
                {status === 1 ? <CheckCircle fontSize='small' color='success' /> :
                    status === 0 ? <Cancel fontSize='small' color='error' /> :
                        <Error fontSize='small' color='warning' />}
            </Stack>
            <TextField variant="filled"
                inputProps={{
                    step: step,
                }}
                InputProps={{
                    disableUnderline: true, style: { paddingBottom: 15 },
                    readOnly: readOnly,
                    disabled: disabled,
                    multiline: multiline,
                    rows: rows ? rows : 4,
                    endAdornment:
                        (status === 2 && <InputAdornment position="end" >
                            <Button variant="text" onClick={onVerifyClick} color='primary' sx={{ height: 30, mt: 2, fontWeight: "bold" }}>Verify Now</Button>
                        </InputAdornment>)
                    ,
                    startAdornment: startAdornment
                }}
                sx={{
                    "& .MuiInputBase-root": {
                        height: height ? height : 45,
                        backgroundColor: "#F5F6F8",
                        fontSize: fontSize || 16
                    },
                    mt: 0.7
                }}
                fullWidth size="small" placeholder={placeholder ? placeholder : title} name={name} type={type} defaultValue={defaultValue}
                id={title}
                error={errMsg && true}
                helperText={errMsg && errMsg}
            />
        </Stack>
    )
}

export default FillLabelTxtFieldVfy