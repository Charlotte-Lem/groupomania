const INITIAL_STATE = {
  commentArray: [],
};

function commentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_CMT': {
      return {
        ...state,
        commentArray: action.payload,
      };
    }
    case 'POST_CMT': {
      const newArr = [...state.commentArray];
      newArr.unshift(action.payload);
      return {
        ...state,
        commentArray: newArr,
      };
    }
    case 'EDIT_CMT': {
      let newArr = [...state.commentArray];
      const findIndex = newArr.findIndex(
        (comment) => comment.id === action.payload.id
      );
      newArr[findIndex].message = action.payload.message;
      return {
        ...state,
        commentArray: newArr,
      };
    }
    case 'DELETE_CMT': {
      const commentArray = [...state.commentArray];
      let newArr = commentArray.filter((comment) => {
        return comment.id !== action.payload;
      });
      return {
        ...state,
        commentArray: newArr,
      };
    }
    default:
      return state;
  }
}

export default commentReducer;

