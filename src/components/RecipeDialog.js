import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import path from '../lib/config';
import fetcher from '../lib/fetcher';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


export default function RecipeDialog(props) {
    const [currentRecipe, setCurrentRecipe] = useState('')

    const splitLocationPathname = props.location.pathname.split('recipe/')[1]

    const currentRecipeUri = `http://www.edamam.com/ontologies/edamam.owl#recipe_${splitLocationPathname}`;

    const findMatchingUri = array => array.findIndex(i => i.recipe.uri === currentRecipeUri);

    const { data, error } = useSWR(props.searchResults.length === 0 && props.location.pathname.includes('recipe') ? `${path}?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${splitLocationPathname}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}` : {}, fetcher)

    useEffect(() => {
        return (
            props.searchResults.length !== 0 ? setCurrentRecipe(props.searchResults[findMatchingUri(props.searchResults)].recipe)
            : data ? setCurrentRecipe(data[0])
            : error
        );
    });

    const listIngredients = currentRecipe ?  currentRecipe.ingredientLines.map(ingredient => <li> {ingredient} </li>) : "Loading..."

    return (
        <Dialog aria-labelledby="recipe-dialog-title" onClose={props.handleClose} open={props.open}>
            <DialogTitle id="recipe-dialog-title" onClose={props.handleClose} >
                <img src={currentRecipe.image} />
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Ingredients
                    <ul> {listIngredients} </ul>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus color="primary" href={currentRecipe.url} target="_blank" >
                    View directions
                </Button>
            </DialogActions>
        </Dialog>
    );
}