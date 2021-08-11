export class UI {
  constructor(){
    this.elementError = document.querySelector('#locationError');
    this.elementTimeZone = document.querySelector('#timeZone');
    this.elementNameZone = document.querySelector('.timezone__name-zone');
    this.elementCoords = document.querySelector('.timezone__coords');
    this.elementForecastWraper = document.querySelector('.forecast__wrapper');
    this.elementCurrent = document.querySelector('#currentWeather');
    this.lang = document.querySelector('html').getAttribute('lang');
  }

  resetLayout(){
    this.elementForecastWraper.style.display = 'none';
    document.querySelector('.timezone').innerHTML= '';
    this.elementCurrent.innerHTML = '';
    
  }

  /**
   * Display error when location is disabled
   * @param {*} error 
   */
  locationError(error) {
    let htmlTemplate = `
      <figure class="location__not-found" data-error="${error}">
        <img src="app/resources/img/loation_not_found.svg" class="" alt="Image of a man looking with a magnifying glass for a location">
      </figure>`;

      document.querySelector('.forecast').style.display = 'none';    
      this.elementTimeZone.innerHTML= '';
      this.elementCurrent.innerHTML = '';

    this.elementError.innerHTML = htmlTemplate;
  }

  /**
   * Display timezone
   * @param {*} data 
   */

  getTimeZone(data){
    let {country, name, lat, lon} = data[0] || [];
    let nameZone = `${name}, ${country}`;
    let coords = `${lat} LAT, ${lon} LON`;
    let htmlTemplate = `
      <div class="timezone">
        <p class="timezone__name-zone">${nameZone}</p>
        <p class="timezone__coords">${coords}</p>
      </div>`

    this.elementError.innerHTML = ''


    this.elementTimeZone.style.display = 'none';
    this.elementTimeZone.innerHTML = htmlTemplate;
    setTimeout(() => { 
      this.elementTimeZone.style.display = 'block';
    }, 200);
  }

  /**
   * Display current weather
   * @param {*} data 
   */

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

      this.elementError.innerHTML = ''
 
      document.querySelector('#currentWeather').style.display = 'none';
      this.elementCurrent.innerHTML = htmlTemplate;
      setTimeout(() => { 
        document.querySelector('#currentWeather').style.display = 'block';
      }, 200);
  }

  /**
   * Display current forecasst
   * @param {*} data 
  */
  getForecast(data){
    let time = this.getTime();
    let lang = this.lang;
    let day;
    let htmlTemplate = '';
    let unitsFormatted = (data.units == 'metric') ? 'C' : 'F';

    data.daily.forEach((element, key ) => {     
      if(key < data.daily.length){
        day = (time.dayWeek[lang][(time.day + key)%7]);
      }
      
      htmlTemplate +=  `
          <div class="card">
          <div class="card__body">
            <div class="card__title">
              ${day}
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

    this.elementError.innerHTML = ''
    document.querySelector('.forecast').style.display = 'none';    
    this.elementForecastWraper.innerHTML = htmlTemplate;
    setTimeout(() => { 
      document.querySelector('.forecast').style.display = 'block';
     }, 200)
  }

  /**
   * Time init
   */
  getTime(){
    let date = new Date();

    return {
      dayWeek: {
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      },
      year: date.getFullYear(),
      month: date.getMonth(),
      monthLocale: date.toLocaleString('default', { month: 'long' }),
      day: date.getDay(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      isAm: date.getHours() < 12
    }
  }
 
}