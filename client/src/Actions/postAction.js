import axios from 'axios';
import { api } from '../Utils/api';

const token = JSON.parse(localStorage.getItem('token'));

export function getAllPost() {
  return axios
    .get(api + '/api/post/', {
      headers: { Authorization: 'Bearer ' + token.token },
    })
    .then((response) => {
      console.log('ALLPOST', response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
}
export function getPost(postId) {
  return axios
    .get(api + '/api/post/' + postId, {
      headers: { Authorization: 'Bearer ' + token.token },
    })
    .then((response) => {
      console.log('ONE POST BY ID', response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
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
    .then((response) => {
      console.log('CREATE NEWPOST', response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
}
export function updatePost(postId, imagePost, description) {
  // console.log(typeof images, imagePost);
  let data = new FormData();
  data.append('description', description);
  if (typeof images === 'object') {
    data.append('images', imagePost);
  }

  if (description || imagePost) {
    return axios
      .post(api + '/api/post/' + postId, data, {
        headers: {
          Authorization: 'Bearer ' + token.token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('UPDATE POST', response);
        return response;
      })
      .catch((error) => {
        console.log(error.message);
        return error;
      });
  }
}
export function deletePost(postId) {
  return axios
    .delete(api + '/api/post/' + postId, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
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
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
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
    .then((response) => {
      console.log('ALL COMMENT', response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
}

export function deleteComment(commentId) {
  return axios
    .delete(api + '/api/comment/' + commentId, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('COMM DELETE', response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
}
export function editCmt(commentId, message) {
  let data = {
    message: message,
  };

  return axios
    .put(api + '/api/comment/' + commentId, data, {
      headers: {
        Authorization: 'Bearer ' + token.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('COMM UPDATE', response);
      return response;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
    });
}
