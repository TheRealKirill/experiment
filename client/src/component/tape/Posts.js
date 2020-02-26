import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeCookiesIdThunk,
  getNextPortionPostsThunk,
} from '../../redux/posts_reducer';

import { useInView } from 'react-intersection-observer';
import Content from './Content/Content';
import NewComments from './Comment/NewComments';
import Comment from './Comment/Comment';
import likeTrye from './img/true.svg';
import likeFalse from './img/false.svg';

const Posts = props => {
  const [number, setNumber] = useState(0);
  const [ref, inView, entry] = useInView({ triggerOnce: true });
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const infoComments = useSelector(state => state.posts.infoComments);
  const userId = useSelector(state => state.posts.userId);
  const totalCount = useSelector(state => state.posts.totalCount);

  useEffect(() => {
    if (inView || number < 3) {
      dispatch(getNextPortionPostsThunk(number));
      if (number < totalCount || totalCount === null) {
        setNumber(number + 3);
      }
    }
  }, [inView]);

  const onClickExit = () => {
    dispatch(removeCookiesIdThunk());
  };

  const listComment = (list, userId) => {
    return list.map(id => {
      const comment = infoComments[id];
      return (
        <Comment
          key={comment.id}
          text={comment.text}
          idComment={id}
          nickName={comment.userId}
          userId={userId}
        />
      );
    });
  };

  const listPosts = () => {
    return posts.map((item, index, arr) => {
      const like = item.infoPost.liked.some(i => (i == userId ? true : false));
      return (
        <div className="post" key={item.postId}>
          <div ref={index === arr.length - 1 ? ref : undefined}></div>
          <Content
            key={item.postId}
            store={item.infoPost}
            id={item.postId}
            like={like ? likeTrye : likeFalse}
            liked={like ? true : false}
          ></Content>

          <NewComments
            idPosts={item.postId}
            commentId={Object.keys(infoComments).length + 1}
            userId={userId}
          />
          {listComment(item.infoPost.comments, userId)}
        </div>
      );
    });
  };

  return (
    <>
      <button onClick={onClickExit}>выход</button>
      {listPosts()}
    </>
  );
};

export default Posts;
