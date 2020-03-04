import { SET_USER_ID } from './';

const setUserId = userId => ({
  type: SET_USER_ID,
  userId: userId,
});

export default setUserId;
