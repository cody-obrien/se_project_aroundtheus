// Token: cec7d967-b84d-4a45-bbb1-45eb7a2c7337 Group ID: group-12
// refactor all api calls to check for response okayness
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }

    return response.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  toggleCardLike(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  }
  updateProfilePicture(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "cec7d967-b84d-4a45-bbb1-45eb7a2c7337",
    "Content-Type": "application/json",
  },
});
export { api };
