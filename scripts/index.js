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

const modal = document.querySelector(".modal");
const inputTitle = document.querySelector('[name = "title"]');
const inputDesc = document.querySelector('[name = "description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

document
  .querySelector(".profile__button-edit")
  .addEventListener("click", function (event) {
    modal.classList.add("modal_opened");

    inputTitle.value = profileTitle.textContent;
    inputDesc.value = profileDesc.textContent;
  });

document
  .querySelector(".modal__button-close")
  .addEventListener("click", function (event) {
    modal.classList.remove("modal_opened");
  });

document
  .querySelector(".modal__form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    profileDesc.textContent = inputDesc.value;
    profileTitle.textContent = inputTitle.value;
    modal.classList.remove("modal_opened");
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
const cardList = document.querySelector(".cards__list");

for (const card of initialCards) {
  const newCard = getCardElement(card);
  cardList.append(newCard);
}
