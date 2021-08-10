export class UI {
  constructor(){
    this.elementError = document.querySelector('#locationError');
    this.elementNameZone = document.querySelector('.timezone__name-zone');
    this.elementCoords = document.querySelector('.timezone__coords');
    this.elementForecast = document.querySelector('.forecast__wrapper');
    this.elementCurrent = document.querySelector('#currentWeather');
  }

  locationError(error) {
    let htmlTemplate = `
      <figure class="location__not-found" data-error="${error}">
        <img src="app/resources/img/loation_not_found.svg" class="" alt="Image of a man looking with a magnifying glass for a location">
      </figure>`;

    this.elementError.innerHTML = htmlTemplate;
  }

  getTimeZone(data){
    let {country, name, lat, lon} = data[0] || [];
    let nameZone = `${name}, ${country}`;
    let coords = `${lat} LAT, ${lon} LON`;

    document.querySelector('.timezone').style.display = 'none';
    this.elementNameZone.textContent = nameZone || 'City not found';
    this.elementCoords.textContent = coords || 'Coords not found';
    setTimeout(() => { 
      document.querySelector('.timezone').style.display = 'block';
    }, 200);
  }

  getCurrent(data){
    
    let unitsFormatted = (data.units == 'metric') ? 'C' : 'F';
    let {sender_name, event, description } = (typeof data.alerts !== 'undefined' && data.alerts) ? data.alerts[0] : false;
    let {icon, main} = data.current.weather[0];

    let htmlTemplate =  `
        <div class="current">          
          <div class="current__item">
            <div class="current__wrapper">
              <figure class="current__img">
              <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather ${main} icon">
              </figure>
              <div class="current__temp">${data.current.temp} ${unitsFormatted}</div>
            </div>
            <p class="current__timezone">${data.timezone}</p>
            <p class="current__sensation">
            ${data.current.feels_like} ${unitsFormatted}. ${data.current.weather[0].description}      
            </p>            
          </div>
          ${typeof data.alerts !== 'undefined' ? `
              <div class="current__item">           
                <div class="current__alerts">
                  <p class="current__sender-name">${sender_name}</p>
                  <p class="current__event">${event}</p>
                  <p class="current__description">${description}</p>
                </div>
              </div>
            </div>`
          : '' }
      `;
      document.querySelector('#currentWeather').style.display = 'none';
      this.elementCurrent.innerHTML = htmlTemplate;
      setTimeout(() => { 
        document.querySelector('#currentWeather').style.display = 'block';
      }, 200);
  }

  getForecast(data){
    let htmlTemplate = '';
    let unitsFormatted = (data.units == 'metric') ? 'C' : 'F';
    data.daily.forEach(element => {
      htmlTemplate +=  `
          <div class="card">
          <div class="card__body">
            <div class="card__title">
              TUE
            </div>
            <figure class="card__img">
              <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="weather ${element.weather[0].main} icon">
            </figure>
            <div class="card__legend">
              <span class="card__temp">Night - ${element.temp.night} ${unitsFormatted}</span>
              <span class="card__temp">Day -${element.temp.day} ${unitsFormatted}</span>
            </div>
          </div>
        </div>
        `;
    });

    document.querySelector('.forecast').style.display = 'none';    
    this.elementForecast.innerHTML = htmlTemplate;

    setTimeout(() => { 
      document.querySelector('.forecast').style.display = 'block';
     }, 200)
  }
 
}