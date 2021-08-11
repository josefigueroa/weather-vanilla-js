export class Theme {
  constructor(){
    this.storage = localStorage.getItem('theme');
  }

  init(){
    let getTheme = this.storage;
    if(getTheme){
        document.body.setAttribute('theme', getTheme);
        document.querySelector(`input[value="${getTheme}"]`).checked = true;    
    }

    this.saveTheme();
  }

  saveTheme(){
    let toggleSwitch = document.querySelectorAll('input[name="theme"]');
    toggleSwitch.forEach((input) => {   
        input.addEventListener('change', (event) =>{
            document.body.setAttribute('theme', event.target.value);
            localStorage.setItem('theme', event.target.value);
        });       
    });
  }
}