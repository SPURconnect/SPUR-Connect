import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SocialIcons from '../SocialIcons/SocialIcons';

//MUI Stuff
import { styled } from '@mui/material/styles';

import { Grid, Switch, Stack, FormControlLabel, FormGroup, Box, Button, TextField, Typography, ListItemAvatar, Avatar } from '@mui/material';

function UserDetail({ profile }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const industries = useSelector((store) => store.industriesReducer);

  const indusObject = industries.filter(indus => (indus.id == profile.industry_id))

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
        color="secondary"
        inputProps={{ 'aria-label': 'ant design' }} />
    }
    else {
      return <Switch
        inputProps={{ 'aria-label': 'ant design' }} />
    }
  }

  return (
    <Grid container>
      {/* Row 1 */}
      {/* <Grid item xs={3}/> */}
      <Grid item xs={6} sx={{paddingLeft: '10px'}}>
        <ListItemAvatar>
          <Avatar
            sx={{ width: 175, height: 175 }}
            src={profile.photo} />
        </ListItemAvatar>
      </Grid>
      <Grid item xs={6}>
        <Grid>
          <Typography variant='h5' sx={{padding: '65px 0px 0px 40px', fontWeight: 'bold'}}>
            {profile.first_name} {profile.last_name}
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid item xs={3}/> */}
      {/*  */}

      {/* Row 2 */}
      <Grid item xs={3} />
      <Grid item xs={6} align="center">
        <h3>
          {/* {profile.first_name} {profile.last_name} */}
        </h3>
      </Grid>
      <Grid item xs={3} />
      {/*  */}

      {/* Row 2 */}
      <Grid item xs={.5} />
      <Grid item xs={4.5}>
        {indusObject[0].industry_name}
      </Grid>
      <Grid item xs={.5} />
      <Grid item xs={6} align="right">
        
        {profile.location_city + ', ' + profile.location_state}

      </Grid>
      <Grid item xs={.5} />
      {/*  */}

      <SocialIcons profile={profile} />

      {/* Row 3 */}
      <Grid item xs={.5} />
      <Grid item xs={11} >
        <Typography
            variant='body2'
            sx={{
              display: 'inline-block',
              margin: '0px 5px',
              color: 'gray',
            }}
          >
            About {profile.first_name}
          </Typography>
        <Box
          sx={{
            outline: 'rgb(169,169,169) solid 1px',
            minHeight: '20vh',
            width: '82vw',
            borderRadius: '5px',
            backgroundColor: 'white'
          }}
        >
          <Typography
            variant='body1'
            nowrap
            sx={{
              padding: '10px',
              overflow: 'auto',
            }}
          >
            {profile.about_me}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={.5} />
      {/*  */}

      {/* Row 4 */}
      {/* <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <GitHubIcon/> {profile.portfolio}
      </Grid>
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <YouTubeIcon/> {profile.youtube}
      </Grid>
      <Grid item xs={.5}/> */}

      {/*  */}

      {/* Row 5 */}
      {/* <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <FacebookIcon/> {profile.facebook}
      </Grid>
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <InstagramIcon/> {profile.instagram}
      </Grid>
      <Grid item xs={.5}/> */}

      {/*  */}

      {/* Row 6 */}
      {/* <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <LinkedInIcon/> {profile.linkedin}
      </Grid>
      <Grid item xs={.5}/>
      <Grid item xs={5.25} mt="15px">
        <TwitterIcon/> {profile.twitter}
      </Grid>
      <Grid item xs={.5}/>         */}


      {/* Row 8 */}
      <Grid item xs={1.5} />
      <Grid item xs={10}>
        <FormGroup onChange={(event) => setAvailability(event)}>
          <Stack direction="row" spacing={1} alignItems="center">
            <h4>Show in searches. <br />
              Allow meeting/messages.</h4>
            {setSwitch()}
          </Stack>
        </FormGroup>
      </Grid>
      <Grid item xs={.5} />
      {/*  */}

      {/* Row 9 */}
      <Grid item xs={.5} />
      <Grid
        item
        xs={11}
        sx={{
          textAlign: 'center',
          padding: '5px'
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={()=> history.push(`/user/edit`)}
          sx={{
            color: 'white'
          }}
        >
          Edit Profile
        </Button>
      </Grid>
      <Grid item xs={.5} />
      {/* <Grid item xs={5.25}>
        <LogOutButton 
          className="btn"
          style={{position: 'sticky', top: 'auto', bottom: 0}}
        />
      </Grid> */}

      {/* <Grid item xs={.5}/> */}
      {/*  */}

    </Grid>
  )
}

export default UserDetail;