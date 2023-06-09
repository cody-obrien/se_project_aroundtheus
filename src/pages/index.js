import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import "./index.css";
import { config } from "../utils/constants.js";
import { api } from "../components/Api.js";
import Popup from "../components/Popup.js";

// const cardList = document.querySelector(".cards__list");

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

const deleteModal = new PopupWithConfirm(".modal-delete");
deleteModal.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userAboutSelector: ".profile__description",
  userAvatarSelector: ".profile__image",
});

let userId;
let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((values) => {
    userId = values[0]._id;
    const userData = values[0];

    const initialCards = values[1];

    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
    cardSection = new Section(
      {
        items: initialCards,
        renderer: (cardData) => {
          cardSection.addItem(createCard(cardData));
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
    // return userData;
  })
  .catch((err) => {
    console.error("Error. The request has failed: ", err);
  });

const profileModal = new PopupWithForm(".modal-profile", (inputs) => {
  profileModal.renderLoading(true);
  api
    .updateUserInfo(inputs)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
      });

      profileModal.close();
    })
    .catch((err) => {
      console.error("Error. The request has failed: ", err);
    })
    .finally(() => {
      profileModal.renderLoading(false);
    });
});
profileModal.setEventListeners();

const avatarModal = new PopupWithForm(".modal-avatar", (inputs) => {
  avatarModal.renderLoading(true);
  console.log(inputs.avatar);

  api
    .updateProfilePicture(inputs.avatar)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
      });

      avatarModal.close();
    })
    .catch((err) => {
      console.error("Error. The request has failed: ", err);
    })
    .finally(() => {
      avatarModal.renderLoading(false);
    });
});
avatarModal.setEventListeners();
const modalFormAvatar = document.querySelector(".modal__form-avatar");
const avatarFormValidator = new FormValidator(config, modalFormAvatar);
avatarFormValidator.enableValidation();
document
  .querySelector(".profile__button-edit-avatar")
  .addEventListener("click", () => {
    avatarModal.open();
    avatarFormValidator.toggleSubmitButton();
  });

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
  cardModal.renderLoading(true);
  api
    .addNewCard(inputs)
    .then((res) => {
      cardSection.addItem(createCard(res));
      cardModal.close();
    })
    .catch((err) => {
      console.error("Error. The request has failed: ", err);
    })
    .finally(() => {
      cardModal.renderLoading(false);
    });
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
    userId,
    "#card",
    () => {
      pictureModal.open(card.getCardData());
    },
    (cardId) => {
      deleteModal.open();
      deleteModal.setSubmitHandler(() => {
        deleteModal.renderLoading(true);
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteModal.close();
          })
          .catch((err) => {
            console.error("Error. The request has failed: ", err);
          })
          .finally(() => {
            deleteModal.renderLoading(false);
          });
      });
    },
    () => {
      api
        .toggleCardLike(card.getCardData().id, card.getCardData().isLiked)
        .then((res) => {
          {
            card.setIsLiked(res.likes);
            card.toggleActiveLike();
            card.updateLikeAmount(res.likes);
          }
        })
        .catch((err) => {
          console.error("Error. The request has failed: ", err);
        });
    }
  );

  const cardElement = card.getCardElement();
  // potentially change this to be a method in the card class
  if (cardData.owner._id !== userId) {
    card.disableDeleteButton();
  }

  return cardElement;
}
