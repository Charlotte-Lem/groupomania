import axios from 'axios';
import { api } from '../Utils/api';


export function getLogin(email, password) {
  let user = {
    email: email,
    password: password,
  };
  return axios
    .post(api + '/api/user/login', user)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
}

export function getRegister(email, password, firstName, lastName) {
  let user = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };

  return axios
    .post(api + '/api/user/signup', user)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function getUser(id, token) {
  return axios
    .get(api + '/api/user/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
}

