import { Weather } from "./weatherApi.js";
import { Location } from "./location.js";

const location = new Location()
const weather = new Weather();

const fetchhWeather = async (params) => {
    const data = await weather.getWeather(params);
    console.log(data);
}

const fetchhWeatherLocation = async (params) => {
    const data = await weather.getWeatherLatLon(params);
    console.log(data);
}


document.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let weatherValue = formData.get('weather');
    
    fetchhWeather(weatherValue);
});

window.addEventListener('DOMContentLoaded', () => {      
    if (!navigator.geolocation){
        navigator.geolocation.getCurrentPosition(fetchhWeatherLocation, location.error, location.options);
    }  else{
        console.log('ñadfjañ');
    }  
})