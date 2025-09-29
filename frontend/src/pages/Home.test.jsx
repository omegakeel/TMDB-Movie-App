import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock the API module used by Home.jsx
vi.mock("../services/api", () => ({
  getTrendingMovies: vi.fn().mockResolvedValue({
    results: [{ id: 1, title: "Mock Movie", poster_path: null }],
  }),
  IMG_BASE: "https://image.tmdb.org/t/p/w342",
}));

import Home from "./Home";

test("renders trending list items from API", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Mock Movie")).toBeInTheDocument();
  });
});
