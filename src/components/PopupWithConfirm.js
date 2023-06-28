import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  #modalForm;
  constructor(popupSelector) {
    super(popupSelector);
    this.#modalForm = this._modal.querySelector(".modal__form");
  }
  setSubmitHandler(callback) {
    this._submitHandler = callback;
  }

  setEventListeners() {
    super.setEventListeners();

    this.#modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler();
    });
  }
}
