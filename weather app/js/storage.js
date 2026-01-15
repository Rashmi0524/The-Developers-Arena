const KEY = "favoriteCities";

function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function addFavorite(city) {
  const favs = getFavorites();
  if (!favs.includes(city)) {
    favs.push(city);
    localStorage.setItem(KEY, JSON.stringify(favs));
  }
}

export const storage = {
  getFavorites,
  addFavorite
};
