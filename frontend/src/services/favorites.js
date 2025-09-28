const KEY = "favorites_v1";

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const isFavorite = (id) => getFavorites().includes(id);

export const toggleFavorite = (id) => {
  const set = new Set(getFavorites());
  set.has(id) ? set.delete(id) : set.add(id);
  localStorage.setItem(KEY, JSON.stringify([...set]));
  return set.has(id);
};
