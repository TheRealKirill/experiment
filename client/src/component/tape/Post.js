import React from 'react';
import ContentContainer from './Content/ContentContainer';

const Post = props => {
  return (
    <>
      <ContentContainer
        key={props.id}
        store={props.store.infoPost}
        id={props.id}
        like={props.like}
        liked={props.liked}
      ></ContentContainer>
    </>
  );
};
export default Post;
