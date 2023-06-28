export default class Popup {
  _modal;
  _modalCloseButton;
  constructor(popupSelector) {
    this._modal = document.querySelector(popupSelector);
    this._modalCloseButton = this._modal.querySelector(".modal__button-close");
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    if (this._modal.querySelector(".modal__button-save")) {
      this._modalSaveButton = this._modal.querySelector(".modal__button-save");
    }
  }
  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this.#handleEscClose);
  }
  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.#handleEscClose);
  }

  changeButtonText(text) {
    this._modalSaveButton.textContent = text;
  }
  #handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._modalCloseButton.addEventListener("click", () => {
      this.close();
    });
    this._modal.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
