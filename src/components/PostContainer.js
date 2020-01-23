import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { inputNewTextComment, appendNewComment } from '../redux/posts_reducer';

let mapStateToProps = state => {
  return {
    state: state.posts,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    inputNewText: text => {
      dispatch(inputNewTextComment(text));
    },
    appendNewComment: (text, idPosts, commentId) => {
      dispatch(appendNewComment(text, idPosts, commentId));
    },
  };
};

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Post);
export default PostContainer;
