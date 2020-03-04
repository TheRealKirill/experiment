import { FEED_SET_NEW_STATE } from './';

const feedSetNewState = (dataPosts, dataComments) => ({
  type: FEED_SET_NEW_STATE,
  dataPosts: dataPosts,
  dataComments: dataComments,
});

export default feedSetNewState;
