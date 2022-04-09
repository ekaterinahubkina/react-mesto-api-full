class Auth {
    constructor({ url }) {
        this.url = url;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getToken = () => {
        return `Bearer ${localStorage.getItem('token')}`;
    }

    register({ password, email }) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._getResponseData);
    }

    login({ password, email }) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._getResponseData);
    }

    tokenCheck({ token }) {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            }
        })
            .then(this._getResponseData);
    }
}

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const auth = new Auth({
    url: BASE_URL,
});

export default auth;
