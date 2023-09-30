// search bar and button selectors
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchBar");
// Element selectors for currently viewed city stats
var currentCity = document.getElementById("currentCity");
var currentTemp = document.getElementById("currentTemp");
var currentWind = document.getElementById("currentWind");
var currentHumidity = document.getElementById("currentHumidity");
// selector to input data to charts for 5day
var chartDataTemp = document.getElementsByClassName("dataTemp");
var chartDataWind = document.getElementsByClassName("dataWind");
var chartDataHum = document.getElementsByClassName("dataHum")
// Current time and day
var time = dayjs().format("YYYY-MM-DD HH:mm:ss");
// Start point for 5day data entry
var timeCheck = dayjs().add(1, 'd').format('YYYY-MM-DD 06:00:00')
var index = 0;
// variables to globally save last run lon and lat coord
var currentWeather;
var state;
var city;
var lon;
var lat;
// setting current time to check date and hour against
setInterval(function updateTime() {
    time = dayjs().format("YYYY-MM-DD HH:mm:ss")
}, 1000);
// function to get lon and lat of city based on user input
function getCity(event) {
    event.preventDefault();
    var geo = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInput.value + '&limit=5&appid=1c080c27bdccf0e577c9e856b87b1d20';
    fetch(geo)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            state = data[0].state
            city = data[0].name;
            lon = data[0].lon;
            lat = data[0].lat;
            searchInput.value = ''
            checkWeather();
        })
}
// fetch function to pull weather data based on lat and lon input from getCity
function checkWeather() {
    var weatherurl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=1c080c27bdccf0e577c9e856b87b1d20';
    fetch(weatherurl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentWeather = data;
            renderCurrent();
            renderFiveDay();
        })
}
// Function for rendering data onto page
function renderCurrent() {
    currentCity.textContent = "The current weather in " + city + ", " + state + " is:";
    currentTemp.textContent = "Temp: " + currentWeather.list[0].main.temp + " Deg";
    currentWind.textContent = "Wind: " + currentWeather.list[0].wind.speed + " Mph";
    currentHumidity.textContent = "Humidity: " + currentWeather.list[0].main.humidity + "%";
}

function renderFiveDay() {
    for (i = 0; i < currentWeather.list.length; i++) {
        if (currentWeather.list[i].dt_txt === timeCheck) {
            chartDataTemp[index].textContent = currentWeather.list[i].main.temp + " Deg";
            chartDataWind[index].textContent = currentWeather.list[i].wind.speed + " Mph";
            chartDataHum[index].textContent = currentWeather.list[i].main.humidity + "%"
            index += 1;
            timeCheck = dayjs(timeCheck).add(6, 'h').format('YYYY-MM-DD HH:mm:ss');
            renderFiveDay();
        }
    }
}

// event listener for search button
searchButton.addEventListener('click', getCity);