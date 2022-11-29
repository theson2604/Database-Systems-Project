import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service";
import { TextField } from "@mui/material";
import './Login.scss';

function Login ({tokener, setToken}) {
  useEffect(() => {
    if (tokener) {
      navigate("/db")
    }
    console.log(tokener)
  })
  const navigate = useNavigate()
  const [state, setState] = useState(false)
  const [username, setUseranme] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = await loginUser({
      username,
      password
    });
    if (!token.token)
      setState(true)
    else 
      console.log(token.token)
      setToken(token)
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Login</span>
        {state && <div style={{corlor: 'red'}}>Login failed</div>}
        <form onSubmit={handleSubmit}>
        <TextField
                id={!state ? "outlined-basic" : "outlined-error-helper-text"}
                variant="outlined"
                error = {state}
               
                label="Username"
                onChange={e => setUseranme(e.target.value)}
                helperText={state && "Incorrect"}
            />
          <TextField
                id={!state ? "outlined-basic" : "outlined-error-helper-text"}
                variant="outlined"
                error = {state}
                
                label="Password"
                onChange={e => setPassword(e.target.value)}
                helperText={state && "Incorrect"}
            />
          {/* <input type="text" placeholder="username" name='username' onChange={}/>
          <input type="password" placeholder="password" name='password' onChange={}/> */}
          <button type='submit'>Sign in</button>
        </form>
        <p>You don't have an account? <Link to="/user/register">Register</Link></p>
      </div>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;