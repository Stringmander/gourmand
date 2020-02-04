import React from 'react';
import useSWR from 'swr';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


import path from '../lib/config';
import fetcher from '../lib/fetcher';

const styles = theme => ({
    dialogRoot: {
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

const useStyles = makeStyles(theme => ({
    listBackground: {
        backgroundColor: theme.palette.background.paper,
    },
    circularProgressRoot: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.dialogRoot} {...other}>
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


function RecipeDialog({ location, searchResults, handleClose, open }) {
    const classes = useStyles();
    const recipeUid = location.pathname.split('recipe/')[1];
    const currentRecipeUri = `http://www.edamam.com/ontologies/edamam.owl#recipe_${recipeUid}`;

    let recipes = new Proxy(
        searchResults,
        {
            get: function (obj, prop) {
                // The default behavior to return the value; prop is usually an integer
                if (prop in obj) {
                    return obj[prop];
                }

                let result, uris = {};

                for (let individualRecipe of obj) {
                    if (individualRecipe.recipe.uri === prop) {
                        result = individualRecipe.recipe;
                    }
                }

                // Get a recipe by name
                if (result) {
                    return result;
                }

                return undefined;
            }
        });

    const { data, error, isValidating } = useSWR(searchResults.length === 0 && location.pathname.includes('recipe') ? `${path}?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${recipeUid}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}` : undefined, fetcher)

    const currentRecipe = data ? data[0] : recipes[currentRecipeUri]


    return (
        <Dialog aria-labelledby="recipe-dialog-title" onClose={handleClose} open={open} >
            {currentRecipe && <>
                <DialogTitle id="recipe-dialog-title" onClose={handleClose} >
                    <Typography>
                        {currentRecipe.label}
                    </Typography>
                    <img src={currentRecipe.image} />
                </DialogTitle>
                <DialogContent>
                    <div className={classes.listBackground}>
                        <List>
                            {currentRecipe.ingredientLines.map(i => (
                                <ListItem key={i} dense >
                                    <ListItemText primary={i} />
                                </ListItem>
                            )
                            )}
                        </List>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" href={currentRecipe.url} target="_blank" >
                        View directions
                </Button>
                </DialogActions>
            </>}
            {isValidating && <CircularProgress /> }
        </Dialog >
    );
}

export default RecipeDialog;