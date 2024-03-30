export default class Table {
  constructor(tableContainerId , columns , storageInstance) {

    this.tableContainerId = tableContainerId;
    this.container = document.getElementById(this.tableContainerId); // Use this container to create table inside of it
    // Pass tableContainerId to append table inside of HTML DIV element
    this.columns = columns || [];
    this.storageInstance = storageInstance;
    this.data = [];
    this.createTable();
  }
  
  setFormData(tableInstance) {
    this.tableInstance = tableInstance;
  }

  createTable(){  
    
    const excludedValues = ['Submit', 'Reset'];
    // Remove excluded values using splice
    for (let i = this.columns.length - 1; i >= 0; i--) {
      if (excludedValues.includes(this.columns[i]) || this.columns[i] === undefined) {
        this.columns.splice(i, 1);
      }
    }

    const tableContainer = document.getElementById(this.tableContainerId);
    const table = document.createElement("table");
    const thead = document.createElement( "thead" );
    const headerRow = document.createElement( "tr" );
    

    this.columns.forEach(column => {
      const th = document.createElement( "th" );
      th.textContent = column;
      headerRow.appendChild(th);

    });

    const actionsTh = document.createElement("th") ;
    actionsTh.textContent = 'Actions';
    headerRow.appendChild(actionsTh);


    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table Body

    const tBody = document.createElement( "tbody" ) ;
    this.data.forEach( rowData =>   {
      const row = this.createDataRow(rowData , this.columns); 
      tBody.appendChild(row);

    });

    table.appendChild(tBody);
    tableContainer.appendChild(table);

  }

// Method for Creating Table Row for each column

createDataRow(rowData){

  const row = document.createElement('tr');

    Object.keys(rowData).forEach((key) => {
      const cell = document.createElement('td');
      cell.textContent = rowData[key];
      row.appendChild(cell);
    });

    // Actions Buttons 
const actionsTd = document.createElement('td');

const editButton =  document.createElement('button');
editButton.textContent = 'Update';


editButton.addEventListener( 'click', (event) => {

  let rowIndex = Array.from(event.target.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode);

  this.editRow(rowIndex);
  
});
actionsTd.appendChild(editButton);

const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';

deleteButton.addEventListener( 'click', (event) => {
  let rowIndex = Array.from(event.target.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode);
 
  this.deleteRow(rowIndex);

});
actionsTd.appendChild(deleteButton);

row.appendChild(actionsTd);

return row;

}

addRow(rowData){

  this.data.push(rowData);
  
  this.saveDataToStorage(); // add change

  const tBody = document.querySelector(`#${this.tableContainerId} tbody`);
  const index = this.data.length + 1 ;
  const newRow = this.createDataRow(rowData , index  ,this.columns);

  tBody.appendChild(newRow);

  this.refreshTable();
}

editRow(rowIndex){

  const rowData = this.data[rowIndex];

  if (this.tableInstance && rowData) {

    this.tableInstance.setFormData(rowData); 

    // Add update and cancel buttons to handle the editing process
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => { 
      this.updateRow(rowIndex);
    
    });

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => this.cancelEdit());
    
  const editButtonsContainer = document.getElementById('editButtons');  
  editButtonsContainer.innerHTML = '';
  editButtonsContainer.appendChild(updateButton);
  editButtonsContainer.appendChild(cancelButton);
  
}
}

updateRow(rowIndex) {
  const updatedData = this.tableInstance.getFormData();
  
  if (rowIndex !== -1) {
    // Iterate over form elements and update data
    Object.keys(updatedData).forEach((key) => {
      if (key !== 'userId' && key !== 'createdAt') {
        const formElement = this.tableInstance.form.elements[key];
        if (formElement) {

          if (formElement.type === 'checkbox' || formElement.type === 'radio') {
            this.data[rowIndex][key] = formElement.checked;
         }
         else {
            this.data[rowIndex][key] = updatedData[key];
          }
        } 
      } else {
        console.error(`Invalid key: ${key}`);
      } 
    });

    this.saveDataToStorage();
    this.refreshTable();
  }
  
  this.tableInstance.finishEdit();
  const editButtonsContainer = document.getElementById('editButtons');
  editButtonsContainer.innerHTML = '';
}

cancelEdit() {
  this.tableInstance.finishEdit();

  // Hide the update and cancel buttons
  const editButtonsContainer = document.getElementById('editButtons');
  editButtonsContainer.innerHTML = '';
}

deleteRow(rowIndex) {

    this.data.splice(rowIndex, 1);
    this.saveDataToStorage();
    this.refreshTable();
 
}

setData(data){
  this.data = data;
  this.refreshTable();
}

 saveDataToStorage() {
    this.storageInstance.saveDataToStorage(this.data);
  }

refreshTable() {
  const tBody = document.querySelector(`#${this.tableContainerId} tbody`);
  tBody.innerHTML = '';
  
  this.data.forEach(rowData => {
    const row = this.createDataRow(rowData);
    tBody.appendChild(row);
  });
} 

}











// export default class Table {
//   constructor(tableContainerId , columns) {

//     this.tableContainerId = tableContainerId;
//     this.container = document.getElementById(this.tableContainerId); // Use this container to create table inside of it
//     // Pass tableContainerId to append table inside of HTML DIV element

//     this.columns = columns || [];
//     this.data = this.getDataFromStorage() || [];
//     this.createTable();
//   }
  
//   setFormData(tableInstance) {
//     this.tableInstance = tableInstance;
//   }

