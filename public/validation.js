console.log('connected to js file');
// variables
const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm-password');
const form = document.querySelector('#form-style');
let validationfail = 0;

const validation = (e) => {
  console.log('submit the form');
  e.preventDefault();

  if (firstName.value.length > 2) {
    firstName.classList.add('is-valid');
    firstName.classList.remove('is-invalid');
  } else {
    firstName.classList.add('is-invalid');
    firstName.classList.remove('is-valid');
    validationfail++;
  }
  if (lastName.value.length > 2) {
    lastName.classList.add('is-valid');
    lastName.classList.remove('is-invalid');
  } else {
    lastName.classList.add('is-invalid');
    lastName.classList.remove('is-valid');
    validationfail++;
  }
  if (email.value.length > 2) {
    email.classList.add('is-valid');
    email.classList.remove('is-invalid');
  } else {
    email.classList.add('is-invalid');
    email.classList.remove('is-valid');
    validationfail++;
  }
  if (password.value.length > 2) {
    password.classList.add('is-valid');
    password.classList.remove('is-invalid');
  } else {
    password.classList.add('is-invalid');
    password.classList.remove('is-valid');
    validationfail++;
  }
  if (confirm_password.value.length > 2) {
    confirm_password.classList.add('is-valid');
    confirm_password.classList.remove('is-invalid');
  } else {
    confirm_password.classList.add('is-invalid');
    confirm_password.classList.remove('is-valid');
    validationfail++;
  }
};

const clearForm = () => {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  password.value = '';
  confirm_password.value = '';
};

form.addEventListener('submit', () => {
  if (validationfail > 0) {
    validationfail = 0;
    return;
  } else {
    validation();
    clearForm();
  }
});

// form.addEventListener('submit', validation);
