import axios from 'axios';
const url = 'http://localhost:5000/api/';

// export const user = localStorage.getItem('token');
// export const token = JSON.parse(localStorage.getItem('token')).token;
// export const id = JSON.parse(localStorage.getItem('token')).userId;
const token = JSON.parse(localStorage.getItem('token'));
const id = JSON.parse(localStorage.getItem('token')).userId;
//FONCTION POUR S ENREGISTER
export const getRegister = (firstName, lastName, email, password) => {
  let dataUser = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };
  return axios({
    method: 'post',
    url: `${url}user/signup`,
    dataUser,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export function getUser(id, token) {
  return axios
    .get(`${url}user/` + id, {
      headers: { Authorization: 'Bearer ' + token.token },
    })
    .then(function (response) {
      return response.data.user;
    })
    .catch(function (error) {
      return false;
    });
}
export function getAllUser(token) {
  return axios
    .get(`${url}user`, {
      headers: { Authorization: 'Bearer ' + token.token },
    })
    .then(function (response) {
      return response.data.user;
    })
    .catch(function (error) {
      return false;
    });
}
//FONCTION POUR SE CONNECTER
// export const getLogin = async (email, password) => {
//   return axios({
//     method: 'post',
//     url: `${url}user/login`,
//     data: {
//       email,
//       password,
//     },
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };

// export function getLogin(email, password) {
//   const axios = require('axios').default;

//   let user = {
//     email: email,
//     password: password,
//   };

//   return axios
//     .post(`${url}user/login`, user)
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       return false;
//     });
// }
//TROUVER UN USER
// export const getUser = async (id) => {
//   return await axios
//     .get(`${url}user/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((res) => {
//       return res;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export function UpdateProfile(firstName, lastName, email, id, token) {
  const data = new FormData();
  data.append('firstName', firstName);
  data.append('lastName', lastName);
  data.append('email', email);
  data.append('id', id);

  // if (typeof profilePicture === 'object') {
  //   data.append('profilePicture', profilePicture);
  // }

  return axios
    .put(`${url}user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    });
}
// export function getPost() {
//   return axios
//     .get(`${url}post`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     })
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       return false;
//     });
// }

// export const UpdateProfile = async (id) => {
//   return await axios
//     .put(`${url}user/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((res) => {
//       return res;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // const logout = () => {
// //   localStorage.removeItem('user');
// // };

// // const login = async (data) => {
// //   const res = await axios({
// //     method: 'post',
// //     url: `${url}user/login`,
// //     data: {
// //       email,
// //       password,
// //     },
// //   });
// //   if (res.data.token) {
// //     const userId = res.data.userId;
// //     localStorage.setItem('user', JSON.stringify(res.data));
// //     localStorage.setItem('Token', res.data.token);
// //   }
// //   return res.data;
// // };

// // const register = (firstName, lastName, email, password) => {
// //   return axios({
// //     method: 'post',
// //     url: `${url}user/signup`,
// //     data: {
// //       firstName,
// //       lastName,
// //       email,
// //       password,
// //     },
// //   });
// // };

// // const getUser = () => {
// //   return JSON.parse(localStorage.getItem('user'));
// // };

// // const AuthService = {
// //   register,
// //   login,
// //   logout,
// //   getUser,
// // };

// // export default AuthService;
