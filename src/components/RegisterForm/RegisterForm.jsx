import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [industry, setIndustry] = useState(1);
  const errors = useSelector((store) => store.errors);
  const industriesReducer = useSelector(store => store.industriesReducer);
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
        industry_name:industry
  
      },
    });
  }; // end registerUser

  const handleIndustryChange = (event) => {
    event.preventDefault();
    dispatch({
      type: 'SORT_BY_INDUSTRY',
      payload: event.target.value
    });
  }

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
        <label htmlFor="username">
          Username:<br></br>
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:<br></br>
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email:<br></br>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
          <label htmlFor="Location/City">
          Location/City:<br></br>
          <input
              type="Location/City"
              name="Location/City"
              value={city}
            required
              onChange={(event) => setCity(event.target.value)}
          />
        </label>
      </div>
        <div>
          <label htmlFor="Location/State">
            Location/State:<br></br>
            <input
              type="Location/State"
              name="Location/State"
              value={state}
              required
              onChange={(event) => setState(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Location/Zip">
            Location/Zip:<br></br>
            <input
              type="Location/Zip"
              name="Location/Zip"
              value={zip}
              required
              onChange={(event) => setZip(event.target.value)}
            />
          </label>
        </div>
      <div><br></br>
        <label htmlFor="Industry">
        Industry:<br></br>
          <select onChange={(event) => handleIndustryChange(event)}>
            <option disabled>Filter By Industry</option>
            {industriesReducer.map((industry) => {
              return (
                <option key={industry.id} value={industry.id}>{industry.industry_name}</option>
              )
            })}
            </select>
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
