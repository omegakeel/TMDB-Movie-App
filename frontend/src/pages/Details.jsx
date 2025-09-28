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

  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16 }}>
      {movie.poster_path && (
        <img
          src={`${IMG_BASE}${movie.poster_path}`}
          alt={`${movie.title} poster`}
          width="200"
          height="300"
        />
      )}
      <div>
        <h1>{movie.title}</h1>
        <FavoriteButton movieId={movie.id} />
        <p>
          <strong>Release:</strong> {movie.release_date || "—"}
        </p>
        <p>
          <strong>Runtime:</strong>{" "}
          {movie.runtime ? `${movie.runtime} min` : "—"}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres?.map((genre) => genre.name).join(", ") || "—"}
        </p>
        <p style={{ marginTop: 12 }}>{movie.overview}</p>
      </div>
    </div>
  );
}
