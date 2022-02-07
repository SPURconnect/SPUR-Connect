import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 

//MUI Stuff
import { styled } from '@mui/material/styles';
import { Grid, FormControlLabel, Switch, Stack, FormGroup, Box, Button, TextField, Typography, 
  ListItemAvatar, Avatar } from '@mui/material';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
////

function UserDetail ({profile}){
  const history = useHistory();
  const dispatch = useDispatch(); 

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({
      type: 'SAGA_FETCH_PROFILE_TO_EDIT',
      payload: user.id
    })
  }, [user.id])

  const setAvailability = (event) => {
    event.preventDefault();
    dispatch({
      type: "SAGA_EDIT_PROFILE_AVAILABILITY",
      payload: { availability: !profile.availability }
    });
  }

  const setSwitch = () => {
    if (profile.availability) {
      return <Switch 
        defaultChecked
        inputProps={{ 'aria-label': 'ant design' }} />
    }
    else {
      return <Switch 
        inputProps={{ 'aria-label': 'ant design' }} />
    }
  }

  return(
    <Grid container>
      {/* Row 1 */}
      <Grid item xs={3}/>
      <Grid item xs={6} mt="10px" align="center">
        <ListItemAvatar>
          <Avatar
          sx={{ width: 175, height: 175 }}
          src={profile.photo} />
        </ListItemAvatar>
      </Grid>
      <Grid item xs={3}/>
      {/*  */}

      {/* Row 2 */}
      <Grid item xs={3}/>
      <Grid item xs={6} align="center">
        <h3>
          {profile.first_name} {profile.last_name}
        </h3>
      </Grid>
      <Grid item xs={3}/>
      {/*  */}

      {/* Row 2 */}
      <Grid item xs={.5}/>
      <Grid item xs={4.5}>
        {profile.industry_name}
      </Grid>
      <Grid item xs={.5}/>
      <Grid item xs={6} align="right">
        {profile.location_city}, 
          {profile.location_state}
      </Grid>
      <Grid item xs={.5}/>
      {/*  */}

      {/* Row 3 */}
      <Grid item xs={.5}/>
      <Grid item xs={11} mt="15px">
        <TextField
        multiline
        label={`About ${profile.first_name}`}
        fullWidth
        value={profile.about_me}/>
      </Grid>
      <Grid item xs={.5}/>
      
      {/*  */}
    
      {/* Row 4 */}
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <GitHubIcon/> {profile.portfolio}
      </Grid>
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <YouTubeIcon/> {profile.youtube}
      </Grid>
      <Grid item xs={.5}/>
      
      {/*  */}

      {/* Row 5 */}
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <FacebookIcon/> {profile.facebook}
      </Grid>
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <InstagramIcon/> {profile.instagram}
      </Grid>
      <Grid item xs={.5}/>
      
      {/*  */}

      {/* Row 6 */}
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <LinkedInIcon/> {profile.linkedin}
      </Grid>
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <TwitterIcon/> {profile.twitter}
      </Grid>
      <Grid item xs={.5}/>        
      {/*  */}

      {/* Row 7 */}
      {/* <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <GitHubIcon/> {profile.portfolio}
      </Grid>
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        
      </Grid>
      <Grid item xs={.5}/>         */}
      
      {/*  */}

      {/* Row 8 */}
      <Grid item xs={.5}/>
      <Grid item xs={11}>
        <FormGroup onChange={(event) => setAvailability(event)}>
          <Stack direction="row" spacing={1} alignItems="center">
            <h4>Show in searches. <br/>
              Allow meeting/messages.</h4>
            {setSwitch()}
          </Stack>
        </FormGroup>
      </Grid>
      <Grid item xs={.5}/>
      {/*  */}
  
      {/* Row 9 */}
      <Grid item xs={.5}/>
      <Grid item xs={5.25}>
        <Button
          size="small"
          variant="contained"
          onClick={()=> history.push(`/edit/${profile.id}`)}
        >
          Edit Profile Info
        </Button>
      </Grid>
      <Grid item xs={.5}/>
      <Grid item xs={5.25}>
        <LogOutButton className="btn" />
      </Grid>
      
      <Grid item xs={.5}/>
      {/*  */}

    </Grid>
  )
}

export default UserDetail;