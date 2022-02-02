import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


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

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        location_city: city,
        location_state: state,
        location_zip: zip,
        industry_id:industry,
        first_name: firstName,
        last_name: lastName
      }
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
    <form className="formPanel" onSubmit={registerUser}>
      <center>
      <h2>Register</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label>
            <TextField
              id="outlined-helperText"
              label="Username"
              defaultValue="Default Value"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
        </label>
      </div>
      <div>
        <label>
            <br></br>
            <TextField
              id="outlined-helperText"
              label="Password"
              defaultValue="Default Value"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
        </label>
      </div>
        <div>
          <label>
            <br></br>
            <TextField
              id="outlined-helperText"
              label="First Name"
              defaultValue="Default Value"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <br></br>
            <TextField
              id="outlined-helperText"
              label="Last Name"
              defaultValue="Default Value"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>
      <div>
        <label>
            <br></br>
            <TextField
              id="outlined-helperText"
              label="Email"
              defaultValue="Default Value"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
        </label>
      </div>
      <div>
          <label>
            <br></br>
            <TextField
              id="outlined-helperText"
              label="Location/City"
              defaultValue="Default Value"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <br></br>
            <TextField
              id="outlined-helperText"
              label="Location/State"
              defaultValue="Default Value"
              value={state}
              onChange={(event) => setState(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <br></br>
            <TextField
              id="outlined-helperText"
              label="Location/Zip"
              defaultValue="Default Value"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
            />
          </label>
        </div>
        <div>
        <label htmlFor="Industry">
          <br></br>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Choose an Industry:
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'Industry',
                  id: 'uncontrolled-native',
                }}
                value={industry}
                onChange={(event) => chooseIndustry(event)}
              >
                <option disabled>Choose an Industry</option>
                {industriesReducer.map((industry) => {
                  return (
                    <option key={industry.id} value={industry.id}>{industry.industry_name}</option>
                  )
                })}
              </NativeSelect>
            </FormControl>
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
      </center>
    </form>
  );
}

export default RegisterForm;
