import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <center>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
                <TextField
                  type="text"
                  label="Username"
                  defaultValue="Default Value"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
        </label>
      </div>
      <div>
        <br></br>
        <label htmlFor="password">
            <TextField
              type="password"
              label="Password"
              defaultValue="Default Value"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
        <button
          type="button"
          className="btn"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
        
      </div>
      
      </center>
    </form>
  );
}

export default LoginForm;
