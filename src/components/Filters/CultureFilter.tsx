
import { FormControl, FormControlClassKey } from '@material-ui/core';
import TextField, { TextFieldClassKey } from '@material-ui/core/TextField';
import React, { useEffect, useState,  } from 'react';

function CultureFilter(props: any) {

    let typingTimer: any;
    const maxTypingTime = 500;
    
    const onTypingDone = (culture: string) => {
        //set state 
        props.setCulture(culture);
    }

    function onKeyUp(event: any) {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(onTypingDone, maxTypingTime, event.target.value as string);
    }

    function onKeyDown() {
        clearTimeout(typingTimer);
    }

    return (
        <>
        <FormControl>
            <TextField id="outlined-basic" label="Culture" variant="outlined" placeholder="Type culture..." 
             defaultValue={props.culture} 
            onKeyUp={event => onKeyUp(event)} onKeyDown={event => onKeyDown()} 
            {...(props.cultureError && { error: true, helperText : "This culture doesn't exist."} )}
            />
        </FormControl>
        </>
    )
}


export default CultureFilter;
