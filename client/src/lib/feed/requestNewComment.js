import instance from '../api';

const requestNewComment = (text, idPosts, commentId) => {
  return instance.patch(`setnewcomment`, { text, idPosts, commentId });
};

export default requestNewComment;
