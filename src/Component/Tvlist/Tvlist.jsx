// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { FaStar } from 'react-icons/fa'
// import { useNavigate } from 'react-router-dom';

// export default function Tvlist() {
//   const [movies, setMovies] = useState([]);
//   const navigate = useNavigate(); // ⬅️ تعريف useNavigate


//   async function Getdata() {
//       try {
//           const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=45d1e37abba3da0419528c6d2999dc63`);
//           setMovies(response.data.results);
//           console.log(response.data.results)

//       } catch (error) {
//           console.error("Error fetching movies:", error);
//       }
//   }

//   useEffect(() => {
//       Getdata();
//   }, []);
//   const handleMovieClick = (id) => {
//     navigate(`/detailsTv/${id}`);
//   };
//   return  (    <div className="movies-container">
//     {movies.map((movie) => (
//       <div          className="movie-card" 
//       key={movie.id} 
//       onClick={() => handleMovieClick(movie.id)} // ⬅️ استدعاء الدالة عند الضغط
//       style={{ cursor: 'pointer' }} // ⬅️ تغيير شكل المؤشر للإشارة أنه يمكن الضغط
//     ><img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.original_title}
//           className="movie-image"
//         />
//         <div className="movie-info">
//           <h3 className="movie-title">{movie.name}</h3>
//           <div className="movie-details">
//             <span className="movie-year">{movie.first_air_date}</span>
//             <span className="movie-rating">
//               <FaStar className="star-icon" /> {movie.vote_average.toFixed(1)}
//             </span>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );
// }





import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export default function Movielist() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  async function fetchMovies(query) {
    try {
      const url = query
      ? `https://api.themoviedb.org/3/search/tv?api_key=45d1e37abba3da0419528c6d2999dc63&query=${query}`
      : `https://api.themoviedb.org/3/discover/tv?api_key=45d1e37abba3da0419528c6d2999dc63`;

      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  useEffect(() => {
    fetchMovies(""); // تحميل الأفلام الشهيرة عند فتح الصفحة
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    fetchMovies(e.target.value);
  };

  return (
    <div className="movie-list">
      {/* 🔍 Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* 🎬 Movies Grid */}
      <div className="movies-container">
        {movies.map((movie) => (
          <div 
            className="movie-card" 
            key={movie.id} 
            onClick={() => navigate(`/detailsTv/${movie.id}`, { replace: true })}
          >
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
              alt={movie.original_title}
              className="movie-image"
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.name}</h3>
              <div className="movie-details">
                <span className="movie-year">{movie.release_date}</span>
                <span className="movie-rating">
                <FaStar className="star-icon" style={{ color: '#FF4500' }} />
{movie.vote_average?.toFixed(1)}

                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ❌ No results message */}
      {movies.length === 0 && <p className="no-results">No movies found. Try another name!</p>}
    </div>
  );
}