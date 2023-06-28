import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  #modalForm;
  #modalSaveButton;
  constructor(popupSelector) {
    super(popupSelector);
    this.#modalForm = this._modal.querySelector(".modal__form");
    this.#modalSaveButton = this.#modalForm.querySelector(
      ".modal__button-save"
    );
  }
  setSubmitHandler(callback) {
    this._submitHandler = callback;
  }
  changeButtonText(text) {
    this.#modalSaveButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this.#modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler();
    });
  }
}
