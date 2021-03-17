class Api {
  constructor(url) {
    this._url = url;
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  }

  getAllCards() {
    return fetch(`${this._url}/articles`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      return this.renderResult(res);
    });
  }

  addCard(card) {
    return fetch(`${this._url}/articles`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: card.keyword,
        title: card.title,
        text: card.text,
        date: card.date,
        source: card.source,
        link: card._id,
        image: card.image,
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

const apiMain = new Api(
  `${window.location.protocol}${
    process.env.REACT_APP_API_URL || "//localhost:3003"
  }`
);

export default apiMain;
