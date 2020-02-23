import React, { useState } from 'react';

const NewComments = props => {
  const [text, setText] = useState('');

  const inputNewTextComment = event => {
    const { value } = event.target;
    setText(value);
  };

  const addComment = () => {
    props.setNewCommentThunk(
      text,
      props.idPosts,
      props.commentId,
      props.userId
    );
    setText('');
  };

  return (
    <div className="comment">
      <textarea
        onChange={inputNewTextComment}
        value={text}
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
