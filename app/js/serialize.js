export class Serialize {
  constructor(formElement){
    this.element = formElement;
  }

  formData(){
    return new FormData(document.getElementById(this.element));
  }

  getEntries(){
    let formData = this.formData();
    let obj = {};

    for (let [key, value] of formData.entries()) {        
       obj[key] = value;   
    }

    return obj;
  }

  getData(element){
    let formData = this.formData();
    return formData.get(element);
  }  
}