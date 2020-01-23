import React from 'react';

const Content = props => {
  return (
    <div className="content">
      <p className="content-data">{props.data}</p>
      <div
        className="content-img"
        style={{ background: props.background }}
      ></div>
    </div>
  );
};

export default Content;
