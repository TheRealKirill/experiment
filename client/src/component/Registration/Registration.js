import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registrUser } from '../../redux/posts_reducer';
import { getCookiesId } from '../../api';

const Registration = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useState('');
  const dispatch = useDispatch();
  const windowError = useSelector(state => state.posts.windowError);

  useEffect(() => {
    getCookiesId().then(resolve => {
      setCookie(resolve.data);
    });
  }, []);

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
    dispatch(registrUser(email, password));
  };

  if (cookie) {
    return <Redirect to={'/tape'} />;
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
