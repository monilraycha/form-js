// When user bind any event like click, onChange, onblur all callback will have [e, obj, array, dataObjArray] arguments.
const formData = [
  {
    type: 'hidden',
    key: 'userId',
    label: 'User Id',
    unique: true,
    getValue: function (obj) {
      // when user will use type hidden in formData object at that time we don't have to add any input element in form but we should notify or give error to user in console if user has not mentioned getValue function.
      // getValue function will only have current form data in form of object key value pair.
      // first condition is to check if userId is present then use it because we only want to set userId for new records
      return obj.userId || Math.floor(100000 + Math.random() * 900000);
    },
  },
  {
    type: 'hidden',
    key: 'createdAt',
    label: 'Created At',
    getValue: function (obj) {
      // first condition is to check if createdAt is present then use it as we only want to set createdAt while creating new records
      return obj.createdAt || new Date().getTime();
    },
  },
  {
    type: 'text',
    label: 'Name',
    key: 'txtName1',
    value: '',
    // attr is option, User can add new html element properties to it or user can remove all properties like empty object  attr: {}
    attr: {
      id: 'txtName1',
      className: 'form-control textInput',
      placeholder: 'Enter name',
      name: 'txtName',
      required: true,
      onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'email',
    label: 'Email ',
    key: 'email',
    value: '',
    attr: {
      id: 'email',
      className: 'form-control textInput',
      placeholder: 'Enter email',
      name: 'txtName',
      required: true,
      onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'tel',
    label: 'Phone',
    key: 'phoneNumber',
    value: '',
    attr: {
      id: 'phoneNumber',
      placeholder:'Enter Phone Number'
    },
  },
  {
    type: 'textarea',
    label: 'Address',
    key: 'txtAddress',
    value: '',
    attr: {
      id: 'txtAddress',
      className: 'form-control textInput',
      placeholder: 'Enter Address',
      rows: '5',
      name: 'txtName',
      col: '30',
      required: true, //Add validation for required field
      onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'text',
    label: 'Street Address',
    key: 'txtStreet',
    value: '',
    attr: {
      id: 'txtStreet',
      className: 'form-control textInput',
      placeholder: 'Enter Street Address',
      name: 'txtName',
      required: true,
      onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'text',
    label: 'City',
    key: 'txtCity',
    value: '',
    attr: {
      id: 'txtCity',
      className: 'form-control textInput',
      placeholder: 'Enter City',
      name: 'txtName',
      required: true,
      onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'text',
    label: 'State',
    key: 'txtState',
    value: '',
    attr: {
      id: 'txtState',
      className: 'form-control textInput',
      placeholder: 'Enter State',
      name: 'txtName',
      required: true,
      onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'number',
    label: 'Pin Code',
    key: 'txtPin-code',
    value: '',
    attr: {
      id: 'txtPin-code',
      className: 'form-control textInput',
      placeholder: 'Enter Pin Code',
      name: 'txtName',
      required: true,
      onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
    },
  },
  {
    type: 'select',
    label: 'Country',
    key: 'txtCountry',
    value: [],
    attr: {
      id: 'txtCountry',
      name: 'country',
      required: true,
      className: 'form-control columns',
      onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
    },
    options: [
      {
        label: 'Select Country',
        value: '',
      },
      {
        label: 'India',
        value: 'india',
      },
      {
        label: 'United States',
        value: 'united-states',
      },
      {
        label: 'Sri Lanka',
        value: 'sri-lanka',
      },
    ],
  },
  {
    type: 'radio',
    label: 'Gender',
    key: 'gender',
    value: '',
    options: [
      {
        innerText: 'Male',
        value: 'male',
        name: 'gender',
        attr: {
          id: 'male',
          className: 'form-check-input radioGender',
          required: true,
          onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
        },
      },
      {
        innerText: 'Female',
        value: 'female',
        name: 'gender',
        attr: {
          id: 'female',
          className: 'form-check-input radioGender',
          required: true,
          onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
        },
      },
    ],
  },
  {
    type: 'checkbox',
    label: 'Hobbies',
    key: 'hobbies',
    value: [],
    options: [
      {
        innerText: 'Swimming',
        value: 'swimming',
        name: 'hobbies',
        attr: {
          id: 'swimming',
          className: 'form-check-input radioHobbies',
          onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
        },
      },
      {
        innerText: 'Singing',
        value: 'singing',
        name: 'hobbies',
        attr: {
          id: 'singing',
          className: 'form-check-input radioHobbies',
          onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
        },
      },
      {
        innerText: 'Writing',
        value: 'writing',
        name: 'hobbies',
        attr: {
          id: 'writing',
          className: 'form-check-input radioHobbies',
          onchange: function () {}, // e, obj, array, dataObjArray you will get in function argument
        },
      },
    ],
  },
  {
    type: 'submit',
    attr: {
      id: 'btnSubmit',
      name: 'btnSubmit',
      className: 'btn btn-block btn-primary submit',
      value: 'Submit',
      text :  'Submit',
      onclick: function () {
        // e, obj, array, dataObjArray you will get in function argument
        // e:  its button native event
        // obj: current form data in object form
        // array: formData array
        // dataObjArray: localstorage all data from storage.js
      },
    },
  },
  {
    type: 'reset',
    attr: {
      id: 'btnReset',
      name: 'btnReset',
      className: 'btn btn-block btn-primary reset',
      value: 'Reset',
      text :  'Reset',
      onclick: function () {}, // e, obj, array, dataObjArray you will get in function argument
    },
  },
];
export default formData;
