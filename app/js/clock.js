export class Clock {
  constructor(){
    this.timeElement= document.querySelector('#time');
    this.amPmElement= document.querySelector('.date__abbr-hour');
    this.yearElement= document.querySelector('#dateFullYear');
  }

  /**
   * Display clock
   */
  getStart(){
    this.updateTime();
    setInterval(() =>{
      this.updateTime();
    }, 1000);
    this.getYear();
  }

  /**
   * Display date
   */
  getYear(){
    let obj = this.getTime();
    let dayFormatted = obj.day.toString().padStart(2, "0");
    let monthLocale = obj.monthLocale;
    let monthFormatted = obj.month.toString().padStart(2, "0");
    let dataTimeFormatted = `${monthFormatted}-${dayFormatted}-${obj.year}`;
    let yearMontFormatted = `${monthLocale} ${obj.year}`;

    this.yearElement.textContent = yearMontFormatted;
    this.yearElement.setAttribute('datetime',dataTimeFormatted);
  }

  /**
   * Formatted clock
   */
  updateTime(){
    let obj = this.getTime();
    let minuteFormatted = obj.minute.toString().padStart(2, "0");
    let timeFormateed = `${obj.hour}:${minuteFormatted}`;
    let amPm = obj.isAm ? 'AM' : 'PM';
    let amPmFormatted = obj.isAm ? 'ante meridiem' : 'post meridiem';

    this.timeElement.textContent = timeFormateed;
    this.timeElement.setAttribute('datetime',timeFormateed);
    this.amPmElement.textContent = amPm;
    this.amPmElement.setAttribute('title',amPmFormatted);
  }

  /**
   * Time init
   */
  getTime(){
    let date = new Date();

    return {
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