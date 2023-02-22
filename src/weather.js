let weatherIcons = {
  clearNight: "fa-solid fa-moon",
  clearDay: "fa-solid fa-sun",
  rainNight: "fa-solid fa-cloud-moon-rain",
  rainDay: "fa-solid fa-cloud-sun-rain",
  thunderstorm: "fa-solid fa-cloud-bolt",
  drizzle: "fa-solid fa-cloud-rain",
  snow: "fa-solid fa-snowflake",
  atmosphere: "fa-solid fa-smog",
  fewCloudsNight: "fa-solid fa-cloud-moon",
  fewCloudsDay: "fa-solid fa-cloud-sun",
  clouds: "fa-solid fa-cloud",
};

let weatherBackgroudImages = {
  clearNight: "clearsky_night.jpg",
  clearDay: "clearsky_day.jpg",
  rainNight: "rainy_night.jpg",
  rainDay: "rainy_day.jpg",
  thunderstorm: "thunderstorm.jpg",
  drizzle: "drizzle.jpg",
  snow: "snow.jpg",
  atmosphere: "atmosphere.jpg",
  fewCloudsNight: "clouds_night.jpg",
  fewCloudsDay: "clouds_day.jpg",
  clouds: "cloudy.jpg",
};

function convertTemperature(valueClass, unitClass, event) {
  let temp = document.querySelector(valueClass);
  console.log(temp.innerHTML);
  let unit = document.querySelector(unitClass);

  if (unit.innerHTML === "˚C") {
    let frh = Math.round((temp.innerHTML * 9) / 5 + 32);
    console.log(frh);
    temp.innerHTML = frh;
    unit.innerHTML = "˚F";
  } else {
    let cel = Math.round(((temp.innerHTML - 32) * 5) / 9);
    console.log(cel);
    temp.innerHTML = cel;
    unit.innerHTML = "˚C";
  }
}

function changeCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector(".city-name");
  let searchForm = document.querySelector(".search-form");
  let newName = cityInput.value.trim();
  cityName.innerHTML = newName;
  searchForm.reset();
}

function formatDate() {
  let date = new Date();
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
  let formatedDate = `${day} ${hours}:${minutes}`;
  document.querySelector(".date-time").innerHTML = formatedDate;
  setTimeout(formatDate, 1000);
}

let tempUnit = document.querySelectorAll(".temp-main");
tempUnit.forEach((temp) => {
  temp.addEventListener("click", (event) => {
    convertTemperature(".temp-value-1", ".unit-1", event);
    convertTemperature(".temp-value-2", ".unit-2", event);
    convertTemperature(".temp-value-3", ".unit-3", event);
    convertTemperature(".temp-value-4", ".unit-4", event);
  });
});
function setBackgroundImage(description) {
  let currentWeatherElement = document.querySelector(".current-weather");
  currentWeatherElement.style.backgroundRepeat = "no-repeat";
  currentWeatherElement.style.backgroundPosition = "center";
  currentWeatherElement.style.backgroundAttachment = "fixed";
  currentWeatherElement.style.backgroundSize = "cover";
  switch (description.toLowerCase()) {
    case "clouds":
      currentWeatherElement.style.backgroundImage = "url(../imgs/cloudy.jpg)";
      break;
    case "rain":
      currentWeatherElement.style.backgroundImage =
        "url(../imgs/rainy_day.jpg)";
      break;
    case "clear":
      currentWeatherElement.style.backgroundImage =
        "url(../imgs/clearsky_day.jpg)";
      break;
    case "drizzle":
      currentWeatherElement.style.backgroundImage = "url(../imgs/drizzle.jpg)";
      break;
    case "thunderstorm":
      currentWeatherElement.style.backgroundImage =
        "url(../imgs/thunderstorm.jpg)";
      break;
    case "mist":
      currentWeatherElement.style.backgroundImage =
        "url(../imgs/atmosphere.jpg)";
      break;
    case "snow":
      currentWeatherElement.style.backgroundImage = "url(../imgs/snow.jpg)";
      break;
    default:
      currentWeatherElement.style.backgroundImage = "url(../imgs/cloudy.jpg)";
  }
}
function setForecastIcon(description) {
  switch (description.toLowerCase()) {
    case "clouds":
      return weatherIcons.clouds;
    case "rain":
      return weatherIcons.rainDay;
    case "clear":
      return weatherIcons.clearDay;
    case "drizzle":
      return weatherIcons.drizzle;
    case "thunderstorm":
      return weatherIcons.thunderstorm;
    case "mist":
      return weatherIcons.atmosphere;
    case "smoke":
      return weatherIcons.atmosphere;
    case "haze":
      return weatherIcons.atmosphere;
    case "dust":
      return weatherIcons.atmosphere;
    case "sand":
      return weatherIcons.atmosphere;
    case "fog":
      return weatherIcons.atmosphere;
    case "ash":
      return weatherIcons.atmosphere;
    case "squall":
      return weatherIcons.atmosphere;
    case "tornado":
      return weatherIcons.atmosphere;
    case "snow":
      return weatherIcons.snow;
    default:
      return weatherIcons.clearDay;
  }
}

