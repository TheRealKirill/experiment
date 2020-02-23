import React from 'react';

const Registration = props => {
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
      {props.windowError && <p>этот Email уже занят</p>}
      <button> Зарегистрироваться </button>
    </form>
  );
};

export default Registration;
