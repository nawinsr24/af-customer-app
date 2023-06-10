import { Search } from '@mui/icons-material'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'

function SearchTxtField({ searchKeyWord, onSearch, placeholder, onBtnClick, variant }) {


    return (
        <Box width={250}>
            <TextField variant={variant ? variant : "standard"} fullWidth type={"search"}
                value={searchKeyWord}
                onChange={onSearch && onSearch}
                sx={{
                    "& .MuiInputBase-root": {
                        height: 35
                    }
                }}
                placeholder={placeholder}
                InputProps={onBtnClick ? {
                    endAdornment: (
                        <InputAdornment position={"end"}>
                            <IconButton onClick={onBtnClick}>
                                <Search color='primary' />
                            </IconButton>
                        </InputAdornment>
                    ),
                    style: { paddingLeft: 3, paddingRight: 3 },
                } : {
                    startAdornment: (
                        <InputAdornment position={"start"}>
                            <IconButton>
                                <Search color='primary' />
                            </IconButton>
                        </InputAdornment>
                    ),
                    style: { paddingLeft: 3, paddingRight: 6 },
                }}
            />
        </Box>
    )
}

export default SearchTxtField