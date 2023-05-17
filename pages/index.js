import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  // modalPicture,
  openModal,
  closeModal,
  // closeModalByEscape,
  // closeModalByOutsideClick,
  // setPictureModal,
} from "../utils/utils.js";
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__form-input-invalid",
  errorClass: "modal__input-error_active",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// const cardTemplateContent = document.querySelector("#card").content;
// const modalPicture = document.querySelector(".modal-picture");
const cardList = document.querySelector(".cards__list");
initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, "#card");

  cardList.append(card.getCardElement());
});

// const formList = [...document.querySelectorAll(".modal__form")];
// formList.forEach((form) => {
//   const newFormValidator = new FormValidator(config, form);
//   newFormValidator.enableValidation();
//   newFormValidator.toggleSubmitButton();
// });

const closeButtons = document.querySelectorAll(".modal__button-close");
closeButtons.forEach((item) => {
  item.addEventListener("click", (event) => {
    closeModal(event.target.closest(".modal"));
  });
});

const modalProfile = document.querySelector(".modal-profile");
const modalFormProfile = document.querySelector(".modal__form-profile");
const inputTitle = document.querySelector('[name = "title"]');
const inputDesc = document.querySelector('[name = "description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const profileFormValidator = new FormValidator(config, modalFormProfile);
profileFormValidator.enableValidation();
document
  .querySelector(".profile__button-edit")
  .addEventListener("click", () => {
    openModal(modalProfile);
    fillProfileForm();

    profileFormValidator.toggleSubmitButton();
  });

document
  .querySelector(".modal__form-profile")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    setProfileChanges();
    closeModal(event.target.closest(".modal"));
  });

const modalAdd = document.querySelector(".modal-add");
const modalFormAdd = document.querySelector(".modal__form-add");
const addFormValidator = new FormValidator(config, modalFormAdd);
addFormValidator.enableValidation();
document.querySelector(".profile__button-add").addEventListener("click", () => {
  openModal(modalAdd);

  addFormValidator.toggleSubmitButton();
});

const inputPlace = document.querySelector('[name = "place"]');
const inputImageURL = document.querySelector('[name = "Image_URL"]');
document
  .querySelector(".modal__form-add")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const newPlace = new Card(
      { name: inputPlace.value, link: inputImageURL.value },
      "#card"
    );
    addNewCard(newPlace.getCardElement());
    closeModal(event.target.closest(".modal"));
    modalFormAdd.reset();
  });

function fillProfileForm() {
  inputTitle.value = profileTitle.textContent;
  inputDesc.value = profileDesc.textContent;
}

function setProfileChanges() {
  profileDesc.textContent = inputDesc.value;
  profileTitle.textContent = inputTitle.value;
}

function addNewCard(card) {
  cardList.prepend(card);
}
// function getCardElement(data) {
//   const cardElement = cardTemplateContent.cloneNode(true);
//   const cardImage = cardElement.querySelector(".card__image");
//   const cardLikeButton = cardElement.querySelector(".card__button-like");
//   const cardDeleteButton = cardElement.querySelector(".card__button-delete");
//   cardImage.setAttribute("src", data.link);
//   cardImage.setAttribute("alt", data.name);
//   cardElement.querySelector(".card__text").textContent = data.name;
//   cardImage.addEventListener("click", () => {
//     openModal(modalPicture);
//     setPictureModal(cardImage);
//   });

//   cardLikeButton.addEventListener("click", (event) =>
//     toggleActiveLike(event.target.closest(".card__button-like"))
//   );
//   cardDeleteButton.addEventListener("click", (event) =>
//     deleteCard(event.target.closest(".card"))
//   );

//   return cardElement;
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeModalByEscape);
//   modal.addEventListener("mousedown", closeModalByOutsideClick);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalByEscape);
//   modal.removeEventListener("mousedown", closeModalByOutsideClick);
// }

// function closeModalByEscape(event) {
//   if (event.key === "Escape") {
//     const openModal = document.querySelector(".modal_opened");
//     closeModal(openModal);
//   }
// }

// function closeModalByOutsideClick(event) {
//   if (event.target === event.currentTarget) {
//     closeModal(event.target);
//   }
// }

// function setPictureModal(image) {
//   modalPicture.querySelector(".modal__image").setAttribute("src", image.src);
//   modalPicture.querySelector(".modal__image").setAttribute("alt", image.alt);
//   modalPicture.querySelector(".modal__caption").textContent = image.alt;
// }

// function toggleActiveLike(likeButton) {
//   likeButton.classList.toggle("card__button-like-active");
// }

// function deleteCard(card) {
//   card.remove();
// }
