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

function setBackgroundGradient(description) {
  let weatherBackgroudGradients = {
    clear:
      "linear-gradient(179.1deg, rgb(247, 238, 238) -1.9%, rgb(247, 202, 201) 44.9%, rgb(145, 168, 208) 96.1%)",
    rain: "linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%)",
    snow: "radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)",
    atmosphere:
      "radial-gradient(666px at 0.4% 48%, rgb(202, 204, 227) 0%, rgb(89, 89, 99) 97.5%)",
    clouds:
      "linear-gradient(109.6deg, rgb(185, 212, 242) 11.2%, rgb(244, 210, 226) 100.3%)",
  };
  let bodyElement = document.querySelector("body");
  switch (description.toLowerCase()) {
    case "clouds":
      bodyElement.style.background = weatherBackgroudGradients.clouds;
      break;
    case "rain":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.rain;
      break;
    case "clear":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.clear;
      break;
    case "drizzle":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.rain;
      break;
    case "thunderstorm":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.rain;
      break;
    case "mist":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.atmosphere;
      break;
    case "smoke":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.atmosphere;
      break;
    case "haze":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.atmosphere;
      break;
    case "dust":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.atmosphere;
      break;
    case "sand":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.atmosphere;
      break;
    case "fog":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.atmosphere;
      break;
    case "ash":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.atmosphere;
      break;
    case "squall":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.atmosphere;
      break;
    case "tornado":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.atmosphere;
      break;
    case "snow":
      bodyElement.style.backgroundImage = weatherBackgroudGradients.snow;
      break;
    default:
      bodyElement.style.backgroundImage = weatherBackgroudGradients.clear;
  }
}

function setForecastIcon(description) {
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
            <p class="weather-forecast-day">${formatDay(forecastDay.dt)}</p>
            <i class="${setForecastIcon(
              forecastDay.weather[0].main
            )} weather-forecast-i"></i>
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
  console.log(response);
  tempElement.innerHTML = Math.round(response.data.main.temp);
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humElement.innerHTML = Math.round(response.data.main.humidity);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityNameElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let broadDescription = response.data.weather[0].main;

  setBackgroundGradient(broadDescription);

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

function clickIcon() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  form.reset();
}

function clickIcon() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationIcon = document.querySelector("#current-location");
currentLocationIcon.addEventListener("click", clickIcon);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
formatDate();
