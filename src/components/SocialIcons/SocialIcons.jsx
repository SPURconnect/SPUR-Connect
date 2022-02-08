import react from 'react';
import Facebook from './Facebook.png';
import Insta from './Insta.png';
import LinkedIn from './LinkedIn.png';
import Twitter from './Twitter.png';
import YouTube from './YouTube.png';

import { Link, Grid } from '@mui/material';

export default function SocialIcons({profile}) {

  return(
    <Grid container>

      <Grid item xs={2}>
        {/* <a href={profile.portfolio}>
          <img src={Facebook}/>
        </a> */}
      </Grid>
      <Grid item xs={2}>
        <a href={profile.linkedin}>
          <img src={LinkedIn}/>
        </a>
      </Grid>
      <Grid item xs={2}>
        <a href={profile.instagram}>
          <img src={Insta}/>
        </a>
      </Grid>
      <Grid item xs={2}>
        <a href={profile.facebook}>
          <img src={Facebook}/>
        </a>
      </Grid>
      <Grid item xs={2}>
        <a href={profile.twitter}>
          <img src={Twitter}/>
        </a>
      </Grid>
      <Grid item xs={2}>
        <a href={profile.youtube}>
          <img src={YouTube}/>
        </a>
      </Grid>

    </Grid>
  )
};