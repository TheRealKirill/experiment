import React from 'react';
import { Redirect } from 'react-router-dom';
import Posts from './component/tape/Posts';
import Registration from './component/Registration/Registration';
import Entrance from './component/Entrance/Entrance';
import './style_tape.css';
import { Route } from 'react-router-dom';

const App = props => {
  return (
    <section className="section">
      <Route path="/tape" render={() => <Posts />} />
      <Route path="/registration" render={() => <Registration />} />
      <Route path="/entrance" render={() => <Entrance />} />
      {/*<Redirect from="/" to="/entrance" />*/}
    </section>
  );
};

export default App;
