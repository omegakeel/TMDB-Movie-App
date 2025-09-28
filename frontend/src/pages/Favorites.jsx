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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 16,
        }}
      >
        {items.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div>
              {movie.poster_path ? (
                <img
                  src={`${IMG_BASE}${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  width="160"
                />
              ) : (
                <div style={{ width: 160, height: 240, background: "#333" }} />
              )}
              <div style={{ marginTop: 8, fontWeight: 600 }}>{movie.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
