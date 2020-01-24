import React, { useState, useEffect, useMemo } from 'react';
import { Route, Link, useHistory, useLocation } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useSWR from 'swr';

import PrimaryAppBar from '../components/AppBar.js';
import ResultCard from '../components/ResultCard';
import RecipeDialog from '../components/RecipeDialog';
import fetcher from '../lib/fetcher';
import path from '../lib/config';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

const Home = () => {
    const classes = useStyles();

    const [query, setQuery] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    let location = useLocation();
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [open, setOpen] = useState(location.pathname.includes("recipe"));


    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            setQuery(e.target.value);

            e.preventDefault();
        }
    }

    const { data, error } = useSWR(query ? `${path}?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}` : null, fetcher)

    useMemo(() => {
        if (data) {
            setSearchResults(data.hits);
        }
    }, [data]);


    const splitRecipeUri = (uri) => uri.split('_')[1];

    const handleClickOpen = () => {
        setOpen(true);
    }

    let history = useHistory();

    const handleCloseRouting = () => {
        history.push("/");
    }

    const handleClose = () => {
        setOpen(false);
        handleCloseRouting();
    };


    return (
        <>
            <CssBaseline />
            <Container>
                <PrimaryAppBar handleSearchSubmit={handleSearchSubmit} />
                <div className={classes.root}>
                    <Grid container spacing={3} >
                        {searchResults.map(result => (
                            <Grid key={result.recipe.uri} item lg={3} md={4} sm={6} xs={12}>
                                <Link
                                to={{ pathname: `/recipe/${splitRecipeUri(result.recipe.uri)}` }}
                                onClick={handleClickOpen}
                                >
                                    <ResultCard
                                        title={result.recipe.label}
                                        image={result.recipe.image}
                                        content={result.recipe.source}
                                    />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Container>
            <Route path="/recipe/:id" component={ () => <RecipeDialog handleClose={handleClose} open={open} /> } />
        </>
    );
}

export default Home;