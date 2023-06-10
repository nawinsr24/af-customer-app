import { colors, FormControl, FormHelperText, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'

function CustomDropDown({ title, errMsg, handleDDChange, name, ddArr, width, height, defaultValue, bgColor, fontSize }) {
    const labelStyle = {
        color: errMsg && colors.red[500],
        fontWeight: "600",
        fontSize: fontSize || 16
    }
    return (

        <FormControl sx={{ width: width ? width : 500 }} fullWidth>
            {title && <Typography htmlFor={"dd-id"} style={labelStyle} component={'label'} sx={{ mb: 0.7 }}>{title}</Typography>}
            <Select
                onChange={handleDDChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                id="dd-id"
                defaultValue={defaultValue ? defaultValue : ""}
                name={name}
                sx={{ height: height ? height : 45, backgroundColor: bgColor, fontSize: fontSize || 16 }}
            >
                <MenuItem value=""><em>None</em></MenuItem>
                {ddArr.map((i) => <MenuItem value={i.value || i.id} key={i.value || i.id}>{i.label || i.configName}</MenuItem>)}
            </Select>
            <FormHelperText style={{ color: colors.red[500], }}>{errMsg}</FormHelperText>
        </FormControl>
    )
}

export default CustomDropDown