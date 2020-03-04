import instance from '../api';

const requestLikedUser = (userId, postId, liked) => {
  return instance.patch(`/postLikes?postId=${postId}`, { liked: liked });
};

export default requestLikedUser;
