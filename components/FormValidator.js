const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__form-input-invalid",
  errorClass: "modal__input-error_active",
};

export default class FormValidator {
  #formElement;
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #formInputList;
  #formButton;
  constructor(settings, formElement) {
    this.#formElement = formElement;
    this.#formSelector = settings.formSelector;
    this.#inputSelector = settings.inputSelector;
    this.#submitButtonSelector = settings.submitButtonSelector;
    this.#inactiveButtonClass = settings.inactiveButtonClass;
    this.#inputErrorClass = settings.inputErrorClass;
    this.#errorClass = settings.errorClass;
    this.#formInputList = [
      ...formElement.querySelectorAll(settings.inputSelector),
    ];
    this.#formButton = this.#formElement.querySelector(
      this.#submitButtonSelector
    );
  }

  #toggleInputError(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this.#inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#errorClass);
  }

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this.#inputErrorClass);
    errorElement.classList.remove(this.#errorClass);
    errorElement.textContent = "";
  }

  #checkFormValidity() {
    return this.#formInputList.every((inputField) => {
      return inputField.validity.valid;
    });
  }

  #setEventListeners() {
    this.#formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#formElement.addEventListener("reset", () => {
      this.toggleSubmitButton();
    });
    this.#formInputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#toggleInputError(inputElement);
        this.toggleSubmitButton();
      });
    });
  }

  enableValidation() {
    this.#setEventListeners();
  }

  toggleSubmitButton() {
    if (this.#checkFormValidity()) {
      this.#formButton.disabled = false;
      this.#formButton.classList.remove(this.#inactiveButtonClass);
    } else {
      this.#formButton.disabled = true;
      this.#formButton.classList.add(this.#inactiveButtonClass);
    }
  }
}
