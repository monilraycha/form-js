// formData is accessible here as we have global variable in formData.js
import formData from './data/formData.js';
import Form from './lib/form.js';
import Storage from './lib/storage.js';
import Table from './lib/table.js';

class Main {
  constructor(formContainerId, storageId, tableContainerId) {
    // form js class to create form and access its methods
    
    const storageInstance = new Storage(storageId); // storage class to access storage methods
    const tableInstance = new Table(tableContainerId ,formData.map(field => field.label) , storageInstance); 
    const formInstance = new Form(formContainerId, formData , tableInstance , storageInstance);

    const storedData = storageInstance.getDataFromStorage();
  
    tableInstance.setData(storedData);

    const editButton = document.getElementById('editButton');
    if (editButton) {
      editButton.addEventListener('click', (event) => {
        formInstance.handleEdit(event);
      });
    }

        // Handle the update button click event
        const updateButton = document.getElementById('updateButton');
        if (updateButton) {
          updateButton.addEventListener('click', (event) => {
            formInstance.handleUpdate(event);
          });
        }

        // Handle the cancel button click event
        const cancelButton = document.getElementById('cancelButton'); // Replace 'cancelButton' with the actual ID of your cancel button
        if (cancelButton) {
          cancelButton.addEventListener('click', (event) => {
            formInstance.handleCancel(event);
          });
        }
  

        tableInstance.refreshTable();

    console.log(formData, formInstance,formInstance, storageInstance, tableInstance, 'Printed all instance of the class to remove eslint error');
  }
}

window.onload = function(){
const main = new Main('formContainerId', 'storageId', 'tableContainerId');

}
