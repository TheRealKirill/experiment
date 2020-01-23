let initialState = {
  posts: [
    {
      postId: '1',
      infoPost: {
        data: '12.01.2019',
        background: 'red',
        liked: true,
        comments: [1, 3],
      },
    },
  ],
  infoComments: {
    1: {
      //обозначает postId
      id: 1,
      userId: 1,
      text: 'He',
    },
    2: {
      id: 2,
      userId: 1,
      text: 'oooooooooo',
    },
    3: {
      id: 3,
      userId: 1,
      text: 'Kirill',
    },
  },
  newCommentText: '',
};

const CASE_INPUT_NEW_COMMENT_TEXT = 'CASE-INPUT-NEW-COMMENT-TEXT';
const APPEND_NEW_COMMENT = 'APPEND-NEW-COMMENT';
const ESTIMATE_THIS_POST = 'ESTIMATE-THIS-POST';

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CASE_INPUT_NEW_COMMENT_TEXT:
      return {
        ...state,
        newCommentText: action.text,
      };

    case APPEND_NEW_COMMENT:
      return {
        ...state,
        posts: [
          {
            ...state.posts[action.idPosts - 1],
            infoPost: {
              ...state.posts[action.idPosts - 1].infoPost,
              comments: [
                ...state.posts[action.idPosts - 1].infoPost.comments,
                action.commentId,
              ],
            },
          },
        ],
        infoComments: {
          ...state.infoComments,
          [action.commentId]: action.odj,
        },
      };

    case ESTIMATE_THIS_POST:
      return {};

    default:
      return state;
  }
};

export const inputNewTextComment = text => ({
  type: CASE_INPUT_NEW_COMMENT_TEXT,
  text: text,
});

export const appendNewComment = (text, idPosts, commentId) => ({
  type: APPEND_NEW_COMMENT,
  odj: {
    id: commentId,
    userId: 1,
    text: text,
  },
  idPosts: idPosts,
  commentId: commentId,
});
