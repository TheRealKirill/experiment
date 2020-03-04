import instance from '../api';

const requestUserExit = () => {
  return instance.get('end');
};

export default requestUserExit;
