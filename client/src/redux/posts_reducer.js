import {
  getUserLoginData,
  getDataUserRegistration,
  getCookiesId,
  exitForUser,
  getNextPortionPosts,
  setLikedUser,
  setNewComment,
} from '../api';

const initialState = {
  posts: [
    /*{ что примерно придет
      postId: '1',
      newCommentText: '', //
      infoPost: {
        data: '12.01.2019',
        background: 'red',
        liked: [1, 2],
        comments: [1, 3],
      },
    },*/
  ],
  infoComments: {
    /*1: { что примерно придет
      id: 1,
      userId: 1,
      text: 'He',
    },*/
  },
  windowError: false,
  userId: null,
  totalCount: null,
};

const APPEND_NEW_COMMENT = 'APPEND-NEW-COMMENT';
const ESTIMATE_THIS_POST = 'ESTIMATE-THIS-POST';
const SET_NEW_STATE = 'SET-NEW-STATE';
const CHANGE_WINDOW_ERROR = 'CHANGE-WINDOW-ERROR';
const SET_USER_ID = 'SET-USER-ID';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const CLEARING_STATE = 'CLEARING-STATE';

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_NEW_COMMENT: {
      const newListComment = state.posts.map(item => {
        if (item.postId === action.idPosts) {
          return {
            ...item,
            infoPost: {
              ...item.infoPost,
              comments: [...item.infoPost.comments, action.commentId],
            },
          };
        }
        return item;
      });

      return {
        ...state,
        posts: newListComment,
        infoComments: {
          ...state.infoComments,
          [action.commentId]: action.obj,
        },
      };
    }

    case ESTIMATE_THIS_POST: {
      const userId = action.payload.userId;
      const newListPosts = state.posts.map(post => {
        if (post.postId == action.payload.postId) {
          const liked = post.infoPost.liked.some(id =>
            id == userId ? true : false
          );
          if (liked) {
            const newArr = [...post.infoPost.liked];
            newArr.splice(newArr.indexOf(userId), 1);
            return {
              ...post,
              infoPost: {
                ...post.infoPost,
                liked: newArr,
              },
            };
          }
          return {
            ...post,
            infoPost: {
              ...post.infoPost,
              liked: [...post.infoPost.liked, userId],
            },
          };
        }
        return post;
      });
      return {
        ...state,
        posts: newListPosts,
      };
    }

    case SET_NEW_STATE: {
      const arrPosts =
        state.posts.length !== 0
          ? [...state.posts, ...action.dataPosts]
          : action.dataPosts;

      return {
        ...state,
        posts: arrPosts,
        infoComments: action.dataComments,
      };
    }

    case CHANGE_WINDOW_ERROR: {
      return {
        ...state,
        windowError: action.logic,
      };
    }

    case SET_USER_ID: {
      console.log(`userId:    ${action.userId}`);
      return {
        ...state,
        userId: action.userId,
      };
    }

    case SET_TOTAL_COUNT: {
      return {
        ...state,
        totalCount: action.totalCount,
      };
    }

    case CLEARING_STATE: {
      return {
        ...state,
        posts: null,
        infoComments: null,
      };
    }

    default:
      return state;
  }
};

export const appendNewComment = (text, idPosts, commentId, userId) => ({
  type: APPEND_NEW_COMMENT,
  obj: {
    id: commentId,
    userId: userId,
    text: text,
  },
  idPosts: idPosts,
  commentId: commentId,
  userId: userId,
});

export const eventLike = (postId, userId) => ({
  type: ESTIMATE_THIS_POST,
  payload: { postId, userId },
});

export const setNewState = (dataPosts, dataComments) => ({
  type: SET_NEW_STATE,
  dataPosts: dataPosts,
  dataComments: dataComments,
});

export const changeWindowError = logic => ({
  type: CHANGE_WINDOW_ERROR,
  logic: logic,
});

export const setUserId = userId => ({
  type: SET_USER_ID,
  userId: userId,
});

export const setTotalCount = totalCount => ({
  type: SET_TOTAL_COUNT,
  totalCount: totalCount,
});

export const clearingState = () => ({
  type: CLEARING_STATE,
});

export const setLikedUserThunk = (userId, postId, liked) => {
  return async dispatch => {
    try {
      const resolve = await setLikedUser(userId, postId, liked);
      dispatch(eventLike(resolve.data.postId, resolve.data.userId));
    } catch {
      console.log('-');
    }
  };
};

export const setNewCommentThunk = (text, idPosts, commentId, userId) => {
  return async dispatch => {
    try {
      const resolve = await setNewComment(text, idPosts, commentId);
      dispatch(appendNewComment(text, idPosts, commentId, userId));
    } catch {
      console.log('-');
    }
  };
};

export const getNextPortionPostsThunk = number => {
  return async dispatch => {
    const resolve = await getNextPortionPosts(number);
    dispatch(setUserId(resolve.data.userId));
    dispatch(setNewState(resolve.data.posts, resolve.data.infoComments));
    dispatch(setTotalCount(resolve.data.totalCount));
  };
};

export const loginUser = (email, password) => {
  return async dispatch => {
    try {
      const resolve = await getUserLoginData(email, password);
      dispatch(changeWindowError(false));
      dispatch(setUserId(resolve.data.id));
      window.location.replace(`http://localhost:3000/tape`);
    } catch {
      dispatch(changeWindowError(true));
    }
  };
};

export const registrUser = (email, password) => {
  return async dispatch => {
    try {
      const resolve = await getDataUserRegistration(email, password);
      dispatch(changeWindowError(false));
      dispatch(setUserId(resolve.data.id));
      window.location.replace(`http://localhost:3000/tape`);
    } catch {
      dispatch(changeWindowError(true));
    }
  };
};

export const getCookiesIdThunk = () => {
  return async dispatch => {
    const cookiesId = await getCookiesId();
    dispatch(setUserId(cookiesId.data));
  };
};

export const removeCookiesIdThunk = () => {
  return async dispatch => {
    const resolve = await exitForUser();
    if (resolve.data) {
      dispatch(setUserId(null));
      window.location.replace(`http://localhost:3000/entrance`);
    }
  };
};
