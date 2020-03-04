import instance from '../api';

const requestNextPortionPost = number => {
  return instance.get(`portionPosts?number=${number}`);
};

export default requestNextPortionPost;
