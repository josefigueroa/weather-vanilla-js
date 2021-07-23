export class Weather {
    constructor(){
        this.base = 'https://api.openweathermap.org/data/2.5/forecast'; 
        this.apiKey = '188dd8912081f14ec67734616f3c8c82';
    }

    async getWeather(pos) {     
        const url = `${this.base}?q=${pos}&cnt=16&appid=${this.apiKey}`;
        
        const response = await fetch(url);
        const weather = await response.json();  
        return weather;
    }

    async getWeatherLatLon(pos) {     
        const {latitude, longitude} = pos.coords;
        const url = `${this.base}?lat=${latitude}&lon=${longitude}&cnt=16&appid=${this.apiKey}`;
        
        const response = await fetch(url);
        const weather = await response.json();  
        return weather;
    }

    

}

