import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material';

function LoginForm() {
  // hooks being used
  const dispatch = useDispatch();
  const history = useHistory();
  // reducers being used
  const errors = useSelector(store => store.errors);
  // pieces of state being used
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // on login dispatches the username and password to be checked, pushes the user to the 
    // search page and sets the where reducer to the search component
  const login = (event) => {
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
    history.push('/searchProfiles');
    dispatch({
      type: 'SET_WHERE',
      payload: 'searchProfiles'
    });
  }; // end login

  return (
    <div className="formPanel">
      <center>
        <>
          <h2 style={{ marginTop: '0px', color: '#2C373A' }}>Login</h2>
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
                sx={{
                  backgroundColor: 'white'
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <TextField
                type="password"
                label="Password"
                defaultValue="Default Value"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={{
                  backgroundColor: 'white',
                  margin: '10px 0px'
                }}
              />
            </label>
          </div>
          <div>
            <Button
              variant='contained'
              sx={{
                color: 'white',
                margin: '0px 5px 15px',
                display: 'block'
              }}
              onClick={() => login()}
            >
              Log In
            </Button>
            <Link
              style={{
                color: '#F26142',
                fontSize: '14px'
              }}
              to={'/registration'}
            >
              Don't have an account? Register here!
            </Link>
          </div>
        </>
      </center>
    </div>
  );
}

export default LoginForm;
