import React from 'react';

const Content = props => {
  return (
    <div className="content">
      <p className="content-data">{props.state.data}</p>
      <p className="content-text">{props.state.contentText}</p>
      <div
        className="content-img"
        style={{ background: props.state.background }}
      ></div>
    </div>
  );
};

export default Content;
