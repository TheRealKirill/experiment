import { FEED_ESTIMATE_THIS_POST } from './';

const feedEventLike = (postId, userId) => ({
  type: FEED_ESTIMATE_THIS_POST,
  payload: { postId, userId },
});

export default feedEventLike;
