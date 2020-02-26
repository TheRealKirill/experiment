import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLikedUserThunk } from '../../../redux/posts_reducer';

const Content = props => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.posts.userId);

  const onClickLike = () => {
    dispatch(setLikedUserThunk(userId, props.id, props.liked));
  };

  return (
    <>
      <div className="content">
        <p className="content-data">{props.store.data}</p>
        <p className="content-text">{props.store.contentText}</p>
        <div
          className="content-img"
          style={{ background: props.store.background }}
        ></div>
      </div>
      <div className="likeWrapper">
        <div
          className="likeWrapper-like"
          style={{
            background: `no-repeat center/100% url(${props.like})`,
          }}
          onClick={onClickLike}
        />
      </div>
    </>
  );
};

export default Content;
