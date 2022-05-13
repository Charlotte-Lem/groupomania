const INITIAL_STATE = {
  postArray: [
    
  ],
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

    case 'DELIMG_POST': {
      let newArr = [...state.postArray];
      let findIndex = newArr.findIndex(
        (post) => post.postId === action.payload.postId
      );
      newArr[findIndex].imagePost = '';
      return {
        ...state,
        postArray: newArr,
      };
    }

    // case 'LIKE': {
    //     const newArr = [...state.postArray]
    //     const findIndex = newArr.findIndex(post => post.postId === action.payload.postId)
    //     let userLikeArr = JSON.parse(newArr[findIndex].userLike)
    //     userLikeArr.push(action.payload.userId)
    //     newArr[findIndex].userLike = JSON.stringify(userLikeArr)
    //     newArr[findIndex].countLike = newArr[findIndex].countLike + 1
    //     console.log(newArr)
    //     return {
    //         ...state,
    //         postArray: newArr
    //     }
    // }

    // case 'DISLIKE': {
    //     const newArr = [...state.postArray]
    //     const findIndex = newArr.findIndex(post => post.postId === action.payload.postId)
    //     let userLikeArr = JSON.parse(newArr[findIndex].userLike)
    //     const filterArr = userLikeArr.filter(p => {
    //         return p === action.payload.userId
    //     })
    //     newArr[findIndex].userLike = JSON.stringify(filterArr)
    //     newArr[findIndex].countLike = newArr[findIndex].countLike - 1
    //     console.log(newArr)
    //     return {
    //         ...state,
    //         postArray: newArr
    //     }
    // }
  }

  return state;
}

export default postReducer;
