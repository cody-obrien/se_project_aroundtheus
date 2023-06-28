export default class Card {
  #name;
  #image;
  #id;
  #ownerId;
  #myId;
  #likesArray;
  #numLikes;
  #isLiked;
  #cardSelector;
  #cardElement;
  #cardImage;
  #cardLikeButton;
  #cardLikeAmount;
  #cardDeleteButton;
  #cardText;
  #handleCardClick;
  #handleDeleteClick;
  #handleLikeClick;

  constructor(
    data,
    myId,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this.#image = data.link;
    this.#name = data.name;
    this.#id = data._id;
    this.#ownerId = data.owner._id;
    this.#myId = myId;
    this.#cardSelector = cardSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleDeleteClick = handleDeleteClick;
    this.#handleLikeClick = handleLikeClick;
    this.#likesArray = data.likes;
    this.#numLikes = this.#likesArray.length;
  }
  #makeCardElement() {
    this.#cardElement = document
      .querySelector(this.#cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this.#cardImage = this.#cardElement.querySelector(".card__image");
    this.#cardLikeButton =
      this.#cardElement.querySelector(".card__button-like");
    this.setIsLiked(this.#likesArray);

    this.toggleActiveLike();
    this.#cardLikeAmount =
      this.#cardElement.querySelector(".card__like-amount");
    this.updateLikeAmount(this.#likesArray);
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

    this.#cardLikeButton.addEventListener(
      "click",
      () => this.toggleActiveLike(),
      this.#handleLikeClick()
    );
    this.#cardDeleteButton.addEventListener("click", () =>
      this.#handleDeleteClick(this.#id)
    );
  }

  setIsLiked(likesArray) {
    this.#likesArray = likesArray;
    this.#isLiked = this.#likesArray.some((element) => {
      element._id === this.#myId;
    });
  }
  updateLikeAmount(likesArray) {
    this.#numLikes = likesArray.length;
    this.#cardLikeAmount.textContent = this.#numLikes;
  }

  toggleActiveLike() {
    if (this.#isLiked) {
      this.#cardLikeButton.classList.add("card__button-like-active");
    } else {
      this.#cardLikeButton.classList.remove("card__button-like-active");
    }
  }

  deleteCard() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }
  getCardElement() {
    this.#makeCardElement();
    this.#setEventListeners();
    return this.#cardElement;
  }

  disableDeleteButton() {
    this.#cardDeleteButton.remove();
  }
  getCardData() {
    return {
      src: this.#image,
      alt: this.#name,
      id: this.#id,
      ownerId: this.#ownerId,
      isLiked: this.#isLiked,
      likes: this.#numLikes,
    };
  }
}
