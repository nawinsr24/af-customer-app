import { colors, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

function CustomRadio({ title, errMsg, handleRadioChange, name, radioArr, defaultValue, disabled, fontSize, gap }) {
    const labelStyle = {
        color: errMsg && colors.red[500],
        fontWeight: "600",
        fontSize: fontSize || 16
    }
    return (
        <FormControl>
            {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
            <Typography htmlFor={"radio-grp"} style={labelStyle} component={'label'} sx={{ mb: 0.8 }}>{title}</Typography>
            <RadioGroup
                row
                id="radio-grp"
                name={name}
                onChange={handleRadioChange}
                defaultValue={defaultValue}

            >
                {radioArr.map((i) => <FormControlLabel sx={{
                    mr: gap || 10, ".MuiFormControlLabel-label": {
                        fontSize: fontSize || 16
                    }
                }} value={i.value}
                    control={<Radio
                    // sx={{
                    //     "& .MuiSvgIcon-root": {
                    //         height: 150,
                    //         width: 150,
                    //     }
                    // }} 
                    />
                    }
                    label={i.label} key={i.value} disabled={disabled} />)}

                {/* <FormControlLabel sx={{ mr: 10 }} value="individual" control={<Radio />} label="Individual" />
                <FormControlLabel value="company" control={<Radio />} label="Company" /> */}

            </RadioGroup>
            <FormHelperText style={{ color: colors.red[500], }}>{errMsg}</FormHelperText>
        </FormControl>
    )
}

export default CustomRadio