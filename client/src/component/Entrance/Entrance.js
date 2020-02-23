import React from 'react';

const Entrance = props => {
  return (
    <form onSubmit={props.eventForm}>
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        onChange={props.inputEmail}
        value={props.valueEmail}
      />
      <input
        name="password"
        type="password"
        required
        minLength="6"
        maxLength="20"
        placeholder="Your Password"
        onChange={props.inputPassword}
        value={props.valuePassword}
      />
      <a href="/registration">Зарегистрироваться</a>
      {props.windowError && <p>пароль или Email введен неверно</p>}
      <button> Вход </button>
    </form>
  );
};

export default Entrance;
