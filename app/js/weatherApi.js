export class Weather {
    constructor(){
        this.base = 'https://api.openweathermap.org/data/2.5/onecall'; 
        this.baseMap = 'https://api.openweathermap.org/geo/1.0/direct';
        this.baseMapReverse = 'https://api.openweathermap.org/geo/1.0/reverse';
        this.apiKey = '188dd8912081f14ec67734616f3c8c82';
        this.cntParams = '7';
        this.langParams = document.querySelector('html').getAttribute('lang');
    }

    async getPosition(pos){
        let url = `${this.baseMap}?q=${pos.weather}&limit=1&appid=${this.apiKey}`;
        
        const response = await fetch(url);
        const weather = await response.json();  
        return weather;
    }
    async getPositionReverse(pos){
        let {latitude, longitude} = pos.coords;        
        let url = `${this.baseMapReverse}?lat=${latitude}&lon=${longitude}&limit=1&appid=${this.apiKey}`;
        
        const response = await fetch(url);
        const weather = await response.json();  
        return weather;
    }

    async getWeatherLatLon(pos) {
        let {latitude, longitude} = pos.coords;
        let units = pos.units;
        let url = `${this.base}?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=${units}&lang=${this.langParams}&appid=${this.apiKey}`;
        
        const response = await fetch(url);
        const weather = await response.json();  
        return weather;
    }   
}

