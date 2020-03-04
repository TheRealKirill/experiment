import { feedAddComment, requestNewComment } from './';

const setNewCommentFeed = (text, idPosts, commentId, userId) => {
  return async dispatch => {
    try {
      const resolve = await requestNewComment(text, idPosts, commentId);
      dispatch(feedAddComment(text, idPosts, commentId, userId));
    } catch {
      console.log('-');
    }
  };
};

export default setNewCommentFeed;
