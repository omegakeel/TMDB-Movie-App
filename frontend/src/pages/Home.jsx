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
  if (!movies) {
    return (
      <>
        <h1>Trending Movies</h1>
        <div className="grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="card">
              <div className="skeleton" />
              <div className="title" style={{ color: "var(--muted)" }}>
                Loading…
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>Trending Movies</h1>
      <div className="grid">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="card">
            {movie.poster_path ? (
              <img
                src={`${IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
                width="160"
                height="240"
                style={{ borderRadius: "8px" }}
              />
            ) : (
              <div
                style={{
                  width: 160,
                  height: 240,
                  borderRadius: "8px",
                  background: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                }}
              >
                No Poster
              </div>
            )}
            <div className="title">{movie.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
