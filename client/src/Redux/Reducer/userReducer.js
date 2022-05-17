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
