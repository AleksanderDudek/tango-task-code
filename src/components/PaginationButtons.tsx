
import { Button, ButtonGroup } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function PaginationButtons(props : any) {

    function onClickHandle(link: string) {
        console.log(link);
        const url = new URL(link);
        const pageNumber = (Number)(url.searchParams.get("page"));
        console.log(pageNumber);
        props.setCurrentPage(pageNumber);
    }

    return (
        <>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={() => onClickHandle(props.linkHeaders.first)}>First page</Button>
                <Button onClick={() => onClickHandle(props.linkHeaders.prev)}>Previous page</Button>
                <Button disabled={true}> {props.currentPage} </Button>
                <Button onClick={() => onClickHandle(props.linkHeaders.next)}>Next page</Button>
                <Button onClick={() => onClickHandle(props.linkHeaders.last)}>Last page</Button>
            </ButtonGroup>
        </>
    )
}


export default PaginationButtons;
