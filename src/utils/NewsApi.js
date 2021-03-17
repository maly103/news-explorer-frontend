class Api {
  constructor(baseUrl, apiKey) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  }

  getArticles(keyword, dateFrom, dateTo) {
    return fetch(
      `${this._baseUrl}/everything?q=${keyword}&from=${dateFrom}&to=${dateTo}&language=ru&pageSize=100&apiKey=${this._apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      return this.renderResult(res);
    });
  }

  getUserData(text) {
    return fetch(`${this._url}/${text}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  getAllData() {
    return Promise.all([
      this.getAllCards("cards"),
      this.getUserData("users/me"),
    ]);
  }

  setUserData(text, nameUser, aboutUser) {
    return fetch(`${this._url}/${text}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameUser,
        about: aboutUser,
      }),
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  setUserAvatar(text, link) {
    return fetch(`${this._url}/${text}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  addCard(text, nameCard, linkCard) {
    return fetch(`${this._url}/${text}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameCard,
        link: linkCard,
      }),
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  deleteCard(text) {
    return fetch(`${this._url}/${text}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  changeLikeCardStatus(text, isLiked) {
    const name = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._url}/${text}`, {
      method: name,
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this.renderResult(res);
    });
  }
}

const url = "https://nomoreparties.co/news/v2";
const apiKey = "b87565336a7a426daf540944eba94e51";

const newsApi = new Api(url, apiKey);
export default newsApi;