function setForecast(forecast) {
  let forecastElement = document.querySelector("#forecast");

  let forecastContent = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      console.log(forecastDay.weather[0].main);
      forecastContent =
        forecastContent +
        `<div class="col-2 text-center">
            <p>${formatDay(forecastDay.dt)}</p>
            <i class="${setForecastIcon(forecastDay.weather[0].main)}"></i>
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}˚</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}˚</span>
            </div>
          </div>`;
    }
  });
  forecastContent = forecastContent + `</div>`;

  forecastElement.innerHTML = forecastContent;
}
function setHourlyForecast(hourlyForecast) {
  console.log(hourlyForecast);
  console.log(formatHour(hourlyForecast[0].dt));

  Chart.register(ChartDataLabels);
  let chartStatus = Chart.getChart("hourly-forecast-chart"); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  const ctx = document.getElementById("hourly-forecast-chart");
  console.log(ctx);
  let dataset = [
    Math.round(hourlyForecast[0].temp),
    Math.round(hourlyForecast[3].temp),
    Math.round(hourlyForecast[6].temp),
    Math.round(hourlyForecast[9].temp),
    Math.round(hourlyForecast[12].temp),
    Math.round(hourlyForecast[15].temp),
  ];
  var lineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        `${formatHour(hourlyForecast[0].dt)}:00`,
        `${formatHour(hourlyForecast[3].dt)}:00`,
        `${formatHour(hourlyForecast[6].dt)}:00`,
        `${formatHour(hourlyForecast[9].dt)}:00`,
        `${formatHour(hourlyForecast[12].dt)}:00`,
        `${formatHour(hourlyForecast[15].dt)}:00`,
      ],
      datasets: [
        {
          label: "˚C",
          data: dataset,
          borderWidth: 1,
          fill: false,
          borderColor: "rgb(55, 80, 111)",
          tension: 0.4,
          pointBackgroundColor: "rgb(55, 80, 111)",
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
            beginAtZero: false,
          },
          min: Math.min(...dataset) - 2,
          max: Math.max(...dataset) + 1,
        },
      },
      maintainAspectRatio: true,
      responsive: true,
      title: {
        display: true,
        text: " ",
      },
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          anchor: "start",
          offset: 2,
          align: "top",
          clamp: "true",
          font: {
            weight: "bold",
          },
          color: "#385170",
        },
      },
    },
  });
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let hourlyForecast = response.data.hourly;
  setForecast(forecast);
  setHourlyForecast(hourlyForecast);
}
function getForecast(coords) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?
lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemperature(response) {
  let tempElement = document.querySelector(".temp-value-1");
  let highElement = document.querySelector(".temp-value-2");
  let lowElement = document.querySelector(".temp-value-3");
  let windElement = document.querySelector("#wind");
  let humElement = document.querySelector("#hum");
  let feelsElement = document.querySelector(".temp-value-4");
  let descriptionElement = document.querySelector(".weather-mood");
  let cityNameElement = document.querySelector(".city-name");

  tempElement.innerHTML = Math.round(response.data.main.temp);
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humElement.innerHTML = Math.round(response.data.main.humidity);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityNameElement.innerHTML = response.data.name;

  let broadDescription = response.data.weather[0].main;

  setBackgroundImage(broadDescription);

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();

  return hours;
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?
lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
let currentLocationIcon = document.querySelector("#current-location");
function clickIcon() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
currentLocationIcon.addEventListener("click", clickIcon);

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let newName = cityInput.value.trim();
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?
q=${newName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
  let searchForm = document.querySelector(".search-form");
  searchForm.reset();
});
formatDate();

function defaultCity(city) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?
q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
defaultCity("Montreal");
navigator.geolocation.getCurrentPosition(getPosition);
