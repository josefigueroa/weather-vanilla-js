export class Location { 
    constructor(){
        
    }   
    options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    activeLocation(params){
        navigator.geolocation.getCurrentPosition(params)
    }
}


  
  