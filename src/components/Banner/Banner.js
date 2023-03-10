import { useEffect, useState } from "react";
import classes from "./Banner.module.css";
import axios from "../../api/axios";
import requests from "../../api/Requests";

const Banner = () => {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // this is the local axios.js
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request;
        }
        fetchData();
    }, [])

    // console.log(movie)

    const truncate = (string, num) => {
        return string?.length > num ? string.substring(0, num - 1) + '...' : string;
    }

    return (
        <header
            className={classes.banner}
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`
            }}>
            <div className={classes.banner_contents}>
                <h1 className={classes.banner_title}>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className={classes.banner_buttons}>
                    <button className={classes.banner_button}>Play</button>
                    <button className={classes.banner_button}>My List</button>
                </div>
                <h1 className={classes.banner_description}>
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className={classes.banner_fadeBottom} />
        </header >
    )
}

export default Banner;