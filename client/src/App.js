import React from 'react';
import { Redirect } from 'react-router-dom';
import PostContainer from './component/tape/PostContainer';
import RegistrationContainer from './component/Registration/RegistrationContainer';
import EntranceContainer from './component/Entrance/EntranceContainer';
import './style_tape.css';
import { Route } from 'react-router-dom';

const App = props => {
  return (
    <section className="section">
      <Route
        path="/tape"
        render={() => <PostContainer store={props.store} />}
      />
      <Route
        path="/registration"
        render={() => <RegistrationContainer store={props.store} />}
      />
      <Route
        path="/entrance"
        render={() => <EntranceContainer store={props.store} />}
      />
      {/*<Redirect from="/" to="/entrance" />*/}
    </section>
  );
};

export default App;
