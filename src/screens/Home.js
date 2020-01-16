import React, { useState } from 'react';
import useSWR from 'swr';
import PrimaryAppBar from '../components/AppBar.js';
import fetcher from '../lib/fetcher';
import URL from '../lib/config';

const Home = () => {
    const [query, setQuery] = useState(null);

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
           setQuery(e.target.value);
          
           e.preventDefault();
        } 
    }
    
    const { data, error } = useSWR(query ? `${URL}?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}` : null , fetcher)

    if (data) {
        let searchResults = data.hits
        console.log(searchResults);
    }
    
    return (
        <PrimaryAppBar handleSearchSubmit={handleSearchSubmit} />
    );
}

export default Home;