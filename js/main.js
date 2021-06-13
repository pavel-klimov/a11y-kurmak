import LoginWindow from './modules/modal-window.js';

const loginModal = new LoginWindow();
const loginButton = document.querySelector('.header__login-button');
loginButton.setAttribute('role','button');
loginButton.setAttribute('aria-haspopup','dialog');

const openLoginModalOnClick = function (evt) {
  evt.preventDefault();
  loginModal.open();
};

loginButton.addEventListener('click', openLoginModalOnClick);
loginButton.addEventListener('keydown', (evt) => {
  if (evt.which === 32) {
    evt.preventDefault();
  }
});

loginButton.addEventListener('keyup', (evt) => {
  if (evt.which === 32) {
    evt.stopPropagation();
    openLoginModalOnClick(evt);
  }
});
