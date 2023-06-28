export default class Card {
  #name;
  #image;
  #id;
  #ownerId;
  #cardSelector;
  #cardElement;
  #cardImage;
  #cardLikeButton;
  #cardDeleteButton;
  #cardText;
  #handleCardClick;
  #handleDeleteClick;

  constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
    this.#image = data.link;
    this.#name = data.name;
    this.#id = data._id;
    this.#ownerId = data.owner._id;
    this.#cardSelector = cardSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleDeleteClick = handleDeleteClick;
  }
  #makeCardElement() {
    this.#cardElement = document
      .querySelector(this.#cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this.#cardImage = this.#cardElement.querySelector(".card__image");
    this.#cardLikeButton =
      this.#cardElement.querySelector(".card__button-like");
    this.#cardDeleteButton = this.#cardElement.querySelector(
      ".card__button-delete"
    );
    this.#cardText = this.#cardElement.querySelector(".card__text");
    this.#cardText.textContent = this.#name;

    this.#cardImage.setAttribute("src", this.#image);
    this.#cardImage.setAttribute("alt", this.#name);
  }

  #setEventListeners() {
    this.#cardImage.addEventListener("click", () => {
      this.#handleCardClick();
    });

    this.#cardLikeButton.addEventListener("click", () =>
      this.#toggleActiveLike()
    );
    this.#cardDeleteButton.addEventListener("click", () =>
      this.#handleDeleteClick(this.#id)
    );
  }

  #toggleActiveLike() {
    this.#cardLikeButton.classList.toggle("card__button-like-active");
  }

  #deleteCard() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }
  getCardElement() {
    this.#makeCardElement();
    this.#setEventListeners();
    return this.#cardElement;
  }

  disableDeleteButton() {
    // remove delete button completely this.#carddeletebutton.remove
    this.#cardDeleteButton.classList.add("card__button-delete-disabled");
  }
  getCardData() {
    return {
      src: this.#image,
      alt: this.#name,
      id: this.#id,
      ownerId: this.#ownerId,
    };
  }
}
