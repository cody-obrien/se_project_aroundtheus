const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__form-input-invalid",
  errorClass: "modal__input-error_active",
};

function toggleInputError(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function setEventListeners(formElement, config) {
  const formButton = formElement.querySelector(config.submitButtonSelector);
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  toggleSubmitButton(formButton, false);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleInputError(formElement, inputElement);
      toggleSubmitButton(formButton, checkFormValidity(inputList));
    });
  });
}

function enableValidation(config) {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    const inputList = [...formElement.querySelectorAll(config.inputSelector)];

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    formElement.addEventListener("reset", (evt) => {
      toggleSubmitButton(
        formElement.querySelector(config.submitButtonSelector),
        checkFormValidity(inputList)
      );
    });
    setEventListeners(formElement, config);
  });
}
function toggleSubmitButton(button, isValid) {
  if (isValid) {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  }
}
function checkFormValidity(inputFieldList) {
  return inputFieldList.every((inputField) => {
    return inputField.validity.valid;
  });
}

enableValidation(config);
