import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import './Row.css';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {

    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/"

    // This is also the local axios
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        // execute the function here
        fetchData();
    }, [fetchUrl])

    // console.log(movies);

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {movies.map(movie =>
                    ((isLargeRow && movie.poster_path) ||
                        (!isLargeRow && movie.backdrop_path)) && (
                        < img
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                            key={movie.id}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Row;
