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

initialCards.forEach((element) => {
  cardList.append(getCardElement(element));
});

const modalPicture = document.querySelector(".modal-picture");
const pictures = document.querySelectorAll(".card__image");
pictures.forEach((item) => {
  item.addEventListener("click", (event) => {
    modalPicture.classList.add("modal_opened");
    modalPicture
      .querySelector(".modal__image")
      .setAttribute("src", event.target.src);
    modalPicture
      .querySelector(".modal__image")
      .setAttribute("alt", event.target.alt);
    modalPicture.querySelector(".modal__caption").textContent =
      event.target.alt;
  });
});

const closeButtons = document.querySelectorAll(".modal__button-close");
closeButtons.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.target.closest(".modal").classList.remove("modal_opened");
  });
});

const likeButtons = document.querySelectorAll(".card__button-like");
likeButtons.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.target
      .closest(".card__button-like")
      .classList.toggle("card__button-like-active");
  });
});

const deleteButtons = document.querySelectorAll(".card__button-delete");
deleteButtons.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.target.closest(".card").remove();
  });
});

const modalProfile = document.querySelector(".modal-profile");
const inputTitle = document.querySelector('[name = "title"]');
const inputDesc = document.querySelector('[name = "description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
document
  .querySelector(".profile__button-edit")
  .addEventListener("click", (event) => {
    modalProfile.classList.add("modal_opened");

    inputTitle.value = profileTitle.textContent;
    inputDesc.value = profileDesc.textContent;
  });

document
  .querySelector(".modal__form-profile")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    profileDesc.textContent = inputDesc.value;
    profileTitle.textContent = inputTitle.value;
    event.target.closest(".modal").classList.remove("modal_opened");
  });

const modalAdd = document.querySelector(".modal-add");
const modalFormAdd = document.querySelector(".modal__form-add");
document
  .querySelector(".profile__button-add")
  .addEventListener("click", (event) => {
    modalAdd.classList.add("modal_opened");
    modalFormAdd.reset();
  });

const inputPlace = document.querySelector('[name = "place"]');
const inputImageURL = document.querySelector('[name = "Image_URL"]');
document
  .querySelector(".modal__form-add")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const newPlace = { name: inputPlace.value, link: inputImageURL.value };

    cardList.prepend(getCardElement(newPlace));
    document
      .querySelector(".card__button-like")
      .addEventListener("click", (event) => {
        event.target
          .closest(".card__button-like")
          .classList.toggle("card__button-like-active");
      });

    document
      .querySelector(".card__button-delete")
      .addEventListener("click", (event) => {
        event.target.closest(".card").remove();
      });

    event.target.closest(".modal").classList.remove("modal_opened");
  });

function getCardElement(data) {
  const cardTemplateContent = document.querySelector("#card").content;
  const cardElement = cardTemplateContent.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardElement.querySelector(".card__text").textContent = data.name;

  return cardElement;
}
