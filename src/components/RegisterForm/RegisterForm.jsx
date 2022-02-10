import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Link } from 'react-router-dom';
import { Button, Input } from '@mui/material';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [industry, setIndustry] = useState(1);
  const errors = useSelector((store) => store.errors);
  const industriesReducer = useSelector((store) => store.industriesReducer);
  const dispatch = useDispatch();

  const registerUser = () => {
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        location_city: city,
        location_state: state,
        location_zip: zip,
        industry_id: industry,
        first_name: firstName,
        last_name: lastName
      }
    });
    dispatch({
      type: 'SET_WHERE',
      payload: 'user'
    });
  }; // end registerUser

  useEffect(() => {
    dispatch({ type: 'FETCH_INDUSTRIES' })
  }, []);

  function chooseIndustry(event) {
    event.preventDefault();
    setIndustry(event.target.value)
  };

  return (
    <div className="formPanelRegister">
      <center>
        <h2 style={{ marginTop: '0px', color: '#2C373A' }}>Register</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div>
          <label>
            <TextField
              label="Username"
              defaultValue="Default Value"
              value={username}
              sx={{
                backgroundColor: 'white'
              }}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              sx={{
                mt: 1,
                backgroundColor: 'white'
              }}
              label="Password"
              type='password'
              defaultValue="Default Value"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              label="First Name"
              defaultValue="Default Value"
              sx={{
                mt: 1,
                backgroundColor: 'white'
              }}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              label="Last Name"
              defaultValue="Default Value"
              sx={{
                mt: 1,
                backgroundColor: 'white'
              }}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              label="Email"
              defaultValue="Default Value"
              sx={{
                mt: 1,
                backgroundColor: 'white'
              }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              label="City"
              defaultValue="Default Value"
              sx={{
                mt: 1,
                backgroundColor: 'white'
              }}
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              label="State"
              defaultValue="Default Value"
              sx={{
                mt: 1,
                backgroundColor: 'white'
              }}
              value={state}
              onChange={(event) => setState(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <TextField
              label="ZIP"
              defaultValue="Default Value"
              value={zip}
              sx={{
                mt: 1,
                backgroundColor: 'white'
              }}
              onChange={(event) => setZip(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Industry">
            <FormControl
              fullWidth
              sx={{ alignItems: "center", padding: "10px", mt: 1 }}
            >
              Choose an Industry:
              <NativeSelect
                sx={{
                  mt: 1,
                  backgroundColor: "white",
                  padding: "5px 2px 5px 12px",
                }}
                defaultValue={30}
                inputProps={{
                  name: "Industry",
                }}
                value={industry}
                onChange={(event) => chooseIndustry(event)}
              >
                <option disabled>Choose an Industry</option>
                {industriesReducer.map((industry) => {
                  return (
                    <option key={industry.id} value={industry.id}>
                      {industry.industry_name}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
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
            onClick={() => registerUser()}
          >
            Register
          </Button>        </div>
        <Link
          style={{
            color: '#F26142',
            fontSize: '14px'
          }}
          to={'/login'}
        >
          Already have an account? Login here!
        </Link>
      </center>
    </div>
  );
}

export default RegisterForm;
