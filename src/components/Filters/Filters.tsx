
import { AppBar, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CultureFilter from './CultureFilter';
import GenderFilter from './GenderFilter';
import PaginatationFilter from './PaginationFilter';
import './Filters.css';

function Filters(props: any) {

    return (
        <>
        <AppBar position="sticky" color="default">
        <Toolbar >
         <div className={'header'}>
               {/* logo */}
            <div style={{fontFamily: 'GameOfThrones', fontSize: 20, textAlign: 'center'}}>
                <span>Game of Thrones - Tango task</span>
            </div>
            <div className='filtersContainer'>
                <div className='filterContainer'>
                <PaginatationFilter setPerPage={props.setPerPage} perPage={props.perPage} />
                </div>
                <div className='filterContainer'>
                <GenderFilter genderFilter={props.genderFilter} setGenderFilter={props.setGenderFilter} />
                </div>
                <div className='filterContainer'>
                <CultureFilter culture={props.culture} setCulture={props.setCulture} cultureError={props.cultureError} />
                </div>
            </div>
         </div>
        </Toolbar>
      </AppBar>     
        </>
    )
}


export default Filters;
