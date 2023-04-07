let apiKey = "a5e9d6baaddo9b42fdt0da22d43443d0";
let units = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=${units}`;

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
  dateElement.innerHTML = formatDate(response.time * 1000).value;
}

function formatDate(timestamp) {
  //calculate date and return it
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  return `${day} ${hours}: ${minutes}`;
}

axios.get(apiUrl).then(showTemperature);
