import instance from '../api';

const requestCookiesId = () => {
  return instance.get('/getCookies');
};

export default requestCookiesId;
