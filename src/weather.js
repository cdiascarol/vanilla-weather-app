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
let dateObject = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDate = document.querySelector(".date-time");
currentDate.innerHTML = `${
  weekDays[dateObject.getDay()]
} ${dateObject.getHours()}:${dateObject.getMinutes()} `;

let tempUnit = document.querySelectorAll(".temp-main");
tempUnit.forEach((temp) => {
  temp.addEventListener("click", (event) => {
    convertTemperature(".temp-value-1", ".unit-1", event);
    convertTemperature(".temp-value-2", ".unit-2", event);
    convertTemperature(".temp-value-3", ".unit-3", event);
    convertTemperature(".temp-value-4", ".unit-4", event);
  });
});

function showCurrentTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let wind = Math.round(response.data.wind.speed);
  let hum = Math.round(response.data.main.humidity);
  let feels_like = Math.round(response.data.main.feels_like);
  let description = response.data.weather[0].main;

  let cityName = response.data.name;

  let tempElement = document.querySelector(".temp-value-1");
  let highElement = document.querySelector(".temp-value-2");
  let lowElement = document.querySelector(".temp-value-3");
  let windElement = document.querySelector("#wind");
  let humElement = document.querySelector("#hum");
  let feelsElement = document.querySelector(".temp-value-4");
  let descriptionElement = document.querySelector(".weather-mood");
  let cityNameElement = document.querySelector(".city-name");

  console.log(response.data);

  tempElement.innerHTML = temp;
  highElement.innerHTML = high;
  lowElement.innerHTML = low;
  windElement.innerHTML = wind;
  humElement.innerHTML = hum;
  feelsElement.innerHTML = feels_like;
  descriptionElement.innerHTML = description;
  cityNameElement.innerHTML = cityName;
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
// let highTemp = document.querySelector(".high");
// highTemp.addEventListener("click", (event) =>
//   convertTemperature(".temp-value-2", ".unit-2", event)
// );

// let lowTemp = document.querySelector(".low");
// lowTemp.addEventListener("click", convertTemperature("click", ".low"));

// let feelsLikeTemp = document.querySelector(".feels-like");
// feelsLikeTemp.addEventListener(
//   "click",
//   convertTemperature("click", ".feels-like")
// );
// let cityName = prompt("Enter a City");
// cityName = cityName.toLowerCase();

// if (cityName in weather) {
//   //console.log(Math.round(weather[cityName].temp));
//   //temp in ˚C
//   let temp = Math.round(weather[cityName].temp);
//   //temp in ˚F
//   let tempF = Math.round(cToF(temp));
//   //humidity
//   let hum = weather[cityName].humidity;
//   //capitalized city name
//   cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

//   alert(
//     `It is currently ${temp}°C (${tempF}°F) in ${cityName} with a humidity of ${hum}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${cityName}`
//   );
// }
//console.log(city);
