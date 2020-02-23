import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registrUser } from '../../redux/posts_reducer';

import Registration from './Registration';
import { getCookiesId } from '../../api';

const RegistrationContainer = props => {
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
    props.registrUser(email, password);
  };

  getCookiesId().then(resolve => {
    setCookie(resolve.data);
  });

  if (cookie) return <Redirect to={'/tape'} />;

  return (
    <Registration
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
  };
};

export default connect(mapStateToProps, { registrUser })(RegistrationContainer);
