
export default class Form {
  constructor(formContainerId,formData,dataAppend,processData) {


    this.container = document.getElementById(formContainerId); 
    // Pass formContainerId to append form element inside of HTML DIV element
    // use formData to create form
    this.formData  = formData;
    this.form = document.getElementById('employeeForm');
    this.dataAppend = dataAppend;
    this.processData = processData;
    this.form.addEventListener('submit' , this.handleSubmit.bind(this));
    this.renderForm();

  }

  createFormElement(field){
    const {type,label,key,value,attr} = field;

    switch(type){
    case 'text' :
    case 'email':
    case 'tel':
    case 'number':
         return this.createInput(type, label, key, value, attr);

    case 'textarea':
      return this.createTextarea(label, key, value, attr);

    case 'select':
      return this.createSelect(label, key, value , attr , field.options);

    case 'radio':
    case 'checkbox':
      return this.createCheckboxRadio(type, label, key, value, field.options);

    case 'submit':
    case 'reset':
      return this.createButton(type , attr);


     default:
      return document.createElement('div');

    }

  }

  createInput(type, label, key, value, attr){
    const input = document.createElement( 'input');
    input.type = type;
    input.id = attr.id || key; // add key if needs
    input.name = key;
    input.value = value;
    input.placeholder  = attr.placeholder || '';
    input.className = attr.className || '';
    input.required = attr.required || false;
    input.addEventListener('change', attr.onchange);

    if (type === 'text') {
      // Handle special cases for gender and hobbies
      if (key === 'gender' || key === 'hobbies') {
        input.type = 'hidden';
      } else {
        input.type = 'text';
      }
    } else {
      input.type = type;
    }
  
    return this.createFormGroup(label , input) ;

  }

  createTextarea(label,key,value,attr){
   const textArea = document.createElement('textarea');
   textArea.id =  attr.id || key;
   textArea.name =  key;  // add '' instead of key
   textArea.value =  value || '';
   textArea.placeholder =  attr.placeholder || '';
   textArea.rows =  attr.rows || '5' ;
   textArea.cols = attr.cols || '30';
   textArea.className =  attr.className || '';
   textArea.required =  attr.required || false;
   textArea.addEventListener('change' ,attr.onchange);
   return this.createFormGroup( label , textArea );

  }

  createSelect( label, key, value, attr ,options ){
    const select = document.createElement('select') ;
    select.id = attr.id || key;
    select.name = key;
    select.className = attr.className || '';
    select.required = attr.required || false;
    select.addEventListener('change', attr.onchange);

    if(Array.isArray(options)){
    options.forEach((option =>{
      const optionElement = document.createElement('option');
      optionElement.textContent = option.label;
      optionElement.value = option.value;
      select.appendChild(optionElement);

    }));

  }

    return this.createFormGroup( label , select ) ;

  }

  createCheckboxRadio(type, label, key, value, options){
    const container = document.createElement('div');
 
    options.forEach((option) =>{
      const input = document.createElement('input');
      input.type = type;
      input.id = option.attr.id || `${key}_${option.value}`; // for assign value
      input.name = key ;
      input.value = option.value || '';
      input.className = option.attr.className || '';
      input.required = option.attr.required || false;
      input.addEventListener('change' , option.attr.onchange);

      const  labelElement = document.createElement('label');
      labelElement.innerText = option.innerText;
      labelElement.htmlFor = input.id; // key

      container.appendChild(input);
      container.appendChild(labelElement);

    });

    return this.createFormGroup(label , container);
  }

  createButton(type,attr){
    const button = document.createElement('button');

    button.type =  type;
    button.id = attr.id || '';
    button.name = attr.name || '';
    button.className = attr.className || '';
    button.value = attr.value || '' ;
    button.textContent = attr.text || '';
    button.addEventListener('click' , attr.onclick);

    return button;

  }

