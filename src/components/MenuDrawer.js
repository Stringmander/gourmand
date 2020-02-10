import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'


const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

function MenuDrawer({ open, setOpen }) {
    const classes = useStyles();

    const toggleDrawer = bool => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(bool);
    };

    return (
        <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            transitionDuration={150}
        >
            <div className={classes.list} >
                <List>
                    <ListItem>
                        <ListItemIcon><FavoriteIcon /></ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                        <ListItemText primary="Cart" />
                    </ListItem>
                </List>
            </div>
        </SwipeableDrawer>
    );
}

export default MenuDrawer;