import { FEED_ADD_COMMENT } from './';

const feedAddComment = (text, idPosts, commentId, userId) => ({
  type: FEED_ADD_COMMENT,
  obj: {
    id: commentId,
    userId: userId,
    text: text,
  },
  idPosts: idPosts,
  commentId: commentId,
  userId: userId,
});

export default feedAddComment;
