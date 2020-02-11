import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { Route, Link, useHistory, useLocation } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import PrimaryAppBar from '../src/components/AppBar.js';
import MenuDrawer from '../src/components/MenuDrawer.js'
import ResultCard from '../src/components/ResultCard';
import RecipeDialog from '../src/components/RecipeDialog';
import fetcher from '../src/lib/fetcher';
import path from '../src/lib/config';

const useStyles = makeStyles(theme => ({
    gridRoot: {
        flexGrow: 1,
    },
    circularProgressRoot: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const Home = () => {
    const classes = useStyles();

    let location = useLocation();

    const [query, setQuery] = useState('');
    const [menuDrawerOpen, setMenuDrawerOpen] = useState(false)
    const [searchResults, setSearchResults] = useState([]);
    const [recipeDialogOpen, setRecipeDialogOpen] = useState(location.pathname.includes('recipe'));


    const handleSearchSubmit = e => {
        if (e.key === 'Enter') {
            setQuery(e.target.value);

            e.preventDefault();
        }
    }

    const { data, error, isValidating } = useSWR(query !== '' ? `${path}?q=${query}&to=12&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}` : [], fetcher)

    useMemo(() => {
        return data ? setSearchResults(data.hits) : []
    }, [data]);


    const splitRecipeUri = uri => uri.split('_')[1];

    const handleClickOpen = () => {
        setRecipeDialogOpen(true);
    };


    let history = useHistory();

    const handleClose = () => {
        setRecipeDialogOpen(false);
        history.push("/");
    };


    return (
        <>
            <CssBaseline />
            <PrimaryAppBar handleSearchSubmit={handleSearchSubmit} setMenuDrawerOpen={setMenuDrawerOpen} />
            <MenuDrawer open={menuDrawerOpen} setOpen={setMenuDrawerOpen} />
            <Container>
                {searchResults.length !== 0 && <div className={classes.gridRoot}>
                    <Grid container spacing={3} >
                        {searchResults.map(i => (
                            <Grid key={i.recipe.uri} item lg={3} md={4} sm={6} xs={12}>
                                <Link
                                    to={{ pathname: `/recipe/${splitRecipeUri(i.recipe.uri)}` }}
                                    onClick={handleClickOpen}
                                >
                                    <ResultCard
                                        title={i.recipe.label}
                                        image={i.recipe.image}
                                        content={i.recipe.source}
                                    />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </div>}
                {isValidating && <CircularProgress />}
            </Container>
            <Route
                path="/recipe/:id"
                component={() => <RecipeDialog
                    handleClose={handleClose}
                    open={recipeDialogOpen}
                    location={location}
                    searchResults={searchResults}
                />}
            />
        </>
    );
}

export default Home;