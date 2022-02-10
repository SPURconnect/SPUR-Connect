import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SocialIcons from '../SocialIcons/SocialIcons';
import MessageSendModal from '../MessageSendModal/MessageSendModal';

//MUI STUFF
import { Grid, Typography, Box, Button, TextField, ListItemAvatar, Avatar } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
/////

function SearchProfilesDetails() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const singleProfileReducer = useSelector((store) => store.singleProfileReducer);
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
    <>
      <Button
        onClick={() => history.goBack()}
      // color='secondary'
      >
        <ArrowBackOutlinedIcon sx={{ padding: '10px' }} /> Back
      </Button>
      <Grid container sx={{marginBottom: '10px'}}>
        {/* Row 1 */}
        <Grid item xs={3} />
        <Grid item xs={6} mt="10px" align="center">
          <ListItemAvatar>
            <Avatar
              sx={{ width: 175, height: 175 }}
              src={singleProfileReducer.photo} />
          </ListItemAvatar>
        </Grid>
        <Grid item xs={3} />
        {/*  */}

        {/* Row 2 */}
        <Grid item xs={3} />
        <Grid item xs={6} align="center">
          <h3>
            {singleProfileReducer.first_name} {singleProfileReducer.last_name}
          </h3>
        </Grid>
        <Grid item xs={3} />
        {/*  */}

        {/* Row 2 */}
        <Grid item xs={.5} />
        <Grid item xs={4.5} align="center">
          {singleProfileReducer.industry_name}
        </Grid>
        <Grid item xs={.5} />
        <Grid item xs={6} align="right">
          {`${singleProfileReducer.location_city},
          ${singleProfileReducer.location_state}`}
        </Grid>
        <Grid item xs={.5} />
        {/*  */}

        {/* Row 3 */}
        <Grid item xs={.5} />

        <Grid item xs={5.25} mt="15px" align="center">
          <Button
            variant="contained"
            size="small"
            onClick={() => history.push(`/meeting/add/${params.id}`)}
            sx={{
              color: 'white'
            }}
          > Invite to Meet
          </Button>
        </Grid>

        <Grid item xs={.5} />

        <Grid item xs={5.25} mt="15px" align="center">
          <MessageSendModal buttonText="Say Hello" sendTo={params} />
        </Grid>

        <Grid item xs={.5} />
        {/*  */}
        <SocialIcons profile={singleProfileReducer} />
        {/* Row 4 */}
        <Grid item xs={.5} />
        <Grid item xs={11} mt="15px">
          <TextField
            multiline
            // label={`About ${singleProfileReducer.first_name}`}
            fullWidth
            value={singleProfileReducer.about_me}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </Grid>
        <Grid item xs={.5} />

        {/*  */}

        {/* Row 5 */}
        {/* <Grid item xs={.5} />
      <Grid item xs={5.25} mt="15px">
        <GitHubIcon />
        {singleProfileReducer.portfolio}
      </Grid>
      <Grid item xs={.5} />
      <Grid item xs={5.25} mt="15px">
        <YouTubeIcon />
        {singleProfileReducer.youtube}
      </Grid>
      <Grid item xs={.5} /> */}
        {/*  */}

        {/* Row 6 */}
        {/* <Grid item xs={.5} />
      <Grid item xs={5.25} mt="15px">
        <FacebookIcon />
        {singleProfileReducer.facebook}
      </Grid>
      <Grid item xs={.5} />
      <Grid item xs={5.25} mt="15px">
        <InstagramIcon />
        {singleProfileReducer.instagram}
      </Grid>
      <Grid item xs={.5} /> */}
        {/*  */}

        {/* Row 7 */}
        {/* <Grid item xs={.5} />
      <Grid item xs={5.25} mt="15px">
        <LinkedInIcon />
        {singleProfileReducer.linkedin}
      </Grid>
      <Grid item xs={.5} />
      <Grid item xs={5.25} mt="15px">
        <TwitterIcon />
        {singleProfileReducer.twitter}
      </Grid>
      <Grid item xs={.5} /> */}
        {/*  */}

        {/* Row 8 */}
        {/* <Grid item xs={.5} />
      <Grid item xs={5.25} mt="15px">
        <GitHubIcon />
        {singleProfileReducer.portfolio}
      </Grid>
      <Grid item xs={.5} />
      <Grid item xs={5.25} mt="15px">

      </Grid>
      <Grid item xs={.5} /> */}

        {/*  */}
      </Grid>
    </>
  );
}


export default SearchProfilesDetails;