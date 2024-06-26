import {useEffect, useState} from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com?apikey=982ce2d7';

const movie1 = {   
    "Title": "The Amazing Spiderman",
    "Year": "2017",
    "imdbID": "tt18351128",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {
    const [movies, setMovies ] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => { 
        searchMovies('Spiderman');

    }, []);

    return (
        <div className="app">
        <h1>MovieWorld</h1>

        <div className="search">
            <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img 
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {movies?.length > 0
            ? (
                <div className="Container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
}

export default App;