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

const carousel = document.querySelector('.carousel');

const items = carousel.querySelectorAll('.carousel__item');
let activeItem = 0;


carousel.querySelector('.carousel__item_active')?.classList.remove('carousel__item_active');

// const lastPlaceholder = items[items.length - 1].cloneNode(true);
// const firstPlaceholder = items[0].cloneNode(true);

// items[0].parentNode.insertAdjacentElement('beforeend', firstPlaceholder);
// items[0].parentNode.insertAdjacentElement('afterbegin', lastPlaceholder);


const nextCarouselStep = function () {
  items[activeItem].classList.remove('carousel__item_active');
  items[(activeItem + 1 < items.length) ? activeItem + 1 : 0].classList.remove('carousel__item_next');
  items[(activeItem - 1 < 0) ? items.length - 1 : activeItem - 1].classList.remove('carousel__item_preview');

  activeItem = (activeItem + 1 < items.length) ? activeItem + 1 : 0;

  items[activeItem].classList.add('carousel__item_active');
  items[(activeItem + 1 < items.length) ? activeItem + 1 : 0].classList.add('carousel__item_next');
  items[(activeItem - 1 < 0) ? items.length - 1 : activeItem - 1].classList.add('carousel__item_preview');

  setTimeout(nextCarouselStep, 5000);
}

nextCarouselStep();
