const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const searchInput = document.querySelector('.search-box input');
import { API_KEY } from './config.js';


function fetchWeather() {
   

     const APIKey= API_KEY;
    const city = searchInput.value;
    if (city === '') {
        return;
    }

    fetch("https://api.openweathermap.org/data/2.5/weather?q="
        + city + "&units=metric&appid=" + APIKey)
        .then(response => response.json())
        .then(json => {

            searchInput.value = "";
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                document.querySelector('.not-found-location').innerHTML = city;
                return;
            }
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const searchedCity = document.querySelector('.weather-box .box .info-weather h1');
            const weatherIcon = json.weather[0].icon;

            image.src = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            searchedCity.innerText = city;
        });
}

// Add click event for the search button
search.addEventListener('click', fetchWeather);

// Add keydown event for the Enter key
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});
