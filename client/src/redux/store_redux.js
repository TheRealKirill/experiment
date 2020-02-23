import { createStore, combineReducers, applyMiddleware } from 'redux';
import { postReducer } from './posts_reducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
  posts: postReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
