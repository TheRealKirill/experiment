import instance from '../api';

const requestUserRegistration = (email, password) => {
  return instance.post('registration', {
    email,
    password,
  });
};

export default requestUserRegistration;
