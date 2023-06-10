import React from 'react'
import { TextField, InputAdornment, IconButton, colors, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from 'react';

function PwdTxtField(props) {
    const { name, title, placeholder, errMsg } = props;
    const [showPwd, setShowPwd] = useState(false);

    const labelStyle = {
        color: errMsg ? colors.red[500] : "var(--primary-color)",
        fontWeight: "500",
        fontSize: "0.8rem",
    }

    return (
        <div>
            <Typography htmlFor={title} style={labelStyle} component={'label'} > {title ? title : "Password"}</Typography>
            <TextField
                variant="standard"
                name={name ? name : 'password'}
                type={showPwd ? "text" : "password"}
                id={title}
                placeholder={placeholder ? placeholder : "Enter your Password"}
                fullWidth
                error={errMsg && true}
                helperText={errMsg && errMsg}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPwd(!showPwd)}
                            >
                                {showPwd ? <Visibility /> : <VisibilityOff color='primary' />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }} />
        </div>
    )
}

export default PwdTxtField;