
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { Gender } from '../../service/constants';

function GenderFilter(props: any) {

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setGenderFilter(event.target.value as number);
  };

    return (
        <>
        <FormControl variant="filled">
        <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={props.genderFilter}
          defaultValue={props.genderFilter}
          onChange={handleChange}
        >
          <MenuItem value={Gender.Female}>{Gender.Female}</MenuItem>
          <MenuItem value={Gender.Male}>{Gender.Male}</MenuItem>
          <MenuItem value={Gender.Unknown}>{Gender.Unknown}</MenuItem>
        </Select>
      </FormControl>
        </>
    )
}


export default GenderFilter;
