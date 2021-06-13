import FocusTrap from './focus-trap.js';

const LoginWindow = class {
  constructor () {
    this._root = null;
    this._form = null;
    this._closeButton = null;
    this._submitButton = null;
    this._openingButton = null;
    this._focusTrap = null;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._openingButton = document.activeElement;
    if (this._root === null) {
      this._root = this._render();
      this._focusTrap = new FocusTrap(this._root);
      this._focusTrap.onEscCallback = this.close;
    }
    document.body.append(this._root);
    const wrap = document.querySelector('.wrap')
    if (wrap !== null) {
      document.body.style.overflow = 'hidden';
      wrap.style.overflow = 'auto scroll';
    }
    document.addEventListener('keydown', this._focusTrap.onKeydownControl);
    this._closeButton.focus();
  }

  close() {
    if (this._root !== null) {
      this._root.remove();
      document.addEventListener('keydown', this._focusTrap.onKeydownControl);
      this._openingButton.focus();
      const wrap = document.querySelector('.wrap')
      if (wrap !== null) {
        document.body.style.overflow = '';
        wrap.style.overflow = '';
      }
    }
  }

  onOpenCallback() {}

  onCloseCallback() {}

  _render() {
    const modal = document.createElement('div');
    modal.innerHTML = `
<div class="modal-window" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="modal-login-window-title">
  <div class="modal-window__content">
    <button class="modal-window__close" type="button" aria-label="Закрыть"></button>
    <h2 class="modal-window__title">Авторизация</h2>
    <form class="modal-window__form" method="POST" action="/login/">
      <label class="modal-window__label">
        Логин
        <input class="modal-window__field" autocomplete="username" type="text" required>
      </label>
      <label class="modal-window__label">
        Пароль
        <input class="modal-window__field" autocomplete="current-password" type="password" required>
      </label>
      <button class="modal-window__submit">Войти</button>
    </form>
  </div>
</div>`;
    this._closeButton = modal.querySelector('.modal-window__close');
    this._closeButton.addEventListener('click', this.close);

    this._form = modal.querySelector('.modal-window__form');

    this._submitButton = modal.querySelector('.modal-window__submit');
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (this._form.reportValidity()) {
        this.close();
      }
    })

    return modal.querySelector('.modal-window');
  }
}

export default LoginWindow;
