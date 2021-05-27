
import { Button, ButtonGroup, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Pagination.css';
import useStateManagerSelector from '../state/useStateManagerSelector';

function PaginationButtons(props : any) {

    const { linkHeaders, currentPage, setCurrentPage } = useStateManagerSelector();

    function onClickHandle(link: string) {
        const url = new URL(link);
        const pageNumber = (Number)(url.searchParams.get("page"));
        setCurrentPage(pageNumber);
    }

    return (
        <div className="progressContainer">
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={() => onClickHandle(linkHeaders.first)}>First page</Button>
                <Button onClick={() => onClickHandle(linkHeaders.prev)}>Previous page</Button>
                <Button disabled={true}> {currentPage} </Button>
                <Button onClick={() => onClickHandle(linkHeaders.next)}>Next page</Button>
                <Button onClick={() => onClickHandle(linkHeaders.last)}>Last page</Button>
            </ButtonGroup>
        </div>
            
    )
}


export default PaginationButtons;
