import React, { useState } from 'react';
import { setNewCommentThunk } from '../../../redux/posts_reducer';
import { useDispatch } from 'react-redux';

const NewComments = props => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onChangeNewComment = event => {
    const { value } = event.target;
    setText(value);
  };

  const addComment = () => {
    dispatch(
      setNewCommentThunk(text, props.idPosts, props.commentId, props.userId)
    );
    setText('');
  };

  return (
    <div className="comment">
      <textarea
        onChange={onChangeNewComment}
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
