import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import './EditUserProfile.css'


function EditUserProfile (){

  const params = useParams();
  console.log('params:');
  console.log(params);
  const dispatch = useDispatch();
  const history = useHistory();
  const editProfile = useSelector((store) => store.editProfileReducer)

  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_PROFILE_TO_EDIT',
      payload: params.id
    })
  }, [params.id])

  console.log('!!!!!!! editProfile reducer', editProfile);

  const handleUpdateSubmit = (e)=>{
    e.preventDefault();
    dispatch({
      type: 'SAGA_EDIT_PROFILE_INFO',
      payload: {
        id: params.id, 
        email: editProfile.email, 
        first_name: editProfile.first_name,
        last_name: editProfile.last_name,
        photo: editProfile.photo,
        facebook: editProfile.facebook,
        linkedin: editProfile.linkedin,
        twitter: editProfile.twitter,
        youtube: editProfile.youtube,
        instagram: editProfile.instagram,
        portfolio: editProfile.portfolio,
        location_city: editProfile.location_city,
        location_zip: editProfile.location_zip,
        location_state: editProfile.location_state,
        location_state: editProfile.location_state,
        about_me: editProfile.about_me,
        industry_name: editProfile.industry_name
      }
    })
    history.push('/user')
  }
  const handlePhoto = (e) => {
    dispatch({
      type: 'SET_PHOTO',
      payload: e.target.value
    })
  }
  const handleEmail = (e) => {
    dispatch({
      type: 'SET_EMAIL',
      payload: e.target.value
    })
  }
  const handleFirstName = (e) => {
    dispatch({
      type: 'SET_FIRST_NAME',
      payload: e.target.value
    })
  }
  const handleLastName = (e) => {
    dispatch({
      type: 'SET_LAST_NAME',
      payload: e.target.value
    })
  }
  const handleLocationCity = (e) => {
    dispatch({
      type: 'SET_LOCATION_CITY',
      payload: e.target.value
    })
  }
  const handleLocationState = (e) => {
    dispatch({
      type: 'SET_LOCATION_STATE',
      payload: e.target.value
    })
  }
  const handleLocationZip = (e) => {
    dispatch({
      type: 'SET_LOCATION_ZIP',
      payload: e.target.value
    })
  }
  const handleIndustry = (e) => {
    dispatch({
      type: 'SET_INDUSTRY',
      payload: e.target.value
    })
  }
  
  const handleLinkedin = (e) => {
    dispatch({
      type: 'SET_LINKEDIN',
      payload: e.target.value
    })
  }
  const handleFacebook = (e) => {
    dispatch({
      type: 'SET_FACEBOOK',
      payload: e.target.value
    })
  }
  const handleTwitter = (e) => {
    dispatch({
      type: 'SET_TWITTER',
      payload: e.target.value
    })
  }
  const handleYouTube = (e) => {
    dispatch({
      type: 'SET_YOUTUBE',
      payload: e.target.value
    })
  }
  const handlePortfolio = (e) => {
    dispatch({
      type: 'SET_PORTFOLIO',
      payload: e.target.value
    })
  }
  const handleAboutMe = (e) => {
    dispatch({
      type: 'SET_ABOUT_ME',
      payload: e.target.value
    })
  }

  return(

    <div>
      <div>
        <img className ='photoSize'src={editProfile.photo} />
      </div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{ mt: 3 }}
      >
        <TextField
          placeholder="Photo-url"
          value={editProfile.photo}
          onChange={handlePhoto}
        />
      </Box>
      <div>
        <button onClick={handleUpdateSubmit}>Update</button>
        <button onClick={() => history.push('/user')}>Cancel</button>
      </div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{ mt: 3 }}
      >
        <TextField
          placeholder="Email"
          value={editProfile.email}
          onChange={handleEmail}
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
          placeholder="First Name"
          value={editProfile.first_name}
          onChange={handleFirstName}
        />
        <TextField
          placeholder="Last Name"
          value={editProfile.last_name}
          onChange={handleLastName}
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
          placeholder="City"
          value={editProfile.location_city}
          onChange = {handleLocationCity}
        />
        <TextField
          placeholder="State"
          value={editProfile.location_state}
          onChange={handleLocationState}
        />
        <TextField
          placeholder="Zip"
          value={editProfile.location_zip}
          onChange={handleLocationZip} 
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
          value={editProfile.industry_name}
          onChange={handleIndustry}
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
          value = {editProfile.linkedin}
          onChange = {handleLinkedin}
        />
        <TextField
          placeholder="Facebook"
          value={editProfile.facebook}
          onChange={handleFacebook}
        />
        <TextField
          placeholder="Twitter"
          value={editProfile.twitter}
          onChange={handleTwitter}
        />
        <TextField
          placeholder="YouTube"
          value={editProfile.youtube}
          onChange={handleYouTube}
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
          value = {editProfile.portfolio}
          onChange={handlePortfolio}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{ mt: 3 }}
      >
      <textarea
        aria-label="empty textarea"
        value = {editProfile.about_me}
        placeholder="About me"
        onChange={handleAboutMe}
        style={{ width: 200 }}
      />
      </Box>
     
    </div>
  )
}

export default EditUserProfile;