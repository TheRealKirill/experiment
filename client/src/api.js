import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:4000/',
});

export const getUserLoginData = (email, password) => {
  return instance.post('entrance', {
    email: email,
    password: password,
  });
}; //LOGIN +

export const getDataUserRegistration = (email, password) => {
  return instance.post('registration', {
    email: email,
    password: password,
  });
}; //LOGIN +

export const getNextPortionPosts = number => {
  return instance.get(`portionPosts?number=${number}`);
}; //user

export const exitForUser = () => {
  return instance.get('end');
}; //LOGIN +

export const getCookiesId = () => {
  return instance.get('/getCookies');
}; //LOGIN

export const setLikedUser = (userId, postId, liked) => {
  return instance.patch(`/postLikes?postId=${postId}`, { liked: liked });
}; //user

export const setNewComment = (text, idPosts, commentId) => {
  return instance.patch(`setnewcomment`, { text, idPosts, commentId });
}; //user
