export class Location {    
    options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };
}


  
  