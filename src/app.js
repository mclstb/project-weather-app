function formatDate(timestamp) {
  //calculate date and return it
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

//change weather info according to city searched

function showTemperature(response) {
  console.log(response.data);
  let currentTemperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${currentTemperature}`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  celsiusTemp = response.data.temperature.current;
}

function search(city) {
  let apiKey = "a5e9d6baaddo9b42fdt0da22d43443d0";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(Event) {
  Event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//geolocate

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  let apiKey = "a5e9d6baaddo9b42fdt0da22d43443d0";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  // remove active class to celsius when fahrenheit active
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("London");
