// import axios from "axios";
// const API_URL = "http://localhost:5000/api/user/";

// const register = (email, password, firstName, lastName) => {
//   return axios.post(API_URL + "signup", {
//     firstName,
//     email,
//     lastName,
//     password,
//   });
// };
// const login = (email, password) => {
//   return axios
//     .post(API_URL + "login", {
//       email,
//       password,
//     })
//     .then((response) => {
//       if (response.data.token) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }
//       return response.data;
//     });
// };
// const logout = () => {
//   localStorage.removeItem("user");
// };
// export default {
//   register,
//   login,
//   logout,
// };
