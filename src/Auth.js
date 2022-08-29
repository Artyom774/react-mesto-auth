export const BASE_URL = 'https://auth.nomoreparties.co';

function   _processTheResponse(res) {
    if (res.ok) {
      return res.json();
    };
    return Promise.reject(`Ошибка: ${res.status}`);
  }

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then((response) => {
    try {
      if (response.status === 201) {
        return response.json();
      }
    } catch(e) {
      return Promise.reject(`Ошибка: ${e.status}`)
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then((response) => {
    try {
      if (response.status === 200) {
        return response.json();
      }
    } catch(e) {
      return Promise.reject(`Ошибка: ${e.status}`)
    }
  })
  .then((res) => {
    localStorage.setItem('token', res.token);
    return res;
  })
  .catch((err) => console.log(err));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    };
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then(data => data)
  .catch((err) => console.log(err));
} 