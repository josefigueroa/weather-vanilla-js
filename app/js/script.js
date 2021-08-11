import { Weather } from "./weatherApi.js";
import { UI } from "./UI.js";
import { Clock } from "./clock.js";
import { Serialize } from "./serialize.js";
import { Theme } from "./theme.js";

const ui = new UI();
const weather = new Weather();
const clock = new Clock();
const theme = new Theme();
const serializeFormWeather = new Serialize('formWeather');
const activeLocation = document.querySelector('#locationActive');

const fetchWeatherPosition = async (params) => {
    try {
        let dataPosition = await weather.getPosition(params);    
        let {lat, lon} =  dataPosition[0] || {};    
        let units = serializeFormWeather.getData('units');
        let geo = {};

        geo.coords = {};
        geo.coords.latitude = lat; 
        geo.coords.longitude = lon; 
        geo.units = units;
        
        fetchhWeatherLocation(geo);
    } catch (error) {
        console.warn(error.message);
        return;
    }
    
}

const fetchhWeatherLocation = async (params) => {   
    let units = serializeFormWeather.getData('units');
    params.units = units;

    let dataPosition = await weather.getPositionReverse(params);
    let dataLocation = await weather.getWeatherLatLon(params);
    dataLocation.units = units;

    if(dataLocation.cod != '200' && dataLocation.cod){
        ui.locationError(`${dataLocation.cod} - ${dataLocation.message}`);
    }else{
        ui.getTimeZone(dataPosition);
        ui.getForecast(dataLocation);
        ui.getCurrent(dataLocation);
    }
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
    theme.init();
})