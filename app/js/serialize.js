export class Serialize {
  constructor(formElement){
    this.element = formElement;
  }

  /**
   * Form Data init
   */
  formData(){
    return new FormData(document.getElementById(this.element));
  }

  /**
   * Serialize data values
   */
  getEntries(){
    let formData = this.formData();
    let obj = {};

    for (let [key, value] of formData.entries()) {        
       obj[key] = value;   
    }

    return obj;
  }

  /**
   * Get data form
   * @param {*} element 
   */
  getData(element){
    let formData = this.formData();
    return formData.get(element);
  }  
}