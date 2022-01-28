import React, {useEffect}from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'; 

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const userProfile = useSelector((store)=> store.userProfileReducer)

  useEffect(() => {
    //Need to Get Courts and put it here
    dispatch({
      type: 'SAGA_FETCH_USER_PROFILES'
    })
  }, [])



  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
