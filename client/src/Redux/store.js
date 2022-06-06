import { createStore, applyMiddleware, combineReducers } from 'redux';
import postReducer from './Reducer/postReducer';
import userReducer from './Reducer/userReducer';
import inputReducer from './Reducer/inputReducer';
import commentReducer from './Reducer/commentReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const rootReducer = combineReducers({
  postReducer,
  userReducer,
  inputReducer,
  commentReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
