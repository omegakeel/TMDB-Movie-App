import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";

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
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
    </div>
  );
}
