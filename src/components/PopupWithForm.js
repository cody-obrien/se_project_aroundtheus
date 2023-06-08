import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #modalForm;

  #modalInputs;
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this.#handleFormSubmit = handleFormSubmit;
    this.#modalForm = this._modal.querySelector(".modal__form");
    this.#modalInputs = this.#modalForm.querySelectorAll(".modal__form-input");
  }
  close() {
    super.close();
    this.#modalForm.reset();
  }
  #getInputValues() {
    const inputsObject = {};
    this.#modalInputs.forEach((element) => {
      inputsObject[element.name] = element.value;
    });

    return inputsObject;
  }

  setEventListeners() {
    super.setEventListeners();

    this.#modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#handleFormSubmit(this.#getInputValues());
    });
  }
}
