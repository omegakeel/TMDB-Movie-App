import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.TMDB_KEY;

// Trending movies endpoint
app.get("/api/trending", async (req, res) => {
  try {
    const timeWindow = req.query.time_window || "day"; // Default to 'day' if not provided
    const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch trending movies");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Movie details endpoint
app.get("/api/movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
