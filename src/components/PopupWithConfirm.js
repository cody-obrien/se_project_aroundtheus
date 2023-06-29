import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  #modalForm;
  #modalSaveButton;
  #modalSaveButtonText;
  constructor(popupSelector) {
    super(popupSelector);
    this.#modalForm = this._modal.querySelector(".modal__form");
    this.#modalSaveButton = this.#modalForm.querySelector(
      ".modal__button-save"
    );
    this.#modalSaveButtonText = this.#modalSaveButton.textContent;
  }
  setSubmitHandler(callback) {
    this._submitHandler = callback;
  }
  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this.#modalSaveButton.textContent = loadingText;
    } else {
      this.#modalSaveButton.textContent = this.#modalSaveButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this.#modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler();
    });
  }
}
