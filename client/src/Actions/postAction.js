import axios from 'axios';
import { api } from '../Utils/api';

const token = JSON.parse(localStorage.getItem('token'));

export function getAllPost() {
  return axios
    .get(api + '/api/post/', {
      headers: { Authorization: 'Bearer ' + token.token },
    })
    .then(function (response) {
      console.log('ALLPOST', response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
}

export function newPost(description, imagePost) {
  const data = new FormData();
  data.append('description', description);
  data.append('images', imagePost);
  data.append('userId', token.userId);

  return axios
    .post(api + '/api/post', data, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      console.log('CREATE NEWPOST', response);
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
}

export function updatePost(postId) {
  return axios
    .put(api + '/api/post/' + postId, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
}


// const handlePostUpdate = (postId) => {
//   axios
//     .put(api + '/api/post/' + postId, {
//       headers: {
//         Authorization: 'Bearer ' + token.token,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((response) => {
//       console.log('UPDATE DU POST ', response);
//     })
//     .catch((error) => {
//       console.error('ERROR UPDATE', error);
//     });
// };
export function deletePost(postId) {
  return axios
    .delete(api + '/api/post/' + postId, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
}

export function commentPost(id) {
  return axios
    .post(api + `/api/comment/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
}

export function allComment() {
  return axios
    .get(api + `/api/comment`, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      console.log('ALL COMMENT', response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
}
