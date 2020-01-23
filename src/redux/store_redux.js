import { createStore, combineReducers } from 'redux';
import { postReducer } from './posts_reducer';

let reducers = combineReducers({
  posts: postReducer,
});

let store = createStore(reducers);

export default store;
