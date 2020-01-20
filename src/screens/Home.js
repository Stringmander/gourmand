import React, { useState, useMemo } from 'react';
import useSWR from 'swr';

import PrimaryAppBar from '../components/AppBar.js';
import SearchResultsList from '../components/SearchResultsList'
import fetcher from '../lib/fetcher';
import URL from '../lib/config';

const Home = () => {
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
    },[data]);

    return (
        <div>
            <PrimaryAppBar handleSearchSubmit={handleSearchSubmit} />
            <SearchResultsList searchResults={searchResults} />
        </div>
    );
}

export default Home;