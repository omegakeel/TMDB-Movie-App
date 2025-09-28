import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "../services/favorites";

export default function FavoriteButton({ movieId }) {
  const [fav, setFav] = useState(false);
  useEffect(() => setFav(isFavorite(movieId)), [movieId]);
  return (
    <button
      onClick={() => setFav(toggleFavorite(movieId))}
      aria-pressed={fav}
      style={{ marginLeft: 8 }}
      title={fav ? "Remove from favorites" : "Add to favorites"}
    >
      {fav ? "♥ Favorite" : "♡ Favorite"}
    </button>
  );
}
