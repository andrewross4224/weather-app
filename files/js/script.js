console.log('hello world')
// denver lat and long
var weatherurl = 'https://api.openweathermap.org/data/2.5/forecast?lat=39.7392&lon=104.9903&appid=1c080c27bdccf0e577c9e856b87b1d20'

fetch(weatherurl)
.then(function(response){
    console.log(response)
    return response.json();
})
.then(function(data){
    console.log(data)
})