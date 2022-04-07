class Api{
    constructor({url, token}) {
        this.url = url;
        this.token = token;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

    }

    getCards = () => {
        return fetch(`${this.url}/cards`, {
            headers: {
                authorization: this.token
            }
        })
            .then(this._getResponseData);
    }

    getUserData() {
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
            .then(this._getResponseData);
    }

    editUserData(data) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData);
    }

    addNewCard(data) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResponseData);
    }

    deleteMyCard(data) {
        return fetch(`${this.url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._getResponseData);
    }

    changeLikeCardStatus(data, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT';
        return fetch(`${this.url}/cards/${data._id}/likes`, {
            method,
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._getResponseData); 
    }

    // putLike(data) {
    //     return fetch(`${this.url}/cards/${data._id}/likes`, {
    //         method: 'PUT',
    //         headers: {
    //             authorization: this.token,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(this._getResponseData);

    // }

    // deleteLike(data) {
    //     return fetch(`${this.url}/cards/${data._id}/likes`, {
    //         method: 'DELETE',
    //         headers: {
    //             authorization: this.token,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(this._getResponseData);
    // }

    editUserAvatar(data) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData);
    }

}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-32',
    token: '76c1c471-2766-4a3c-9dbb-2acf0a9ae808'
});

export default api;