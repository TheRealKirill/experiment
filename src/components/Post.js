import React from 'react';
import Content from './Content';
import NewComments from './NewComments';
import Comment from './Comment/Comment';

const Post = props => {
  const listComments = Object.keys(props.state.infoComments);
  const commentId = listComments.length + 1;

  let listComment = list => {
    return list.map(item => {
      return <Comment text={props.state.infoComments[item].text} />;
    });
  };

  return props.state.posts.map(item => {
    return (
      <div className="post">
        <Content
          id={item.postId}
          background={item.infoPost.background}
          data={item.infoPost.data}
        />
        <div className="likeWrapper">
          <div className="likeWrapper-like"></div>
        </div>
        <NewComments
          value={props.state.newCommentText}
          inputNewText={props.inputNewText}
          appendNewComment={props.appendNewComment}
          idPosts={item.postId}
          commentId={commentId}
        />
        {listComment(item.infoPost.comments)}
      </div>
    );
  });
};

export default Post;
