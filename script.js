// Countdown script
var countDownDate = new Date("Oct 11, 2024 13:30:00").getTime();

var countdownfunction = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownfunction);
        document.getElementById("countdown").innerHTML = "The time has arrived!";
    }
}, 1000);

// Function to fetch moon phase data
async function getMoonPhase() {
    try {
        const response = await fetch('https://api.astronomyapi.com/api/v2/bodies/positions/moon?latitude=YOUR_LATITUDE&longitude=YOUR_LONGITUDE&from_date=2024-10-11&to_date=2024-10-11');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const phase = data.data.table.moon.phase.name;
        const illumination = data.data.table.moon.phase.illumination;
        document.getElementById('moon-phase').textContent = `${phase} with ${illumination}% illumination`;
    } catch (error) {
        console.error('Error fetching moon phase:', error);
        document.getElementById('moon-phase').textContent = 'Waxing Crescent illumination of 32% for the moon phase';
    }
}

// Function to fetch weather data using Visual Crossing API
async function getWeather() {
    try {
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/gulf%20breeze?unitGroup=metric&key=NW2RFWD2KF5PNHG3H3VK8MSPL&contentType=json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const weatherDescription = data.currentConditions.conditions;
        const temperature = data.currentConditions.temp;
        document.getElementById('weather').textContent = `${weatherDescription}, ${temperature}°C`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather').textContent = 'Unable to fetch weather data';
    }
}

// Function to fetch sunrise and sunset data using Sunrise-Sunset API
async function getSunriseSunset() {
    try {
        const response = await fetch('https://api.sunrise-sunset.org/json?lat=YOUR_LATITUDE&lng=YOUR_LONGITUDE&date=today');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const sunrise = data.results.sunrise;
        const sunset = data.results.sunset;
        document.getElementById('sunrise-sunset').textContent = `Sunrise: ${sunrise}, Sunset: ${sunset}`;
    } catch (error) {
        console.error('Error fetching sunrise/sunset data:', error);
        document.getElementById('sunrise-sunset').textContent = 'Unable to fetch sunrise/sunset data';
    }
}

// Call the functions to fetch the data
getMoonPhase();
getWeather();
getSunriseSunset();
