import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 

function UserDetail ({profile}){
  const history = useHistory();
  const dispatch = useDispatch(); 


  return(
    <div>
      <img src={profile.photo}/>
      <h3>{profile.first_name}  {profile.last_name}</h3>
      <ul>
        <li>{profile.location_city}, {profile.location_state}</li>
        <li>{profile.industry_name} </li>
        <li>{profile.email}</li>
        <li>{profile.linkedin}, {profile.twitter}, {profile.instagram}, {profile.youtube}, {profile.facebook}</li>
        <li>{profile.portfolio}</li>
        <li>{profile.about_me}</li>
      </ul>

    <div>
      <button onClick={()=> history.push(`/edit/${profile.id}`)}>Edit Profile Information</button>
    </div>
    </div>
  )
}

export default UserDetail;