  createFormGroup(label,inputElement){
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';

    const labelElement = document.createElement('label');
    labelElement.innerText = label;

    formGroup.appendChild(labelElement);
    formGroup.appendChild(inputElement);

    return formGroup;

  }

// render form

renderForm(){
  this.formData.forEach((field) => {
    const {key} = field;
    const formElement = this.createFormElement(field);

    this.form.appendChild(formElement);
  });
  this.container.appendChild(this.form);
  }

  setFormData(data) {
    this.formData.forEach((field) => {
      const { key, type } = field;
      const formElement = this.getFormElement(key, type);
  
      if (type === 'checkbox' || type === 'radio') {
        // For checkbox and radio, check the corresponding elements based on the data
        const valuesToCheck = Array.isArray(data[key]) ? data[key] : [data[key]];
        valuesToCheck.forEach((value) => {
          const elementToCheck = formElement.form.querySelector(`[value="${value}"]`);
          if (elementToCheck) {
            elementToCheck.checked = true;
          }
        });
      } else {
        // For other input types value will set directly
        formElement.value = data[key];
      }
    });
  }
  

  getFormData() {
    const formData = {};
    this.formData.forEach((field) => {
      const { key, type } = field;
      const formElement = this.getFormElement(key, type);
  
      switch (type) {
        case 'text':
        case 'email':
        case 'tel':
        case 'number':
        case 'textarea':
        case 'select':
          formData[key] = formElement.value;
          break;

          case 'radio':
          formData[key] = this.getCheckedRadioValue(key);
          break;
        case 'checkbox':
        formData[key] = this.getCheckedCheckboxesValues(key);
          break;

      }
    });
  
    return formData;
  }

  getCheckedRadioValue(key) {
    const checkedRadio = document.querySelector(`[name="${key}"]:checked`);
    return checkedRadio ? checkedRadio.value : null;
  }
  
  getCheckedCheckboxesValues(key) {
    const checkboxes = document.querySelectorAll(`[name="${key}"]:checked`);
    return checkboxes ? Array.from(checkboxes).map((checkbox) => checkbox.value) : [];
  }
  
  getFormElement(key, type ) {

    if (type === 'hidden') {
      // Handle hidden field
      return { value: this.field ? this.field.getValue({}) : '' };
    } else if (type === 'radio' || type === 'checkbox') {
      // Handle radio and checkbox field
      return document.querySelector(`[name="${key}"]`);
    } else {
      // Handle other input types
      const element =  document.getElementById(key);
      return element  || { value: ''};
    }
  }

finishEdit(){
  this.formData.forEach((field) => {
    const { key, type } = field;
    const formElement = this.getFormElement(key, type);

    if (type === 'checkbox' || type === 'radio') {
      // For checkbox and radio, uncheck all options
      formElement.querySelectorAll(':checked').forEach((option) => (option.checked = false));
    } else {
      // For other input types, reset the value to the default
      formElement.value = '';
    }
  });
}

// Event handlers

  handleSubmit(event){
    event.preventDefault();

      // Create an object to store form data
      const formDataObject = {};

      this.formData.forEach((field) => {
        const { key, type } = field;

        let formElement;

        if(type === 'hidden'){
          formElement = { value : field.getValue ({})};
        }
        else if(type === 'radio' || type === 'checkbox'){

         const checkedOptions = document.querySelectorAll(`[name="${key}"]:checked`);
          formDataObject[key] = Array.from(checkedOptions).map((option) => option.value);
        }
        else{
          formElement = document.getElementById(key);
        }

        if(type === 'submit'  || type === 'reset'){
          return ;
        }

        if (formElement) {
          // Check if the form element is found
          // Store form data in the formDataObject based on element type
          if (type !== 'radio' && type !== 'checkbox') {
            formDataObject[key] = formElement.value;
          }
        } else {
          return ;
        }
      });

      // Display the form data in the table and store in local storage

      this.dataAppend.setFormData(this);
      this.dataAppend.addRow(formDataObject);

      this.processData.addData(formDataObject);
      this.dataAppend.refreshTable();

      this.form.reset();

  }

}


