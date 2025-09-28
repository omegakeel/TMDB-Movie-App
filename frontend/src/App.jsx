import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Favorites from "./pages/Favorites.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <NavLink to="/" className="navlink">
            Home
          </NavLink>
          <NavLink to="/favorites" className="navlink">
            Favorites
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>

      <footer className="footer">
        <span>Akeel Butt TMDB Demo</span>
      </footer>
    </div>
  );
}
