export default class Storage {
  constructor(storageId) {
    this.storageId = storageId; // use this.storageId with localStorage as a unique key to store data

    this.data = this.getDataFromStorage();
  }

  getDataFromStorage() {
    const storedData = localStorage.getItem(this.storageId);
    const parsedData = storedData ? JSON.parse(storedData) : [];
    return parsedData;
  }

  // save Data To Storage Method

  saveDataToStorage(data){
    localStorage.setItem(this.storageId, JSON.stringify(data));
    }

  //add new Data Items in local-storage

  addData(formDataObject){
    this.data.push(formDataObject);
    this.saveDataToStorage(this.data);
  }

// Edit Existing Data for Edit Function 

  editData(id ,updatedData){
    const dataIndex = this.data.findIndex(item => item.id === id);

   if(dataIndex !== -1){
    this.data[dataIndex] = { ...this.data[dataIndex], ...updatedData };
    this.saveData();
    }
  }

  deleteData(id){
    this.data = this.data.filter(item => item.id !== id);
    this.saveData();
  }

  getAllData(){
    return this.data;
  }

}

