import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, IMG_BASE } from "../services/api";
import FavoriteButton from "../components/FavoriteButton";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieDetails(id)
      .then(setMovie)
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) return <div className="error"> Error: {error}</div>;
  if (!movie) {
    return (
      <div className="detail-wrap">
        <div className="poster skeleton" />
        <div>
          <div
            className="skeleton"
            style={{ height: 24, width: 240, marginBottom: 10 }}
          />
          <div
            className="skeleton"
            style={{ height: 16, width: "60%", marginBottom: 8 }}
          />
          <div className="skeleton" style={{ height: 16, width: "50%" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="detail-wrap">
      {movie.poster_path ? (
        <img
          className="poster"
          src={`${IMG_BASE}${movie.poster_path}`}
          alt={`${movie.title} poster`}
          style={{ height: 320 }}
        />
      ) : (
        <div className="poster" style={{ height: 320 }} />
      )}

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 style={{ margin: 0 }}>{movie.title}</h1>
          <FavoriteButton movieId={movie.id} />
        </div>

        <div className="detail-meta">
          <div className="row">
            <strong>Release:</strong> {movie.release_date || "—"}
          </div>
          <div className="row">
            <strong>Runtime:</strong>{" "}
            {movie.runtime ? `${movie.runtime} min` : "—"}
          </div>
          <div className="row">
            <strong>Genres:</strong>{" "}
            {movie.genres?.map((g) => g.name).join(", ") || "—"}
          </div>
        </div>

        <p style={{ marginTop: 12 }}>{movie.overview}</p>
      </div>
    </div>
  );
}
