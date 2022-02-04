import React, {useEffect}from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'; 
import UserDetail from '../UserDetail/UserDetail';
import MessageSendModal from '../MessageSendModal/MessageSendModal';

//MUI STUFF
import { Box, Button, TextField, ListItemAvatar, Avatar } from '@mui/material';

function SearchProfilesDetails() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const singleProfileReducer = useSelector((store)=> store.singleProfileReducer);
  const history = useHistory();
  const dispatch = useDispatch(); 
  const params = useParams();
  

  useEffect(() => {
    
    dispatch({
      type: 'FETCH_SINGLE_PROFILE',
      payload: params.id
    })
  }, [params.id])

  

  return (
    <div className="container">
      <ListItemAvatar>
        <Avatar
        sx={{ width: 200, height: 200 }}
        src={singleProfileReducer.photo} />
      </ListItemAvatar>
      <h3>
        {singleProfileReducer.first_name} {singleProfileReducer.last_name}
      </h3>
      <ul>
        <li>
          {singleProfileReducer.location_city},
          {singleProfileReducer.location_state}
        </li>
        <li>{singleProfileReducer.industry_name} </li>
        <li>{singleProfileReducer.email}</li>
        <li>
          {singleProfileReducer.linkedin}, {singleProfileReducer.twitter},
          {singleProfileReducer.instagram}, {singleProfileReducer.youtube},
          {singleProfileReducer.facebook}
        </li>
        <li>{singleProfileReducer.portfolio}</li>
        <li>{singleProfileReducer.about_me}</li>
      </ul>
      <button onClick={() => history.push(`/meeting/add/${params.id}`)}>Start Meeting</button>
      <button> Placeholder Send </button>
      {/* <MessageSendModal buttonText="Send Message" sendTo={params.id} /> */}
      
    </div>
  );
}


export default SearchProfilesDetails;