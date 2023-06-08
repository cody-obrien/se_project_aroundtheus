import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open({ src, alt }) {
    const modalImage = this._modal.querySelector(".modal__image");
    const modalCaption = this._modal.querySelector(".modal__caption");
    modalImage.src = src;
    modalImage.alt = alt;
    modalCaption.textContent = alt;
    super.open();
  }
}
