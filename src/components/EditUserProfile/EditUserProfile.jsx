import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';


function EditUserProfile (){

  const params = useParams();
  console.log('params:');
  console.log(params);
  const dispatch = useDispatch();

  const editProfile = useSelector((store) => store.editProfileReducer)

  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_PROFILE_TO_EDIT',
      payload: params.id
    })
  }, [params.id])

  const handleUpdateSubmit = (e)=>{
    e.preventDefault();
    dispatch({
      type: 'SAGA_EDIT_PROFILE_INFO',
      payload: {
        id: params.id, 
        email: editProfile.email, 
        photo: editProfile.photo,
        facebook: editProfile.facebook,
        linkedin: editProfile.linkedin,
        twitter: editProfile.twitter,
        youtube: editProfile.youtube,
        portfolio: editProfile.portfolio,
        location_city: editProfile.location_city,
        location_state: editProfile.location_state,
        about_me: editProfile.about_me,
        industry: editProfile.industry_name
      }
    })
    history.push('/user')
  }

  return(

    <div>
      
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{ mt: 3 }}
      >
        <TextField
          placeholder="Name"
          value
          onChange
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{ mt: 3 }}
      >
        <TextField
          placeholder="Location"
          value
          onChange
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{ mt: 3 }}
      >
        <TextField
          placeholder="Industry"
          value
          onChange
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{ mt: 3 }}
      >
        <TextField
          placeholder="Email"
          value
          onChange
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{ mt: 3 }}
      >
        <TextField
          placeholder="Linkedin"
          value
          onChange
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{ mt: 3 }}
      >
        <TextField
          placeholder="Portfolio"
          value
          onChange
        />
      </Box>
      <textarea
        aria-label="empty textarea"
        value
        placeholder="About me"
        onChange
        style={{ width: 200 }}
      />
      
      <button onClick={handleUpdateSubmit}>Update</button>
      <button onClick={() => history.push('/user')}>Cancel</button>
    </div>
  )
}

export default EditUserProfile;