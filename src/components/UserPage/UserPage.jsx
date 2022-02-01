import React, {useEffect}from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import UserDetail from '../UserDetail/UserDetail';

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
      {/* To do: Need to figure out how to get the picture to render */}
      {userProfile.map((profile)=>{
        return <UserDetail key ={profile.id} profile={profile}/>
      })}

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
