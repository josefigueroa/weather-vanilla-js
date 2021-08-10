import { Weather } from "./weatherApi.js";
import { UI } from "./UI.js";
import { Clock } from "./clock.js";
import { Serialize } from "./serialize.js";

const ui = new UI();
const weather = new Weather();
const clock = new Clock();
const serializeFormWeather = new Serialize('formWeather');
const activeLocation = document.querySelector('#locationActive');

const fetchWeatherPosition = async (params) => {
    let dataPosition = await weather.getPosition(params);    
    let {lat, lon} =  dataPosition[0] || {};    
    let units = serializeFormWeather.getData('units');
    let geo = {};

    geo.coords = {};
    geo.coords.latitude = lat; 
    geo.coords.longitude = lon; 
    geo.units = units;
     
    fetchhWeatherLocation(geo);
}

const fetchhWeatherLocation = async (params) => {
    let units = serializeFormWeather.getData('units');
    params.units = units;
    
    let dataPosition = await weather.getPositionReverse(params);
    let dataLocation = await weather.getWeatherLatLon(params);
    
    dataLocation.units = units;

    ui.getTimeZone(dataPosition);
    ui.getForecast(dataLocation);
    ui.getCurrent(dataLocation);
}


const errorLocation = (params) =>{
    console.warn('ERROR(' + params.code + '): ' + params.message);
    ui.locationError(params.message);
}

activeLocation.addEventListener('click', function () { 
    navigator.geolocation.getCurrentPosition(fetchhWeatherLocation, errorLocation);
});

document.addEventListener("submit", (e) => {
    e.preventDefault();
    let objForm = serializeFormWeather.getEntries(); 
    fetchWeatherPosition(objForm);
});

window.addEventListener('DOMContentLoaded', () => {     
    clock.getStart();    
})