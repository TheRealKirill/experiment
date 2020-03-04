import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestUserLogin, setUserId, requestCookiesId } from '../../lib/user';

const Entrance = props => {
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

  const logIn = async function(email, password) {
    try {
      const resolve = await requestUserLogin(email, password);
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
    logIn(email, password);
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
      <a href="/register">Зарегистрироваться</a>
      {windowError && <p>пароль или Email введен неверно</p>}
      <button> Вход </button>
    </form>
  );
};

export default Entrance;
