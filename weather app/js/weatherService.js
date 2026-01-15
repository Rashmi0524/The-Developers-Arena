import { CONFIG } from "./config.js";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}

async function getWeatherByCity(city, unit) {
  return fetchJSON(
    `${CONFIG.BASE_URL}/weather?q=${city}&units=${unit}&appid=${CONFIG.API_KEY}`
  );
}

async function getForecastByCity(city, unit) {
  return fetchJSON(
    `${CONFIG.BASE_URL}/forecast?q=${city}&units=${unit}&appid=${CONFIG.API_KEY}`
  );
}


async function getWeatherByCoords(lat, lon) {
  return fetchJSON(
    `${CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${CONFIG.API_KEY}`
  );
}

async function getForecastByCoords(lat, lon) {
  return fetchJSON(
    `${CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${CONFIG.API_KEY}`
  );
}

export const weatherService = {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords
};


