import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies, IMG_BASE } from "../services/api";

export default function Home() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getTrendingMovies()
      .then((data) => setMovies(data.results))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  if (!movies) return <div>Loading...</div>;

  return (
    <>
      <h1>Trending Movies</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 16,
        }}
      >
        {movies.map((movie) => (
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
