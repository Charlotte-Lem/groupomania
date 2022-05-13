import axios from 'axios';
const url = 'http://localhost:5000/api/';
export function getRegister(email, password, firstName, lastName) {
  // const axios = require('axios').default

  let user = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };

  console.log(user);

  return axios
    .post(`${url}user/signup`, user)
    .then(function (response) {
      console.log(response);
      return true;
    })
    .catch(function (error) {
      console.log(error.message);
      return false;
    });
}
