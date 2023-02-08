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
  currentWeatherElement = document.querySelector(".current-weather");
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
function showCurrentTemperature(response) {
  let tempElement = document.querySelector(".temp-value-1");
  let highElement = document.querySelector(".temp-value-2");
  let lowElement = document.querySelector(".temp-value-3");
  let windElement = document.querySelector("#wind");
  let humElement = document.querySelector("#hum");
  let feelsElement = document.querySelector(".temp-value-4");
  let descriptionElement = document.querySelector(".weather-mood");
  let cityNameElement = document.querySelector(".city-name");

  console.log(response.data);

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
}

function getHourlyForecast(response) {}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastContent = `<div class="row">`;

  forecastContent =
    forecastContent +
    `<div class="col-2 text-center">
            <p>Sat</p>
            <i class="fa-solid fa-cloud"></i>
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">2˚</span>
              <span class="weather-forecast-temperature-min">-2˚</span>
            </div>
          </div>`;

  forecastContent = forecastContent + `</div>`;

  forecastElement.innerHTML = forecastContent;
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

function setHourlyForecast() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ["Year", "Sales", "Expenses"],
      ["2013", 1000, 400],
      ["2014", 1170, 460],
      ["2015", 660, 1120],
      ["2016", 1030, 540],
    ]);

    var options = {
      title: "Company Performance",
      hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
      vAxis: { minValue: 0 },
    };

    var chart = new google.visualization.AreaChart(
      document.getElementById("chart_div")
    );
    chart.draw(data, options);
  }
}

displayForecast();
