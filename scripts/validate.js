const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__form-input-invalid",
  errorClass: "modal__input-error_active",
};

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    return inputElement.validity.valid;
  } else {
    hideInputError(formElement, inputElement);
    return inputElement.validity.valid;
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function setEventListeners(formElement) {
  const formButton = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleInputFieldValidity(inputElement);
      toggleSubmitButton(formButton, checkFormValidity(inputList));
    });
  });
}

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      toggleSubmitButton(
        formElement.querySelector(options.submitButtonSelector),
        checkFormValidity(formElement)
      );
    });
    setEventListeners(formElement);
  });
}
function toggleSubmitButton(button, validity) {
  if (validity) {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  }
}
function checkFormValidity(formElement) {
  return formElement.every((inputField) => {
    return inputField.validity.valid;
  });
}
function toggleInputFieldValidity(inputElement) {
  if (!inputElement.validity.valid) {
    inputElement.classList.add(config.inputErrorClass);
  } else {
    inputElement.classList.remove(config.inputErrorClass);
  }
}

enableValidation(config);
