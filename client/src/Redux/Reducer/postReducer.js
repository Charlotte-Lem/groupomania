const INITIAL_STATE = {
  postArray: [],
};

function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_POST': {
      return {
        ...state,
        postArray: action.payload,
      };
    }

    case 'NEW_POST': {
      //on créé un nouveau tableau avec tous ce qui existe déjà dans postArray : []
      const newArr = [...state.postArray];
      //unshift met un élément au début d'un tableau
      newArr.unshift(action.payload);
      //on retourne avec la propriété postArray qui va etre égal a newArr
      return {
        ...state,
        postArray: newArr,
      };
    }

    case 'DELETE_POST': {
      let newArr = [...state.postArray].filter((postId) => {
        return postId !== action.payload;
      });
      return {
        ...state,
        postArray: newArr,
      };
    }

    case 'UPDATE_POST': {
      let newArr = [...state.postArray];
      let findIndex = newArr.findIndex(
        (post) => post.postId === action.payload.postId
      );
      newArr[findIndex].description = action.payload.description;
      return {
        ...state,
        postArray: newArr,
      };
    }
    default:
      return state;
  }
}

export default postReducer;
