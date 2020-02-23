import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/posts_reducer';

import Entrance from './Entrance';
import { getCookiesId } from '../../api';

const EntranceContainer = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useState('');

  const eventInputEmail = event => {
    const { value } = event.target;
    setEmail(value);
  };

  const eventInputPassword = event => {
    const { value } = event.target;
    setPassword(value);
  };

  const eventForm = event => {
    event.preventDefault();
    props.loginUser(email, password);
  };

  getCookiesId().then(resolve => {
    setCookie(resolve.data);
  });

  if (cookie) return <Redirect to={'/tape'} />;

  return (
    <Entrance
      inputEmail={eventInputEmail}
      inputPassword={eventInputPassword}
      valueEmail={email}
      valuePassword={password}
      eventForm={eventForm}
      windowError={props.windowError}
    />
  );
};

const mapStateToProps = state => {
  return {
    windowError: state.posts.windowError,
    userId: state.posts.userId,
  };
};

export default connect(mapStateToProps, { loginUser })(EntranceContainer);
