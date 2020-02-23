import React from 'react';
import s from './Comment.module.css';

const Comment = props => {
  return (
    <div className={s.item}>
      <div className={s.avatar}></div>
      <div>
        <div>{props.nickName}</div>
        <div className={s.text}> {props.text} </div>
      </div>
    </div>
  );
};

export default Comment;
