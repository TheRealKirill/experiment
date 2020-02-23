import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  removeCookiesIdThunk,
  getNextPortionPostsThunk,
  setNewCommentThunk,
} from '../../redux/posts_reducer';

import { useInView } from 'react-intersection-observer';

import Post from './Post';
import NewComments from './Comment/NewComments';
import Comment from './Comment/Comment';
import likeTrye from './img/true.svg';
import likeFalse from './img/false.svg';

const PostContainer = props => {
  const [number, setNumber] = useState(0);
  const [ref, inView, entry] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView || number < 3) {
      props.getNextPortionPostsThunk(number);
      if (number < props.totalCount || props.totalCount === null) {
        setNumber(number + 3);
      }
    }
  }, [inView]);

  const eventClickExit = () => {
    props.removeCookiesIdThunk();
  };

  const listComment = (list, userId) => {
    return list.map(id => {
      const comment = props.infoComments[id];
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
    return props.posts.map((item, index, arr) => {
      const like = item.infoPost.liked.some(i =>
        i == props.userId ? true : false
      );
      return (
        <div className="post" key={item.postId}>
          <div ref={index === arr.length - 1 ? ref : undefined}></div>
          <Post
            store={item}
            like={like ? likeTrye : likeFalse}
            id={item.postId}
            liked={like ? true : false}
            //ref={index === arr.length - 1 ? ref : undefined}
          />

          <NewComments
            setNewCommentThunk={props.setNewCommentThunk}
            idPosts={item.postId}
            commentId={Object.keys(props.infoComments).length + 1}
            userId={props.userId}
          />
          {listComment(item.infoPost.comments, props.userId)}
        </div>
      );
    });
  };

  return (
    <>
      <button onClick={eventClickExit}>выход</button>
      {listPosts()}
    </>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    infoComments: state.posts.infoComments,
    userId: state.posts.userId,
    totalCount: state.posts.totalCount,
  };
};

export default connect(mapStateToProps, {
  removeCookiesIdThunk,
  getNextPortionPostsThunk,
  setNewCommentThunk,
})(PostContainer);
