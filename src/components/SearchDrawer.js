import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';

import SearchField from './SearchField';

const useStyles = makeStyles(theme =>({
    root: {
        display: 'flex',
        margin: theme.spacing(1, 0)
    },
}));


function SearchDrawer({ open, setOpen, handleSearchSubmit }) {
    const classes = useStyles();

    const toggleDrawer = bool => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(bool);
    };

    return (
        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)} transitionDuration={150} >
            <div className={classes.root} >
                <SearchField
                    onKeyDownHandler={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            setOpen(false)
                        }
                        handleSearchSubmit(e);
                    }}
                />
                <IconButton onClick={() => setOpen(false)} >
                    <CloseIcon />
                </IconButton>
            </div>
        </Drawer>
    );
}

export default SearchDrawer;