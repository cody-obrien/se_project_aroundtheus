import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  #modal;
  #modalCloseButton;
  constructor(popupSelector) {
    super(popupSelector);

    this.#modal = document.querySelector(popupSelector);
    this.#modalCloseButton = this.#modal.querySelector(".modal__button-close");
  }
  open({ src, alt }) {
    const modalImage = this.#modal.querySelector(".modal__image");
    const modalCaption = this.#modal.querySelector(".modal__caption");
    modalImage.src = src;
    modalImage.alt = alt;
    modalCaption.textContent = alt;
    super.open();
  }
}
