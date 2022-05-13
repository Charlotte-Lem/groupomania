import { createStore, applyMiddleware, combineReducers } from 'redux';
import postReducer from './Reducer/postReducer';
import userReducer from './Reducer/userReducer';
import inputReducer from './Reducer/inputReducer';
import thunk from 'redux-thunk';

//devtools

import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  postReducer,
  userReducer,
  inputReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
