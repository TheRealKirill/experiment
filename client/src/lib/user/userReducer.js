import { SET_USER_ID } from './';

const initialState = {
  userId: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID: {
      console.log(`userId:    ${action.userId}`);
      return {
        ...state,
        userId: action.userId,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
