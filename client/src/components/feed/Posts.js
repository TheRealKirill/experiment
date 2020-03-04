import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCookiesId, setUserId } from '../../lib/user';
import {
  requestNextPortionPost,
  feedSetNewState,
  setTotalCount,
} from '../../lib/feed';

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

  const posts = useSelector(state => state.feed.posts);
  const infoComments = useSelector(state => state.feed.infoComments);
  const userId = useSelector(state => state.user.userId);
  const totalCount = useSelector(state => state.feed.totalCount);

  const getNextPortion = async function(number) {
    try {
      const resolve = await requestNextPortionPost(number);
      dispatch(setUserId(resolve.data.userId));
      dispatch(feedSetNewState(resolve.data.posts, resolve.data.infoComments));
      dispatch(setTotalCount(resolve.data.totalCount));
    } catch {}
  };

  useEffect(() => {
    if (inView || number < 3) {
      getNextPortion(number);
      if (number < totalCount || totalCount === null) {
        setNumber(number + 3);
      }
    }
  }, [inView]);

  const onClickExit = () => {
    dispatch(removeCookiesId());
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
