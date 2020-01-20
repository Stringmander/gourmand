import React, { useState, useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useSWR from 'swr';

import PrimaryAppBar from '../components/AppBar.js';
import SearchResultsList from '../components/SearchResultsList'
import ResultCard from '../components/ResultCard'
import fetcher from '../lib/fetcher';
import URL from '../lib/config';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

const Home = () => {
    const classes = useStyles();

    const [query, setQuery] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            setQuery(e.target.value);

            e.preventDefault();
        }
    }

    const { data, error } = useSWR(query ? `${URL}?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}` : null, fetcher)

    useMemo(() => {
        if (data) {
            setSearchResults(data.hits);
        }
    }, [data]);

    return (

        <>
            <CssBaseline />
            <Container>
                <PrimaryAppBar handleSearchSubmit={handleSearchSubmit} />
                <div className={classes.root}>
                    <Grid container spacing={3} >
                        {searchResults.map(result => (
                            <Grid item lg={3} xs={12}>
                                <ResultCard
                                    title={result.recipe.label}
                                    image={result.recipe.image}
                                    content={result.recipe.source}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Container>
        </>
    );
}

export default Home;