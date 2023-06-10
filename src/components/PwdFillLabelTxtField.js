import { Visibility, VisibilityOff } from '@mui/icons-material';
import { colors, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useState } from 'react';

function PwdFillLabelTxtField({ name, title, placeholder, errMsg, defaultValue, readOnly, disabled, multiline, height, width }) {
    const labelStyle = {
        color: errMsg && colors.red[500],
        fontWeight: "600",

    };
    const [showPwd, setShowPwd] = useState(false);
    return (
        <Stack sx={{ width: width ? width : 500 }}>
            <Typography component={'label'} htmlFor={title} style={labelStyle}>{title}</Typography>
            <TextField variant="filled"
                InputProps={{
                    disableUnderline: true, style: { paddingBottom: 15 },
                    readOnly: readOnly,
                    disabled: disabled,
                    multiline: multiline,
                    rows: 4,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPwd(!showPwd)}
                                sx={{ mt: 2.5 }}                            >
                                {showPwd ? <Visibility /> : <VisibilityOff color='primary' />}
                            </IconButton>

                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& .MuiInputBase-root": {
                        height: height ? height : 45,
                        backgroundColor: "#F5F6F8"
                    },
                    mt: 1
                }}
                size="small" placeholder={placeholder ? placeholder : title} name={name} type={showPwd ? "text" : "password"} defaultValue={defaultValue}
                id={title}
                error={errMsg && true}
                helperText={errMsg && errMsg}
                fullWidth
            />
        </Stack>
    )
}

export default PwdFillLabelTxtField