import { requestUserExit, setUserId } from './';

const removeCookiesIdThunk = () => {
  return async dispatch => {
    const resolve = await requestUserExit();
    if (resolve.data) {
      dispatch(setUserId(null));
      window.location.replace(`http://localhost:3000/login`);
    }
  };
};

export default removeCookiesIdThunk;
