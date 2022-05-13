const { api } = 'http://localhost:5000';

const token = JSON.parse(localStorage.getItem('token'));

const axios = require('axios').default;

export function getUser(userId, token) {
  return axios
    .get(api + '/api/user/' + userId, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .then(function (response) {
      return response.data.user;
    })
    .catch(function (error) {
      return false;
    });
}
