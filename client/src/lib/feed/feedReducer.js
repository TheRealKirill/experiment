import {
  FEED_ADD_COMMENT,
  FEED_ESTIMATE_THIS_POST,
  FEED_SET_NEW_STATE,
  SET_TOTAL_COUNT,
} from './';

const initialState = {
  posts: [],
  infoComments: {},
  totalCount: null,
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_ADD_COMMENT: {
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
    case FEED_ESTIMATE_THIS_POST: {
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
    case FEED_SET_NEW_STATE: {
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
    case SET_TOTAL_COUNT: {
      return {
        ...state,
        totalCount: action.totalCount,
      };
    }
    default: {
      return state;
    }
  }
};

export default feedReducer;
