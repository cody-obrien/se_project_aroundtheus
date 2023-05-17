export default class Card {
  constructor(data, cardSelector) {
    this.image = data.link;
    this.name = data.name;
    this.cardSelector = cardSelector;
  }
  #makeCardElement() {
    this.cardElement = document
      .querySelector(this.cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this.cardImage = this.cardElement.querySelector(".card__image");
    this.cardLikeButton = this.cardElement.querySelector(".card__button-like");
    this.cardDeleteButton = this.cardElement.querySelector(
      ".card__button-delete"
    );
    this.cardImage.setAttribute("src", this.image);
    this.cardImage.setAttribute("alt", this.name);
    this.cardElement.querySelector(".card__text").textContent = this.name;
  }

  #setEventListeners() {
    // this.cardImage.addEventListener("click", () => {
    //   openModal(modalPicture);
    //   setPictureModal(cardImage);
    // });

    this.cardLikeButton.addEventListener("click", () =>
      this.#toggleActiveLike()
    );
    this.cardDeleteButton.addEventListener("click", () => this.#deleteCard());
  }

  #toggleActiveLike() {
    this.cardLikeButton.classList.toggle("card__button-like-active");
  }

  #deleteCard() {
    console.log(this.cardElement);
    this.cardElement.remove();
    this.cardElement = null;
  }
  getCardElement() {
    this.#makeCardElement();
    this.#setEventListeners();
    return this.cardElement;
  }
}
