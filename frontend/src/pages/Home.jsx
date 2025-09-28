import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "../services/api";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTrendingMovies()
      .then((data) => setMovies(data.results))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!movies.length) return <div>Loading...</div>;

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
