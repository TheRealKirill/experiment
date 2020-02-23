import React from 'react';
import Content from './Content';
import { connect } from 'react-redux';
import { setLikedUserThunk } from '../../../redux/posts_reducer';

const ContentContainer = props => {
  const eventLike = () => {
    props.setLikedUserThunk(props.userId, props.id, props.liked);
  };

  return (
    <>
      <Content state={props.store} />
      <div className="likeWrapper">
        <div
          className="likeWrapper-like"
          style={{
            background: `no-repeat center/100% url(${props.like})`,
          }}
          onClick={eventLike}
        />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    state: state.posts,
    userId: state.posts.userId,
  };
};

export default connect(mapStateToProps, { setLikedUserThunk })(
  ContentContainer
);
