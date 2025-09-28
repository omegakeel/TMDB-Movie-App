import { getFavorites, isFavorite, toggleFavorite } from "./favorites";

const KEY = "favorites_v1";

beforeEach(() => {
  localStorage.clear();
});

test("starts empty", () => {
  expect(getFavorites()).toEqual([]);
});

test("toggle adds and removes an id", () => {
  expect(isFavorite(25)).toBe(false);
  toggleFavorite(25);
  expect(isFavorite(25)).toBe(true);
  expect(getFavorites()).toEqual([25]);

  toggleFavorite(25);
  expect(isFavorite(25)).toBe(false);
  expect(getFavorites()).toEqual([]);
});

test("persists in localStorage", () => {
  toggleFavorite(7);
  const raw = localStorage.getItem(KEY);
  expect(JSON.parse(raw)).toEqual([7]);
});
