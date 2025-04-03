import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ActorDetails() {
  const { id } = useParams(); 
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  async function getActorDetails() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=45d1e37abba3da0419528c6d2999dc63`
      );
      setActor(response.data);
    } catch (error) {
      console.error('Error fetching actor details:', error);
    }
  }

  async function getActorMovies() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=45d1e37abba3da0419528c6d2999dc63`
      );
      setMovies(response.data.cast);
    } catch (error) {
      console.error('Error fetching actor movies:', error);
    }
  }

  useEffect(() => {
    getActorDetails();
    getActorMovies();
  }, [id]);

  if (!actor) return <h2>Loading...</h2>;

  return (
    <div className="actor-details-page-container">
      <div className="actor-details-page-header">
        <img
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          className="actor-details-page-image"
        />
        <div className="actor-details-page-info">
          <h1 className="actor-details-page-name">{actor.name}</h1>
          <p className="actor-details-page-bio">{actor.biography || 'No biography available'}</p>
          <p className="actor-details-page-birth">🎂 {actor.birthday || 'Unknown'}</p>
        </div>
      </div>

      <h2 className="actor-details-page-movies-title">Famous Movies</h2>
      <div className="actor-details-page-movies-list">
        {movies.slice(0, 10).map((movie) => (
          <div className="actor-details-page-movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="actor-details-page-movie-image"
            />
            <h3 className="actor-details-page-movie-title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
