import { NearMeRounded, PlaceTwoTone } from '@mui/icons-material';
import { Autocomplete, CircularProgress, colors, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useQuery } from 'react-query';
import QueryKey from '../QueryKey';
import { getDDCities } from '../services/serv_services';
import useDebounce from './useDebounce';

function PlaceAutofill({ name, width, title, errMsg, fontSize, onSelect, defaultValue, height, startAdornment, disabled, readOnly }) {


  const [inputValue, setInputValue] = useState("")
  const debouncedTxt = useDebounce(inputValue, 500);


  const { isLoading, data: apiData } = useQuery([QueryKey.places, debouncedTxt], () => getDDCities(debouncedTxt), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: debouncedTxt !== ""
  });

  const labelStyle = {
    color: errMsg && colors.red[500],
    fontWeight: "600",
    fontSize: fontSize || 16
  }

  return <Stack sx={{ width: width ? width : 500 }}>
    <Typography htmlFor={title} style={labelStyle} component={'label'} mb={0.7} >{title}</Typography>
    <Autocomplete
      inputValue={inputValue}
      size={"small"}
      onInputChange={(e, v) => setInputValue(v)}
      defaultValue={{ place: defaultValue || "" }}
      onChange={(e, v) => {
        onSelect && onSelect(v)
      }}

      noOptionsText={"NO OPTIONS"}
      isOptionEqualToValue={(option, value) => option?.place === (value.place)}
      getOptionLabel={(option) => Object.keys(option).length > 0 ? option?.place : ""}
      options={apiData || []}
      loading={isLoading}

      readOnly={readOnly}
      disabled={disabled}

      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: "#F5F6F8",
          fontSize: fontSize || 16,
          height: height ? height : 45,
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "0px solid #eee",
        },

      }}

      renderOption={(props, jsRes) => (<Stack direction={"row"} alignItems="center" gap={1} {...props} key={jsRes?.place}>
        <NearMeRounded color='disabled'/> 
        <Typography>{jsRes?.place}</Typography>
      </Stack>)}

      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          InputProps={{
            ...params.InputProps,

            startAdornment: (
              <InputAdornment position={"start"} >
                <PlaceTwoTone color='primary' />
              </InputAdornment>
            ),

            endAdornment: (
              <React.Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          fullWidth
          id={title}
          error={errMsg && true}
          helperText={errMsg && errMsg}
        />
      )}
    />
  </Stack>;
}

export default PlaceAutofill