
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function PaginatationFilter(props: any) {

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setPerPage(event.target.value as number);
  };

  return (
    <>
      <FormControl variant="filled">
        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={props.perPage}
          defaultValue={props.perPage}
          onChange={handleChange}
        >
          <MenuItem value={10}>10 results</MenuItem>
          <MenuItem value={25}>25 results</MenuItem>
          <MenuItem value={50}>50 results</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}


export default PaginatationFilter;
