import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #modalForm;
  #modal;
  #modalCloseButton;
  #modalInputs;
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.#handleFormSubmit = handleFormSubmit;
    this.#modalForm = this.#modal.querySelector(".modal__form");
    this.#modalInputs = this.#modalForm.querySelectorAll(".modal__form-input");
  }
  close() {
    this.#modalForm.reset();
    super.close();
  }
  #getInputValues() {
    const inputsObject = {};
    this.#modalInputs.array.forEach((element) => {
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
