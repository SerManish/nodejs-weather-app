const request = require('request');

const getWeather = (address,callback) => {
   url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(address) + "&units=metric&APPID=0990db90932e48ca5cfe19e4ced2c2d1"; 
   request({url,json:true}, (error,{body}) =>
   {
       if(error)
           callback("Unable to connect to openweathermap",undefined);
       else if(body.main)
           callback(undefined,"Temperature of " + address + " is " + body.main.temp + "°C with " + body.weather[0].description);
       else
           callback("Location not found",undefined);
    })
}

module.exports = getWeather;


