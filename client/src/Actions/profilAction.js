import axios from 'axios';
import { api } from '../Utils/api';

const token = JSON.parse(localStorage.getItem('token'));

export function getOneUser(id, token) {
  return axios
    .get(api + '/api/user/' + id, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .then(function (response) {
      console.log(response);
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}
export function editUser(firstName, lastName, profilePicture) {
  const data = new FormData();
  data.append('firstName', firstName);
  data.append('lastName', lastName);
  data.append('userId', token.userId);

  if (typeof images === 'object') {
    data.append('images', profilePicture);
  }

  return axios
    .put(api + '/api/user/' + token.userId, data, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      console.log(response);
      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}
