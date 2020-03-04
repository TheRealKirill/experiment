import instance from '../api';

const requestUserLogin = (email, password) => {
  return instance.post('entrance', {
    email,
    password,
  });
};

export default requestUserLogin;
