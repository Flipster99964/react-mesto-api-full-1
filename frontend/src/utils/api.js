export class Api {
  constructor(config) {
    this.source = config.source
    this.cohort = config.cohort
    this.token = config.token
  }
  //checking if the server's responce is ok
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //get user info
  getUserInfo() {
    return fetch(`${this.source}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponse(res))
  }
  //update user info
  setUserInfo({ name, about }) {
    return fetch(`${this.source}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(res => this._checkResponse(res))
  }
  //update user avatar
  setUserAvatar(avatar) {
    return fetch(`${this.source}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._checkResponse(res))
  }
  //get cards
  getCards() {
    return fetch(`${this.source}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponse(res))
  }
  //add a new card
  postCard({ name: place, link: source }) {
    return fetch(`${this.source}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: place,
        link: source
      })
    })
      .then(res => this._checkResponse(res))
  }
  //delete selected card
  deleteCard(cardId) {
    return fetch(`${this.source}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      }
    })
      .then(res => this._checkResponse(res))
  }
  //like selected card
  setLike(cardId) {
    return fetch(`${this.source}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
      }
    })
      .then(res => this._checkResponse(res))
  }
  //remove like on selected card
  deleteLike(cardId) {
    return fetch(`${this.source}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      }
    })
      .then(res => this._checkResponse(res))
  }
  //check out whether current card is liked, then put or delete it
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.setLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }
}

export const api = new Api({
  source: 'http://localhost:3001',
  token: `Bearer ${localStorage.getItem('jwt')}`,
})