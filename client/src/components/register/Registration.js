import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  requestUserRegistration,
  setUserId,
  requestCookiesId,
} from '../../lib/user';

const Registration = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useState('');
  const [windowError, setWindowError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    requestCookiesId().then(resolve => {
      setCookie(resolve.data);
    });
  }, []);

  const registion = async function(email, password) {
    try {
      const resolve = await requestUserRegistration(email, password);
      dispatch(setUserId(resolve.data.id));
      setWindowError(false);
      window.location.replace(`http://localhost:3000/feed`);
    } catch {
      setWindowError(true);
    }
  };

  const onChangeEmail = event => {
    const { value } = event.target;
    setEmail(value);
  };

  const onChangePassword = event => {
    const { value } = event.target;
    setPassword(value);
  };

  const onSubmitForm = event => {
    event.preventDefault();
    registion(email, password);
  };

  if (cookie) {
    return <Redirect to={'/feed'} />;
  }

  return (
    <form onSubmit={onSubmitForm}>
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        onChange={onChangeEmail}
        value={email}
      />
      <input
        name="password"
        type="password"
        required
        minLength="6"
        maxLength="20"
        placeholder="Your Password"
        onChange={onChangePassword}
        value={password}
      />
      {windowError && <p>этот Email уже занят</p>}
      <button> Зарегистрироваться </button>
    </form>
  );
};

export default Registration;
