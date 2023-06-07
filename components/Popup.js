export default class Popup {
  #modal;
  #modalCloseButton;
  constructor(popupSelector) {
    this.#modal = document.querySelector(popupSelector);
    this.#modalCloseButton = this.#modal.querySelector(".modal__button-close");
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  open() {
    this.#modal.classList.add("modal_opened");
  }
  close() {
    this.#modal.classList.remove("modal_opened");
  }
  #handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this.#modalCloseButton.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("keydown", (event) => {
      this.#handleEscClose(event);
    });
    this.#modal.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
