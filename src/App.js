import React from 'react';
import PostContainer from './components/PostContainer';
import './style_tape.css';

const App = props => {
  return (
    <section className="section">
      <PostContainer store={props.store} />
    </section>
  );
};

export default App;
