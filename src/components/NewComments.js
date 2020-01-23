import React from 'react';

const NewComments = props => {
  const inputNewTextComment = event => {
    let text = event.target.value;

    props.inputNewText(text);
  };

  const addComment = () => {
    props.appendNewComment(props.value, props.idPosts, props.commentId);
    props.inputNewText('');
  };

  return (
    <div className="comment">
      <textarea
        onChange={inputNewTextComment}
        value={props.value}
        className="comment-input"
      ></textarea>
      <button onClick={addComment} className="comment-button">
        {' '}
        оставить коммент
      </button>
    </div>
  );
};

export default NewComments;
