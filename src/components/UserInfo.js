export default class UserInfo {
  #userNameElement;
  #userAboutElement;
  constructor({ userNameSelector, userAboutSelector }) {
    this.#userNameElement = document.querySelector(userNameSelector);
    this.#userAboutElement = document.querySelector(userAboutSelector);
  }
  getUserInfo() {
    return {
      userName: this.#userNameElement.textContent,
      userAbout: this.#userAboutElement.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this.#userNameElement.textContent = name;
    this.#userAboutElement.textContent = about;
  }
}