//   createTable(){  
    
//     const excludedValues = ['Submit', 'Reset'];
//     // Remove excluded values using splice
//     for (let i = this.columns.length - 1; i >= 0; i--) {
//       if (excludedValues.includes(this.columns[i]) || this.columns[i] === undefined) {
//         this.columns.splice(i, 1);
//       }
//     }

//     const tableContainer = document.getElementById(this.tableContainerId);
//     const table = document.createElement("table");
//     const thead = document.createElement( "thead" );
//     const headerRow = document.createElement( "tr" );
    

//     this.columns.forEach(column => {
//       const th = document.createElement( "th" );
//       th.textContent = column;
//       headerRow.appendChild(th);

//     });

//     const actionsTh = document.createElement("th") ;
//     actionsTh.textContent = 'Actions';
//     headerRow.appendChild(actionsTh);


//     thead.appendChild(headerRow);
//     table.appendChild(thead);

//     // Table Body

//     const tBody = document.createElement( "tbody" ) ;
//     this.data.forEach( rowData =>   {
//       const row = this.createDataRow(rowData , this.columns); 
//       tBody.appendChild(row);

//     });

//     table.appendChild(tBody);
//     tableContainer.appendChild(table);

//   }

// // Method for Creating Table Row for each column

// createDataRow(rowData){

//   const row = document.createElement('tr');

//     Object.keys(rowData).forEach((key) => {
//       const cell = document.createElement('td');
//       cell.textContent = rowData[key];
//       row.appendChild(cell);
//     });

//     // Actions Buttons 
// const actionsTd = document.createElement('td');

// const editButton =  document.createElement('button');
// editButton.textContent = 'Update';


// editButton.addEventListener( 'click', (event) => {

//   let rowIndex = Array.from(event.target.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode);

//   this.editRow(rowIndex);
  
// });
// actionsTd.appendChild(editButton);

// const deleteButton = document.createElement('button');
// deleteButton.textContent = 'Delete';

// deleteButton.addEventListener( 'click', (event) => {
//   let rowIndex = Array.from(event.target.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode);
 
//   this.deleteRow(rowIndex);

// });
// actionsTd.appendChild(deleteButton);

// row.appendChild(actionsTd);

// return row;

// }

// addRow(rowData){

//   this.data.push(rowData);
  
//   this.saveDataToStorage(); // add change

//   const tBody = document.querySelector(`#${this.tableContainerId} tbody`);
//   const index = this.data.length + 1 ;
//   const newRow = this.createDataRow(rowData , index  ,this.columns);

//   tBody.appendChild(newRow);

//   this.refreshTable();
// }

// editRow(rowIndex){

//   const rowData = this.data[rowIndex];

//   if (this.tableInstance && rowData) {

//     this.tableInstance.setFormData(rowData); 

//     // Add update and cancel buttons to handle the editing process
//     const updateButton = document.createElement('button');
//     updateButton.textContent = 'Update';
//     updateButton.addEventListener('click', () => { 
//       this.updateRow(rowIndex);
    
//     });

//     const cancelButton = document.createElement('button');
//     cancelButton.textContent = 'Cancel';
//     cancelButton.addEventListener('click', () => this.cancelEdit());
    
//   const editButtonsContainer = document.getElementById('editButtons');  
//   editButtonsContainer.innerHTML = '';
//   editButtonsContainer.appendChild(updateButton);
//   editButtonsContainer.appendChild(cancelButton);
  
// }
// }

// updateRow(rowIndex) {
//   const updatedData = this.tableInstance.getFormData();
  
//   if (rowIndex !== -1) {
//     // Iterate over form elements and update data
//     Object.keys(updatedData).forEach((key) => {
//       if (key !== 'userId' && key !== 'createdAt') {
//         const formElement = this.tableInstance.form.elements[key];
//         if (formElement) {

//           if (formElement.type === 'checkbox' || formElement.type === 'radio') {
//             this.data[rowIndex][key] = formElement.checked;
//          }
//          else {
//             this.data[rowIndex][key] = updatedData[key];
//           }
//         } 
//       } else {
//         console.error(`Invalid key: ${key}`);
//       } 
//     });

//     this.saveDataToStorage();
//     this.refreshTable();
//   }
  
//   this.tableInstance.finishEdit();
//   const editButtonsContainer = document.getElementById('editButtons');
//   editButtonsContainer.innerHTML = '';
// }

// cancelEdit() {
//   this.tableInstance.finishEdit();

//   // Hide the update and cancel buttons
//   const editButtonsContainer = document.getElementById('editButtons');
//   editButtonsContainer.innerHTML = '';
// }

// deleteRow(rowIndex) {

//     this.data.splice(rowIndex, 1);
//     this.saveDataToStorage();
//     this.refreshTable();
 
// }

// getDataFromStorage(){
//   const storedData = localStorage.getItem('storageId');
//   const parsedData = storedData ? JSON.parse(storedData): [];
//     return parsedData;
  
// }

// saveDataToStorage() {
//   localStorage.setItem('storageId', JSON.stringify(this.data), () =>{
//     this.refreshTable();
//   });
// }

// refreshTable() {
//   const tBody = document.querySelector(`#${this.tableContainerId} tbody`);
//   tBody.innerHTML = '';
  
//   this.data.forEach(rowData => {
//     const row = this.createDataRow(rowData , this.columns);
//     tBody.appendChild(row);
//   });
// } 

// }
