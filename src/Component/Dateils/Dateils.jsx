// 

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Dateils() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [teler, setTeler] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  async function GetMovieDetails() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=45d1e37abba3da0419528c6d2999dc63`
      );
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  async function GetTrailer() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=45d1e37abba3da0419528c6d2999dc63`
      );
      const officialTrailer = response.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
      setTeler(officialTrailer ? officialTrailer.key : null);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  }

  async function GetCast() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=45d1e37abba3da0419528c6d2999dc63`
      );
      setCast(response.data.cast);
    } catch (error) {
      console.error("Error fetching cast:", error);
    }
  }

  async function GetRecommendations() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=45d1e37abba3da0419528c6d2999dc63`
      );
      setRecommendations(response.data.results);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  }

  useEffect(() => {
    GetMovieDetails();
    GetTrailer();
    GetCast();
    GetRecommendations();
  }, [id]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  if (!movie) return <h2>Loading...</h2>;

  return (
    <>
      <div className="details-container" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className="details-content">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)}</p>
        </div>
      </div>

      <div className="cast-container">
        <h3>Cast</h3>
        <Slider {...sliderSettings}>
          {cast.map((actor) => (
            <div key={actor.id} className="actor-card">
              <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              <p>{actor.name}</p>
              <p className="character">as {actor.character}</p>
            </div>
          ))}
        </Slider>
      </div>

      {teler && (
        <div className="trailer-container">
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${teler}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="recommendations">
        <h3>Recommended Movies</h3>
        <Slider {...sliderSettings}>
          {recommendations.map((rec) => (
            <div key={rec.id} className="recommendation-card" onClick={() => navigate(`/details/${rec.id}`)}>
              <img src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`} alt={rec.title} />
              <p>{rec.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
