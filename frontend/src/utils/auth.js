class Auth {
    constructor({ url, token }) {
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

    register({ password, email }) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, email})
        })
            .then(this._getResponseData);
    }

    login({ password, email }) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, email})
        })
            .then(this._getResponseData);
    }

    tokenCheck({token}) {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
            .then(this._getResponseData);
    }
}


const auth = new Auth({
    url: 'https://auth.nomoreparties.co',
    token: '76c1c471-2766-4a3c-9dbb-2acf0a9ae808'
});

export default auth;
