import mail from './mail.js';

const closeModal = document.querySelectorAll('.close');
const openModal = document.querySelector('.btn-reg');
const mod = document.querySelector('.regModal');
const submitBtn = document.querySelector('.submit-btn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const nameInputDanger = document.querySelector('.name-input-danger');
const emailInputDanger = document.querySelector('.email-input-danger');
const passwordInputDanger = document.querySelector('.password-input-danger');
const confirmPasswordInputDanger = document.querySelector('.confirm-password-input-danger');
const emailAddressInputDanger = document.querySelector('.email-address-input-danger');
submitBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  if (!mail(email)) {
    emailInput.classList.remove('input-field');
    emailInput.classList.add('red-field');
    emailAddressInputDanger.style.display = 'block';
  } else {
    emailAddressInputDanger.style.display = 'none';
  }
  if (name === '') {
    nameInput.classList.remove('input-field');
    nameInput.classList.add('red-field');
    nameInputDanger.style.display = 'block';
  }
  // if (email === '') {
  //   emailInput.classList.remove('input-field');
  //   emailInput.classList.add('red-field');
  //   emailInputDanger.style.display = 'block';
  // }
  if (password === '') {
    passwordInput.classList.remove('input-field');
    passwordInput.classList.add('red-field');
    passwordInputDanger.style.display = 'block';
  }
  if (confirmPassword === '') {
    confirmPasswordInput.classList.remove('input-field');
    confirmPasswordInput.classList.add('red-field');
  }
  if (confirmPassword !== password) {
    confirmPasswordInput.classList.remove('input-field');
    confirmPasswordInput.classList.add('red-field');
    confirmPasswordInputDanger.style.display = 'block';
  } else {
    confirmPasswordInput.classList.remove('red-field');
    confirmPasswordInput.classList.add('input-field');
    confirmPasswordInputDanger.style.display = 'none';
  }

  nameInput.addEventListener('input', () => {
    if (!name.length < 0) {
      nameInput.classList.add('red-field');
      nameInput.classList.remove('input-field');
      nameInputDanger.style.display = 'block';
    } else {
      nameInput.classList.add('input-field');
      nameInput.classList.remove('red-field');
      nameInputDanger.style.display = 'none';
    }
  });
  emailInput.addEventListener('input', () => {
    if (!email.length < 0) {
      emailInput.classList.add('red-field');
      emailInput.classList.remove('input-field');
      emailInputDanger.style.display = 'block';
    } else {
      emailInput.classList.add('input-field');
      emailInput.classList.remove('red-field');
      emailInputDanger.style.display = 'none';
    }
  });
  passwordInput.addEventListener('input', () => {
    if (!password.length < 0) {
      passwordInput.classList.add('red-field');
      passwordInput.classList.remove('input-field');
      passwordInputDanger.style.display = 'block';
    } else {
      passwordInput.classList.add('input-field');
      passwordInput.classList.remove('red-field');
      passwordInputDanger.style.display = 'none';
    }
  });
});

closeModal.forEach((element) => {
  element.addEventListener('click', () => {
    mod.style.display = 'none';
  });
});

openModal.addEventListener('click', () => {
  mod.style.display = 'block';
});

window.addEventListener('click', (event) => {
  if (event.target === mod) {
    mod.style.display = 'none';
  }
});
