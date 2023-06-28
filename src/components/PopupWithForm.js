import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #modalForm;
  #modalSaveButton;
  #modalInputs;
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this.#handleFormSubmit = handleFormSubmit;
    this.#modalForm = this._modal.querySelector(".modal__form");
    this.#modalSaveButton = this.#modalForm.querySelector(
      ".modal__button-save"
    );
    this.#modalInputs = this.#modalForm.querySelectorAll(".modal__form-input");
  }

  #getInputValues() {
    const inputsObject = {};
    this.#modalInputs.forEach((element) => {
      inputsObject[element.name] = element.value;
    });

    return inputsObject;
  }

  changeButtonText(text) {
    this.#modalSaveButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this.#modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#handleFormSubmit(this.#getInputValues());
    });
  }
}
