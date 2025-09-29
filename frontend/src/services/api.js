const base = import.meta.env.VITE_API_BASE || "";
export const IMG_BASE = "https://image.tmdb.org/t/p/w342";

// cache keys + TTL
const TRENDING_KEY = "cache_trending_day_v1";
const TRENDING_TTL = 1000 * 60 * 60 * 6; // 6 hours

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (Date.now() - obj.ts > obj.ttl) return null;
    return obj.data;
  } catch {
    return null;
  }
}

function writeCache(key, data, ttl) {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), ttl, data }));
  } catch {}
}

export async function getTrendingMovies(timeWindow = "day") {
  const key = TRENDING_KEY.replace("_day_", `_${timeWindow}_`); // simple variant
  // 1) check cached data first
  const cached = readCache(key);
  if (cached) return cached;

  // 2) fetch network
  try {
    const res = await fetch(`${base}/api/trending?time_window=${timeWindow}`);
    if (!res.ok) throw new Error("Failed to load trending movies");
    const data = await res.json();
    // update cache data
    writeCache(key, data, TRENDING_TTL);
    return data;
  } catch (error) {
    // 3) fallback: if offline and had cache (already returned above), else throw
    if (!navigator.onLine) {
      throw new Error("Offline and no cached results available");
    }
    throw error;
  }
}

const DETAILS_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function getMovieDetails(id) {
  const key = `cache_movie_${id}_v1`;

  // 1) try cache
  const cached = readCache(key);
  if (cached) return cached;

  // 2) fetch network
  try {
    const res = await fetch(`${base}/api/movie/${id}`);
    if (!res.ok) throw new Error("Failed to load movie details");
    const data = await res.json();
    writeCache(key, data, DETAILS_TTL);
    return data;
  } catch (e) {
    // 3) offline fallback
    if (!navigator.onLine) {
      throw new Error("Offline and no cached details available");
    }
    throw e;
  }
}
