import React from "react";
import { Link } from "react-router-dom";
import './Login.scss';

const Login = () => {

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Login</span>
        <form action="/login" method='POST'>
          <input type="text" placeholder="username" name='username'/>
          <input type="password" placeholder="password" name='password'/>
          <button type='submit'>Sign in</button>
        </form>
        <p>You don't have an account? <Link to="/user/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;