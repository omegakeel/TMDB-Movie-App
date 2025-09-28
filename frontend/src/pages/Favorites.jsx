import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovieDetails, IMG_BASE } from "../services/api";
import { getFavorites } from "../services/favorites";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const ids = getFavorites();
    if (!ids.length) return setItems([]);
    Promise.all(ids.map((id) => getMovieDetails(id)))
      .then(setItems)
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p>{error}</p>;
  if (!items.length) return <p>No favorites yet.</p>;

  return (
    <>
      <h1>My Favorites</h1>
      <div className="grid">
        {items.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="card">
            {movie.poster_path ? (
              <img
                className="poster"
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            ) : (
              <div className="poster" />
            )}
            <div className="title">{movie.title}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
