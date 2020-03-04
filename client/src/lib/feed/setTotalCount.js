import { SET_TOTAL_COUNT } from './';

const setTotalCount = totalCount => ({
  type: SET_TOTAL_COUNT,
  totalCount: totalCount,
});

export default setTotalCount;
