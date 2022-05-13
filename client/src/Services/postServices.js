import axios from 'axios';
const url = 'http://localhost:5000/api/';

const token = JSON.parse(localStorage.getItem('token'));
console.log(token);
console.log(token.token);
console.log(token.userId);
const userId = JSON.parse(localStorage.getItem('token')).userId;

export function getPost() {
  return axios
    .get(`${url}post`, {
      headers: { Authorization: 'Bearer ' + token.token },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return false;
    });
}
export function newPost(description, imagePost) {
  const data = new FormData();
  data.append('description', description);
  data.append('imagePost', imagePost);
  data.append('userId', token.userId);

  return axios
    .post(`${url}post`, data, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      console.log(data);
      return response.data.data;
    })
    .catch(function (error) {
      return false;
    });
}
