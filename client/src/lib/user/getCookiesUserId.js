import { setUserId, requestCookiesId } from './';

const getCookiesUserId = () => {
  return async dispatch => {
    const cookiesId = await requestCookiesId();
    dispatch(setUserId(cookiesId.data));
  };
};

export default getCookiesUserId;
