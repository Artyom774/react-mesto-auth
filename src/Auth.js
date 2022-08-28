export const BASE_URL = 'https://auth.nomoreparties.co';

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
    } catch(e){
      return (e)
    }
  })
  .then((res) => {console.log(res);
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
    } catch(e){
      return (e)
    }
  })
  .then((res) => {console.log(res);
    return res;
  })
  .catch((err) => console.log(err));
};