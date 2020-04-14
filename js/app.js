const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather__container-icon');
const tempElement = document.querySelector('.weather__container-temperaturevalue p');
const descElement = document.querySelector('.weather__container-description p');
const locationElement = document.querySelector('.weather__container-location p');
const KELVIN = 273;
// API KEY
import {key} from './tools.js';

const weather = {};

weather.temperature ={
  unit : 'celsius'
}
// check if geolocation is supported
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition( setPosition, showError);
}else {
  notificationElement.getElementsByClassName.display = 'block';
  notificationElement.innerHTML = '<p>Browser Geolocation nicht freigegeben.</p>';
}
// set users position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}
// show errors with geoloc
function showError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
// get weather data
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;


  fetch(api)
      .then( function(response) {
        let data = response.json();
        return data;

      })
      .then( function(data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
      })
      .then(function() {
        displayWeather();
      });
}
// temperature : {
  //   value : 18;
  //
  // },
  // description : 'few clouds',
  // iconId : '01d',
  // city : 'Bern',
  // country : 'Switzerland'
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9/5) + 32;
}
// display by User click
tempElement.addEventListener('click', function(){
  if (weather.temperature.unit === undefined) return;
  if (weather.temperature.unit === 'celsius') {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
    weather.temperature.unit = 'fahrenheit';
  } else {
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    weather.temperature.unit = 'celsius';
  }
});











