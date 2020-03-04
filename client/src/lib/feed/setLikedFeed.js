import { feedEventLike, requestLikedUser } from './';

const setLikedFeed = (userId, postId, liked) => {
  return async dispatch => {
    try {
      const resolve = await requestLikedUser(userId, postId, liked);
      dispatch(feedEventLike(resolve.data.postId, resolve.data.userId));
    } catch {
      console.log('-');
    }
  };
};

export default setLikedFeed;
