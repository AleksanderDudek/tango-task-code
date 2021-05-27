
import { ClickAwayListener, FormControl, FormControlClassKey, List, ListItem, ListItemText } from '@material-ui/core';
import TextField, { TextFieldClassKey } from '@material-ui/core/TextField';
import React, { useEffect, useState,  } from 'react';

function CultureFilter(props: any) {
    const arr = ["kek", "kek1", "lol", "wolololo"];

    let typingTimer: any;
    const maxTypingTime = 2000;
    
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
      <div className={""}>
        <FormControl>
            <TextField id="outlined-basic" label="Culture" variant="outlined" placeholder="Type culture..." 
             defaultValue={props.culture} 
            onKeyUp={event => onKeyUp(event)} onKeyDown={event => onKeyDown()} 
            {...(props.cultureError && { error: true, helperText : "This culture doesn't exist."} )}
            />
        </FormControl>
        {open ? (
          <div className={""}>
            {arr.map(item => 
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button>
                    <ListItemText primary={item} />
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


export default CultureFilter;
