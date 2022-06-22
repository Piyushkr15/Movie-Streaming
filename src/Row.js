//for components we use capital letter Row.js instead of row.js

import React, { useState, useEffect } from 'react';
import axios from './axios';
// we can change the rename during import(in this case we export instance but called it axios instead) if it is a default export.
// if its not a default export we use { } => brackets
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        // if we leave the bracket[] empty, then we are saying run once when the road loads and don't run again.
        // if we write [movies], it depends on movies and it runs every time when movies changes

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // wait for the answer to come back and then do something 
            // https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213 => 
            // we get this beginning url for the NETFLIX ORIGINAL request

            // console.log(request); => we can use this to know what we get back from the request
            // return request;

            setMovies(request.data.results);
        }

        fetchData();

    }, [fetchUrl])

    // if anything is being pulled in from outside inside the useEffect.. it must be included inside [] => because it is dependent on it
    // we write fetchUrl inside [] to tell useEffect that we are using this (fetchUrl) variable outside the block.
    console.log(movies);
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    
    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
            //if trailer is already open it sets the trailer to empty. so it closes it.
        }
        else{
            movieTrailer(movie?.name || "" )
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
                //it gives the unique ID of a url.. substring of URL;
            })
            .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2> {title} </h2>

            <div className="row__posters">

                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick = {() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
// only one default export in a single file