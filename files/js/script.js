// denver lat and long
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchBar");
var city;
var lon;
var lat;

function checkWeather() {
    var weatherurl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=1c080c27bdccf0e577c9e856b87b1d20';
    fetch(weatherurl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

function getCity(event) {
    event.preventDefault();
    var geo = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInput.value + '&limit=5&appid=1c080c27bdccf0e577c9e856b87b1d20';
    fetch(geo)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            city = data[0].name;
            lon = data[0].lon;
            lat = data[0].lat;
            checkWeather();
        })
}

searchButton.addEventListener('click', getCity);