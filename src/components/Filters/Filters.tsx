
import { AppBar, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CultureFilter from './CultureFilter';
import GenderFilter from './GenderFilter';
import PaginatationFilter from './PaginationFilter';

function Filters(props: any) {

    return (
        <>
        <AppBar position="sticky" color="default">
        <Toolbar>
            <PaginatationFilter setPerPage={props.setPerPage} perPage={props.perPage} />
            <GenderFilter genderFilter={props.genderFilter} setGenderFilter={props.setGenderFilter} />
            <CultureFilter culture={props.culture} setCulture={props.setCulture} cultureError={props.cultureError} />
        </Toolbar>
      </AppBar>     
        </>
    )
}


export default Filters;
