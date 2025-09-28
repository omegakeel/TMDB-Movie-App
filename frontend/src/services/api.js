export async function getTrendingMovies(timeWindow = "day") {
  const response = await fetch(`/api/trending?time_window=${timeWindow}`);
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  return response.json();
}

export async function getMovieDetails(id) {
  const response = await fetch(`/api/movie/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
}
