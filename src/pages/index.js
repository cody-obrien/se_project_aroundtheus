import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";
import { config } from "../utils/constants.js";
import { api } from "../components/Api.js";
import Popup from "../components/Popup.js";

const cardList = document.querySelector(".cards__list");

const pictureModal = new PopupWithImage(".modal-picture");
pictureModal.setEventListeners();
// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       cardSection.addItem(createCard(cardData));
//     },
//   },
//   ".cards__list"
// );
// cardSection.renderItems();

const deleteModal = new PopupWithForm(".modal-delete", () => {
  // api.deleteCard()
  deleteModal.close();
});
deleteModal.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userAboutSelector: ".profile__description",
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((values) => {
    const userData = values[0];
    const initialCards = values[1];

    userInfo.setUserInfo({ name: userData.name, about: userData.about });
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
  })
  .catch((err) => {
    console.error("Error. The request has failed: ", err);
  });

const profileModal = new PopupWithForm(".modal-profile", (inputs) => {
  api
    .updateUserInfo(inputs)
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, about: res.about });
    })
    .catch((err) => {
      console.error("Error. The request has failed: ", err);
    })
    .finally(() => {
      profileModal.close();
    });
});
profileModal.setEventListeners();

const modalFormProfile = document.querySelector(".modal__form-profile");
const inputTitle = document.querySelector('[name = "name"]');
const inputDesc = document.querySelector('[name = "about"]');

const profileFormValidator = new FormValidator(config, modalFormProfile);
profileFormValidator.enableValidation();
document
  .querySelector(".profile__button-edit")
  .addEventListener("click", () => {
    const { userName, userAbout } = userInfo.getUserInfo();
    inputTitle.value = userName;
    inputDesc.value = userAbout;
    profileModal.open();
    profileFormValidator.toggleSubmitButton();
  });

const cardModal = new PopupWithForm(".modal-add", (inputs) => {
  api.addNewCard(inputs);
  //make this async with .then and .catch using server response
  cardList.prepend(createCard(inputs));

  cardModal.close();
});
cardModal.setEventListeners();

const modalFormAdd = document.querySelector(".modal__form-add");
const addFormValidator = new FormValidator(config, modalFormAdd);
addFormValidator.enableValidation();
document.querySelector(".profile__button-add").addEventListener("click", () => {
  cardModal.open();
  addFormValidator.toggleSubmitButton();
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card",
    () => {
      pictureModal.open(card.getCardData());
    },
    () => deleteModal.open()
  );
  return card.getCardElement();
}
