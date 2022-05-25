const INITIAL_STATE = {
  userForm: [],
  // msgError: '',
};

function inputReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_REGISTER': {
      return {
        ...state,
        userForm: action.payload,
        // msgError: 'Erreur : Cette email existe déjà',
      };
    }
    case 'GET_LOGIN': {
      return {
        ...state,
        userForm: action.payload,
      };
    }
   

    default:
      return state;
  }
}

export default inputReducer;
