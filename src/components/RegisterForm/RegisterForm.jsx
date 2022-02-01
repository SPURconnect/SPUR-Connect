import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


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
          <label htmlFor="firstName">
            First Name:<br></br>
            <input
              type="firstName"
              name="firstName"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name:<br></br>
            <input
              type="lastName"
              name="lastName"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
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
      <div>
        <label htmlFor="Industry">
        Choose an Industry:<br></br>
            <select value={industry} onChange={(event) => chooseIndustry(event)}>
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
