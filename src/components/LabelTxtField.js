import React from 'react'
import { TextField, colors, Typography } from "@mui/material";

function LabelTxtField({ name, title, placeholder, type, errMsg }) {
    const labelStyle = {
        color: errMsg ? colors.red[500] : "var(--primary-color)",
        fontWeight: "500",
        fontSize: "0.8rem",
    }
    return (
        <div>
            <Typography htmlFor={title} style={labelStyle} component={'label'} >{title}</Typography>
            <TextField
                variant="standard"
                type={type} name={name} id={title}
                placeholder={placeholder}
                fullWidth
                error={errMsg && true}
                helperText={errMsg && errMsg}
            />
        </div>

    )
}

export default LabelTxtField