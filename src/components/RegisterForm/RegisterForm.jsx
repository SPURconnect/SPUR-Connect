import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        location_city: location,      
      },
    });
  }; // end registerUser

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
        <label htmlFor="location">
          Location/City:<br></br>
          <input
            type="location"
            name="locaiton"
            value={location}
            required
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
      </div>

      <div><br></br>
        <label htmlFor="Industry">
        Industry:<br></br>
        </label>
          <input
            type="industry"
            name="industry"
            value={industry}
            required
            onChange={(event) => setIndustry(event.target.value)}
          />
        
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
      </center>
    </form>
  );
}

export default RegisterForm;
