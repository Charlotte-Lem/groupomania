//import { EDIT_USER, GET_USER } from '../../Actions/userAction';
// import axios from 'axios';
// import { api } from '../../Utils/api';
const INITIAL_STATE = {
  userInfo: [],
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        userInfo: action.payload,
      };

    case 'EDIT_USER': {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
  }

  return state;
}
// export const getUser = (id, token) => {z
//   return async (dispatch) => {
//     try {
//       const res = await axios.get(`${api}/api/user/${id}`, {
//         headers: {
//           Authorization: 'Bearer ' + token,
//           'Content-Type': 'application/json',
//         },
//       });
//       dispatch({
//         type: 'GET_USER',
//         payload: res.data,
//       });
//     } catch (err) {
//       return console.log(err);
//     }
//   };
// };

// export const updateUser = (id, token) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.put(`${api}/api/user/${id}`, {
//         headers: {
//           Authorization: 'Bearer ' + token,
//           'Content-Type': 'application/json',
//         },
//       });
//       dispatch({
//         type: 'EDIT_USER',
//         payload: res.data,
//       });
//     } catch (err) {
//       return console.log(err);
//     }
//   };
// };
