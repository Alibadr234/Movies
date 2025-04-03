// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function PopularActors() {
//   const [actors, setActors] = useState([]);

//   async function fetchPopularActors() {
//     try {
//       const response = await axios.get(
//         "https://api.themoviedb.org/3/search/person?api_key=45d1e37abba3da0419528c6d2999dc63"
//       );
//       setActors(response.data.results);
//     } catch (error) {
//       console.error("Error fetching popular actors:", error);
//     }
//   }

//   useEffect(() => {
//     fetchPopularActors();
//   }, []);

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
//       {actors.map((actor) => (
//         <Link
//           to={`/person/${actor.id}`}
//           key={actor.id}
//           className="bg-white rounded-xl shadow-lg p-2 hover:scale-105 transition"
//         >
//           <img
//             src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
//             alt={actor.name}
//             className="w-full h-48 object-cover rounded-lg"
//           />
//           <h3 className="text-center text-lg font-semibold mt-2">{actor.name}</h3>
//           <p className="text-center text-sm text-gray-600">{actor.known_for_department}</p>
//         </Link>
//       ))}
//     </div>
//   );
// }




import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PopularActors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actors, setActors] = useState([]);

  async function fetchActors(query) {
    try {
      const url = query
        ? `https://api.themoviedb.org/3/search/person?api_key=45d1e37abba3da0419528c6d2999dc63&query=${query}`
        : "https://api.themoviedb.org/3/person/popular?api_key=45d1e37abba3da0419528c6d2999dc63";

      const response = await axios.get(url);
      setActors(response.data.results);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  }

  useEffect(() => {
    fetchActors(""); // تحميل الممثلين المشهورين عند فتح الصفحة
  }, []);

  function handleSearch(e) {
    setSearchQuery(e.target.value);
    fetchActors(e.target.value);
  }

  return (
    <div className="popular-actors">
      {/* 🔍 Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for an actor..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* 🎭 Actors Grid */}
      <div className="actors-grid">
        {actors.map((actor) => (
          <Link to={`/actor/${actor.id}`} key={actor.id} className="actor-card">
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
              alt={actor.name}
              className="actor-image"
            />
            <h3 className="actor-name">{actor.name}</h3>
            <p className="actor-department">{actor.known_for_department}</p>
          </Link>
        ))}
      </div>

      {/* ❌ No results message */}
      {actors.length === 0 && <p className="no-results">No actors found. Try another name!</p>}
    </div>
  );
}
