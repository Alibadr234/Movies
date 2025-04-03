import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'


export default function Sliderthree() {
    const [movies, setMovies] = useState([]);

    async function Getdata() {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=45d1e37abba3da0419528c6d2999dc63`);
            setMovies(response.data.results);
            console.log(response.data.results)
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    useEffect(() => {
        Getdata();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, 
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 5 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } }, /* ✅ هنا خليته كارتين بدل كارت واحد */
            { breakpoint: 480, settings: { slidesToShow: 3 } }  /* ✅ برضه كارتين للموبايل */
        ],
    };

  return(
    <div className="slider-container">
        <h2 className="title">trending</h2>
        <Slider {...settings}>
            {movies.map((movie) => (
                <div key={movie.id} className="slide">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.name}
                        className="movie-poster"
                    />
                    <p className="movie-title">{movie.name}</p> {/* تغيير من title إلى name */}
                </div>
            ))}
        </Slider>
    </div>
);
}
