import { weatherService } from "./weatherService.js";
import { weatherUI } from "./ui.js";
import { storage } from "./storage.js";

let unit = "metric"; // metric = °C | imperial = °F

// =======================
// DOM ELEMENTS
// =======================
const searchInput = document.getElementById("searchInput");
const unitToggle = document.getElementById("unitToggle");
const themeToggle = document.getElementById("themeToggle");
const cityList = document.getElementById("cityList");



// =======================
// AUTOCOMPLETE
// =======================
const commonCities = [
  "Mumbai", "Delhi", "Pune", "Nagpur",
  "London", "New York", "Tokyo", "Paris"
];

if (cityList) {
  commonCities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    cityList.appendChild(option);
  });
}

// =======================
// MAIN WEATHER FUNCTION
// =======================
async function loadWeather(city) {
  if (!city) return;

  try {
    weatherUI.clearError();
    weatherUI.showLoading();

    // 🌦 Fetch weather
    const current = await weatherService.getWeatherByCity(city, unit);
    const forecast = await weatherService.getForecastByCity(city, unit);

    // 🖥 UI Updates
    weatherUI.displayCurrentWeather(current, unit);
    weatherUI.displayForecast(forecast, unit);

    // 🗺 Weather Map
    weatherUI.displayWeatherMap(
      current.coord.lat,
      current.coord.lon
    );

    // ⚠ Alerts
    weatherUI.displayAlerts(current.alerts);

    // ⭐ Favorites button
    const favBtn = document.getElementById("addFavBtn");
    if (favBtn) {
      favBtn.onclick = () => {
        storage.addFavorite(city);
        showFavorites();
      };
    }

  } catch (error) {
    weatherUI.clearWeather();
    weatherUI.showError("❌ City not found");
  } finally {
    weatherUI.hideLoading();
  }
}

// =======================
// UNIT TOGGLE
// =======================
unitToggle.addEventListener("click", () => {
  unit = unit === "metric" ? "imperial" : "metric";
  unitToggle.textContent =
    unit === "metric" ? "Switch to °F" : "Switch to °C";

  if (searchInput.value) {
    loadWeather(searchInput.value.trim());
  }
});

// =======================
// THEME TOGGLE
// =======================
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent =
      document.body.classList.contains("dark") ? "☀ Light" : "🌙 Dark";
  });
}

// =======================
// SEARCH EVENTS
// =======================
searchInput.addEventListener("change", () => {
  loadWeather(searchInput.value.trim());
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    loadWeather(searchInput.value.trim());
  }
});

// =======================
// FAVORITES
// =======================
function showFavorites() {
  const favorites = storage.getFavorites();
  weatherUI.displayFavorites(favorites, loadWeather);
}

// Load favorites on page load
window.addEventListener("load", showFavorites);
