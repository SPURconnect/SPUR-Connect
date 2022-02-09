import react from 'react';
import Facebook from './Facebook.png';
import Insta from './Insta.png';
import LinkedIn from './LinkedIn.png';
import Twitter from './Twitter.png';
import YouTube from './YouTube.png';
import Github from './Github.png';
import Facebook2 from './Facebook2.png';
import Insta2 from './Insta2.png';
import Linkedin2 from './Linkedin2.png';
import Twitter2 from './Twitter2.png';
import Youtube2 from './Youtube2.png';
import Github2 from './Github2.png';
import ExternalLink from './ExternalLink.png';

import './SocialIcons.css';

import { Grid } from '@mui/material';

export default function SocialIcons({profile}) {

  return(
    <Grid container sx={{textAlign: 'center', padding: '10px 0px 0px'}}>

      <Grid item xs={2} mt="10px">
        <a href={profile.portfolio}>
          <img className='socialIcons' size="80px" src={ExternalLink}/>
        </a>
      </Grid>
      <Grid item xs={2} mt="10px">
        <a href={profile.linkedin}>
          <img className='socialIcons' src={Linkedin2}/>
        </a>
      </Grid>
      <Grid item xs={2} mt="10px">
        <a href={profile.instagram}>
          <img className='socialIcons' src={Insta2}/>
        </a>
      </Grid>
      <Grid item xs={2} mt="10px">
        <a href={profile.facebook}>
          <img className='socialIcons' src={Facebook2}/>
        </a>
      </Grid>
      <Grid item xs={2} mt="10px">
        <a href={profile.twitter}>
          <img className='socialIcons' src={Twitter2}/>
        </a>
      </Grid>
      <Grid item xs={2} mt="10px">
        <a href={profile.youtube}>
          <img className='socialIcons' src={Youtube2}/>
        </a>
      </Grid>

    </Grid>
  )
};