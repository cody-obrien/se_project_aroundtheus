import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #modalForm;
  #modal;
  #modalCloseButton;
  #modalInputs;
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.#modal = document.querySelector(popupSelector);
    this.#modalCloseButton = this.#modal.querySelector(".modal__button-close");
    this.#handleFormSubmit = handleFormSubmit;
    this.#modalForm = this.#modal.querySelector(".modal__form");
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
    console.log(inputsObject);
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
