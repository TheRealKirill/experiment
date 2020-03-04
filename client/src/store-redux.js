import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { userReducer } from './lib/user';
import { feedReducer } from './lib/feed';

const reducers = combineReducers({
  feed: feedReducer,
  user: userReducer,
});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
