const INITIAL_STATE = {
  userInfo: [],
};

function userReducer(state = INITIAL_STATE, action) {
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
    default:
      return state;
  }
}
export default userReducer;
