
import { ClickAwayListener, FormControl, FormControlClassKey, List, ListItem, ListItemText } from '@material-ui/core';
import TextField, { TextFieldClassKey } from '@material-ui/core/TextField';
import React, { useEffect, useState,  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../state/store';

const maxTypingTime = 2000;
let typingTimer: any;

function getCultureFromSearchParams (url: string) {

  const tempUrl = new URL(url);
  const culture = (String)(tempUrl.searchParams.get("culture"));

  return culture;
}

function CultureFilter(props: any) {
    const arr = ["kek", "kek1", "lol", "wolololo"];

    const apiCalls = useSelector((state: RootState) => state.successfullApiCallsData.successfullApiCalls);

    
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
      };
    
      const handleClickAway = () => {
        setOpen(false);
      };

    const onTypingDone = (culture: string) => {
        //set state 
        props.setCulture(culture);
        handleClickAway();
    }

    const onListItemClick = (culture: string) => {
      //set state 
      clearTimeout(typingTimer);
      props.setCulture(culture);
      handleClickAway();
    }

    function onKeyUp(event: any) {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(onTypingDone, maxTypingTime, event.target.value as string);
        handleClick();
    }
    

    function onKeyDown() {
        clearTimeout(typingTimer);
    }

    return (
        <>
        <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <FormControl>
            <TextField id="outlined-basic" label="Culture" variant="outlined" placeholder="Type culture..." 
             defaultValue={props.culture} 
            onKeyUp={event => onKeyUp(event)} onKeyDown={event => onKeyDown()} 
            {...(props.cultureError && { error: true, helperText : "This culture doesn't exist."} )}
            />
        </FormControl>
        {open ? (
          <div className={'cultureHelper'}>
            {apiCalls.map((item: any, index: number) => 
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button key={'li-' + index}>
                    <ListItemText primary={getCultureFromSearchParams(item.apiCall)} onClick={ () => onListItemClick(getCultureFromSearchParams(item.apiCall))} />
                    </ListItem>
                </List>
            )}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
        
        </>
    )
}


export default React.memo(CultureFilter);
