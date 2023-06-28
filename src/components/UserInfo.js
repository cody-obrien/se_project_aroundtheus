export default class UserInfo {
  #userNameElement;
  #userAboutElement;
  #userAvatarElement;
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this.#userNameElement = document.querySelector(userNameSelector);
    this.#userAboutElement = document.querySelector(userAboutSelector);
    this.#userAvatarElement = document.querySelector(userAvatarSelector);
  }
  getUserInfo() {
    return {
      userName: this.#userNameElement.textContent,
      userAbout: this.#userAboutElement.textContent,
    };
  }
  setUserInfo({ name, about, avatar }) {
    this.#userNameElement.textContent = name;
    this.#userAboutElement.textContent = about;
    this.#userAvatarElement.src = avatar;
    this.#userAvatarElement.alt = name;
  }
}
