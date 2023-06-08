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
    document.addEventListener("keydown", this.#handleEscClose);
  }
  close() {
    this.#modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.#handleEscClose);
  }
  #handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this.#modalCloseButton.addEventListener("click", () => {
      this.close();
    });
    this.#modal.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
