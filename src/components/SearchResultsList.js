import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

export default function SearchResultsList(props) {
    const classes = useStyles();

    return (
        <div className={classes.demo}>
            <List >
                {
                props.searchResults.map(result=>(
                    <ListItem key={result.recipe.uri} >
                        <ListItemAvatar>
                            <Avatar src={result.recipe.image} >
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={result.recipe.label}
                        // secondary={secondary ? 'Secondary text' : null}
                        />
                    </ListItem>
                ))
                }
            </List>
        </div>
    );
}