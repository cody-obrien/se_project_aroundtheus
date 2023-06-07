import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
  // modalPicture,
  openModal,
  closeModal,
  // closeModalByEscape,
  // closeModalByOutsideClick,
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

const cardList = document.querySelector(".cards__list");
// initialCards.forEach((initialCard) => {
//   cardList.append(createCard(initialCard));
// });

const pictureModal = new PopupWithImage(".modal-picture");
pictureModal.setEventListeners();
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  ".cards__list"
);
cardSection.renderItems();

// const closeButtons = document.querySelectorAll(".modal__button-close");
// closeButtons.forEach((item) => {
//   item.addEventListener("click", (event) => {
//     closeModal(event.target.closest(".modal"));
//   });
// });
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__description",
});
const profileModal = new PopupWithForm(".modal-profile", () => {
  userInfo.setUserInfo({ name: inputTitle.value, job: inputDesc.value });
  profileModal.close();
});
profileModal.setEventListeners();

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
    inputTitle.value = userInfo.getUserInfo().userName;
    inputDesc.value = userInfo.getUserInfo().userJob;
    profileModal.open();
    profileFormValidator.toggleSubmitButton();
  });

// document
//   .querySelector(".modal__form-profile")
//   .addEventListener("submit", (event) => {
//     // event.preventDefault();
//     // setProfileChanges();
//     // closeModal(event.target.closest(".modal"));
//   });

const cardModal = new PopupWithForm(".modal-add", () => {
  const newCard = new Section(
    {
      items: [{ name: inputPlace.value, link: inputImageURL.value }],
      renderer: (cardData) => {
        newCard.addItem(createCard(cardData));
      },
    },
    ".cards__list"
  );
  newCard.renderItems();

  cardModal.close();
});
cardModal.setEventListeners();
// const modalAdd = document.querySelector(".modal-add");
const modalFormAdd = document.querySelector(".modal__form-add");
const addFormValidator = new FormValidator(config, modalFormAdd);
addFormValidator.enableValidation();
document.querySelector(".profile__button-add").addEventListener("click", () => {
  cardModal.open();
  addFormValidator.toggleSubmitButton();
});

const inputPlace = document.querySelector('[name = "place"]');
const inputImageURL = document.querySelector('[name = "Image_URL"]');
// document
//   .querySelector(".modal__form-add")
//   .addEventListener("submit", (event) => {
//     event.preventDefault();
//     const newPlace = new Card(
//       { name: inputPlace.value, link: inputImageURL.value },
//       "#card"
//     );
//     // addNewCard(newPlace.getCardElement());
//     closeModal(event.target.closest(".modal"));
//     modalFormAdd.reset();
//   });

// function fillProfileForm() {
//   inputTitle.value = userInfo.getUserInfo().userName;
//   inputDesc.value = userInfo.getUserInfo().userJob;
// }

// function setProfileChanges({}) {
//   profileDesc.textContent = inputDesc.value;
//   profileTitle.textContent = inputTitle.value;
// }

function createCard(cardData) {
  const card = new Card(cardData, "#card", () => {
    pictureModal.open(card.getCardData());
  });
  return card.getCardElement();
}

// function addNewCard(card) {
//   cardList.prepend(card);
// }
