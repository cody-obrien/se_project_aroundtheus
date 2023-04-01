let initialCards = [
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

let modal = document.querySelector(".modal");
let inputTitle = document.querySelector('[name = "title"]');
let inputDesc = document.querySelector('[name = "description"]');
let profileTitle = document.querySelector(".profile__title");
let profileDesc = document.querySelector(".profile__description");

function getTitlesAndDescriptions() {
  let inputTitle = document.querySelector('[name = "title"]');
  let inputDesc = document.querySelector('[name = "description"]');
  let profileTitle = document.querySelector(".profile__title");
  let profileDesc = document.querySelector(".profile__description");
}
document
  .querySelector(".profile__button-edit")
  .addEventListener("click", function (event) {
    getTitlesAndDescriptions();
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
  .querySelector(".modal__button-save")
  .addEventListener("click", function (event) {
    getTitlesAndDescriptions();
    event.preventDefault();
    profileDesc.textContent = inputDesc.value;
    profileTitle.textContent = inputTitle.value;
    modal.classList.remove("modal_opened");
  });
