import { colors, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

function FillLabelTxtField({ name, title, placeholder, type, errMsg, defaultValue, readOnly, disabled, multiline, height, rows, width, endAdornment, step, fontSize, startAdornment }) {
    const labelStyle = {
        color: errMsg && colors.red[500],
        fontWeight: "600",
        fontSize: fontSize || 16
    }

    return (
        <Stack sx={{ width: width ? width : 500 }}>
            <Typography htmlFor={title} style={labelStyle} component={'label'} >{title}</Typography>
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
                    endAdornment: endAdornment,
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

export default FillLabelTxtField