import React, { useState, useEffect } from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css';


function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);

            setMovie(
                // request.data.results gives the list(array) of all the movies netflix original movies.. but we 
                // want to show only one. so we get a random index using math.random and showing that movie.
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
        }

        fetchData();
        
    }, []);

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

  return (
      <header className='banner'
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center",
        }}
      >
        <div className='banner__contents'>
            
            <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>

            <div className='banner__buttons'>
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>

            <div className='banner__description'>
                {truncate(movie?.overview, 150)}
            </div>
        </div>
        {/* title */}

        <div className='banner__fadeBottom'/>
        
    </header>
        // we used header and div both because we wanted to style two different things in other ways. 
        // background and contents in another format so we use two so they don't clash
  )
}

export default Banner