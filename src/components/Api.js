// Token: cec7d967-b84d-4a45-bbb1-45eb7a2c7337 Group ID: group-12

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._auth = options.headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._auth,
      },
    }).then((res) => {
      return res.json();
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._auth,
      },
    }).then((res) => {
      return res.json();
    });
  }

  updateUserInfo({ name, about }) {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
  addNewCard({ name, link }) {
    fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
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
