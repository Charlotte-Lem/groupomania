import axios from 'axios';
import { api } from '../Utils/api';

const token = JSON.parse(localStorage.getItem('token'));

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
      return response;
    })
    .catch((error) => {
      console.log(error.message);
      return error;
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

// export const updateUser = (id, token) => {
//   return axios
//     .put(`${api}/api/user/${id}`, {
//       headers: {
//         Authorization: 'Bearer ' + token,
//         'Content-Type': 'application/json',
//       },
//     })

//     .then(function (response) {
//       console.log(response);
//       return response.data.user;
//     })
//     .catch(function (error) {
//       console.log(error.message);
//       return false;
//     });
// };

// export const getUser = (id) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.get(`${api}/api/user/${id}`);
//       dispatch({ type: GET_USER, payload: res.data });
//     } catch (err) {
//       return console.log(err);
//     }
//   };
// };
