import React, {useEffect}from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'; 

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const userProfile = useSelector((store)=> store.userProfileReducer)
  const history = useHistory();
  const dispatch = useDispatch(); 


  useEffect(() => {
    //Need to Get Courts and put it here
    dispatch({
      type: 'SAGA_FETCH_USER_PROFILES'
    })
  }, [])

  console.log('##### userProfile',userProfile);



  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {userProfile.map((profile)=>{
        return <ul key ={profile.id} value={profile.id}>
          {profile.first_name}  {profile.last_name}
          <li>{profile.location_city}, {profile.location_state}</li>
          {/* <li>{profile.industry}</li> todo: get industries from same GET route as userProfile or
          do a separate get for the industries?  */}
          <li>{profile.email}</li>
          <li>{profile.linkedin}</li>
          <li>{profile.portfolio}</li>
          <li>{profile.about_me}</li>
          
          </ul>
      })}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
