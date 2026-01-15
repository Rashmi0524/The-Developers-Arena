// =======================
// DOM ELEMENTS
// =======================
const currentWeatherEl = document.getElementById("currentWeather");
const forecastEl = document.getElementById("forecast");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("errorBox");
const favoriteListEl = document.getElementById("favoriteList");
const mapFrame = document.getElementById("mapFrame");
const alertBox = document.getElementById("alertBox");

// =======================
// LOADING & ERROR
// =======================
function showLoading() {
  if (loadingEl) loadingEl.style.display = "block";
}

function hideLoading() {
  if (loadingEl) loadingEl.style.display = "none";
}

function showError(msg) {
  if (errorEl) errorEl.textContent = msg;
}

function clearError() {
  if (errorEl) errorEl.textContent = "";
}

// =======================
// CURRENT WEATHER CARD
// =======================
function displayCurrentWeather(data, unit) {
  const symbol = unit === "metric" ? "°C" : "°F";

  currentWeatherEl.innerHTML = `
    <div class="weather-card fade-in">
      <h2>${data.name}, ${data.sys.country}</h2>

      <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt="Weather Icon"
        class="weather-icon"
      />

      <div class="temp">
        ${Math.round(data.main.temp)} ${symbol}
      </div>

      <p class="desc">${data.weather[0].description}</p>

      <div class="details">
        <span>💧 Humidity: ${data.main.humidity}%</span>
        <span>💨 Wind: ${data.wind.speed}</span>
      </div>

      <button id="addFavBtn" class="fav-btn">
        ⭐ Add to Favorites
      </button>
    </div>
  `;
}

// =======================
// 5-DAY FORECAST
// =======================
function displayForecast(data, unit) {
  const symbol = unit === "metric" ? "°C" : "°F";

  const daily = {};
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!daily[date]) {
      daily[date] = item;
    }
  });

  const days = Object.values(daily).slice(1, 6);

  forecastEl.innerHTML = `
    <h3>5-Day Forecast</h3>
    <div class="forecast-grid">
      ${days.map(day => `
        <div class="forecast-card fade-in">
          <h4>${new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</h4>

          <img
            src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png"
            alt="Forecast Icon"
          />

          <div class="forecast-temp">
            ${Math.round(day.main.temp)} ${symbol}
          </div>

          <p>${day.weather[0].description}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// =======================
// FAVORITES UI
// =======================
function displayFavorites(cities, onClick) {
  favoriteListEl.innerHTML = "";

  if (cities.length === 0) {
    favoriteListEl.innerHTML = "<li>No favorites yet</li>";
    return;
  }

  cities.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.onclick = () => onClick(city);
    favoriteListEl.appendChild(li);
  });
}

// =======================
// WEATHER MAP
// =======================
function displayWeatherMap(lat, lon) {
  if (!mapFrame) return;

  mapFrame.src = `
    https://openweathermap.org/weathermap?
    basemap=map&
    cities=true&
    layer=temperature&
    lat=${lat}&
    lon=${lon}&
    zoom=8
  `;
}

// =======================
// WEATHER ALERTS
// =======================
function displayAlerts(alerts) {
  if (!alertBox) return;

  if (!alerts || alerts.length === 0) {
    alertBox.textContent = "No weather alerts 🚫";
    return;
  }

  alertBox.innerHTML = alerts.map(alert => `
    <div class="alert">
      <strong>${alert.event}</strong>
      <p>${alert.description}</p>
    </div>
  `).join("");
}

function clearWeather() {
  currentWeatherEl.innerHTML = "";
  forecastEl.innerHTML = "";
}


// =======================
// EXPORT
// =======================
export const weatherUI = {
  showLoading,
  hideLoading,
  showError,
  clearError,
  clearWeather,
  displayCurrentWeather,
  displayForecast,
  displayFavorites,
  displayWeatherMap,
  displayAlerts
};
