# Akeel Butt TMDB Movie App

A full-stack movie browser built with **React (Vite)** and **Express**, powered by the **TMDB API**.  
Features include trending movies, detailed movie pages, favorites with persistence, caching/offline support, and unit tests.

---

## Features
- **Trending list** (with poster grid)
- **Movie details** (overview, runtime, genres, release date, poster)
- **Favorites** (toggle ♥, stored in `localStorage`, persists across reloads)
- **Favorites page** (`/favorites`) listing all saved movies
- **Caching + offline fallback** for trending list (6h TTL in `localStorage`)
- **Error handling** with retry and placeholders
- **Unit tests** (Vitest + React Testing Library)

---

## Tech Stack
- **Frontend**: React + Vite, React Router, localStorage
- **Backend**: Node.js + Express + dotenv (keeps API key safe)
- **Testing**: Vitest, React Testing Library, jsdom
- **Styling**: Custom CSS with dark theme, responsive grid & cards

---

## Setup

### 1. Backend (Express server)
```bash
cd server

# Copy the example env file to a real .env
cp .env.example .env

# Edit .env and add your real TMDB API key:
TMDB_KEY=your_real_tmdb_key_here
PORT=3000

# Then install and run:
npm install
node index.js

# Server should start at: http://localhost:3000
```

### 2. Frontend (React app)
```bash
# Open a second terminal
cd frontend
npm install
npm run dev
# Frontend should start at: http://localhost:5173
# Vite is configured to proxy /api → http://localhost:4000, so API calls work.

```

### Running Tests
```bash
# cd to the frontend/ folder and run:
npm test
# This includes favorites service unit tests and home page component tests.
```
