import { setUserId } from '../user';
import { feedSetNewState, setTotalCount, requestNextPortionPost } from './';

const getNextPortionPostsThunk = number => {
  return async dispatch => {
    const resolve = await requestNextPortionPost(number);
    dispatch(setUserId(resolve.data.userId));
    dispatch(feedSetNewState(resolve.data.posts, resolve.data.infoComments));
    dispatch(setTotalCount(resolve.data.totalCount));
  };
};

export default getNextPortionPostsThunk;
