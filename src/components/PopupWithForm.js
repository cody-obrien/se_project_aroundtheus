import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #modalForm;
  #modalSaveButton;
  #modalInputs;
  #modalSaveButtonText;

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this.#handleFormSubmit = handleFormSubmit;
    this.#modalForm = this._modal.querySelector(".modal__form");
    this.#modalSaveButton = this.#modalForm.querySelector(
      ".modal__button-save"
    );
    this.#modalInputs = this.#modalForm.querySelectorAll(".modal__form-input");
    this.#modalSaveButtonText = this.#modalSaveButton.textContent;
  }

  #getInputValues() {
    const inputsObject = {};
    this.#modalInputs.forEach((element) => {
      inputsObject[element.name] = element.value;
    });

    return inputsObject;
  }
  close() {
    super.close();
    this.#modalForm.reset();
  }

  renderLoading(isLoading, loadingText = "Saving...") {
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
      this.#handleFormSubmit(this.#getInputValues());
    });
  }
}
