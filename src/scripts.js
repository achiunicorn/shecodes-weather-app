function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  currentCity.innerHTML = input.value;
  axios.get(apiURL).then(updateTemp);
}

function useCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
}

function updateTemp(response) {
  let changeTemp = document.querySelector("#changeTemp");
  let changeDescription = document.querySelector("#currentDescription");
  let changeHumidity = document.querySelector("#currentHumidity");
  let changeWind = document.querySelector("#currentWind");
  let weatherIcon = document.querySelector("#weatherIcon");
  changeTemp.innerHTML = Math.round(response.data.main.temp);
  changeDescription.innerHTML = response.data.weather[0].description;
  changeHumidity.innerHTML = response.data.main.humidity;
  changeWind.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function currentWeather(response) {
  let searchedCity = document.querySelector("#current-city");

  searchedCity.innerHTML = response.data.name;
  updateTemp(response);
}

function searchCurrentCity(position) {
  let apiKey = "bba7368be56623a87a536fec6a35c3b3";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(currentWeather);
}

let now = new Date();

let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekDay[now.getDay()];

let date = now.getDate();

let allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = allMonths[now.getMonth()];

let year = now.getFullYear();

let hour = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let seconds = now.getSeconds();
if (seconds < 10) {
  seconds = "0" + seconds;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${date} ${month}, ${year}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}:${seconds}`;

let apiKey = "bba7368be56623a87a536fec6a35c3b3";

let searchHere = document.querySelector("#search-form");

let findLocation = document.querySelector("#current-location");

searchHere.addEventListener("submit", searchCity);
findLocation.addEventListener("click", useCurrentLocation);
