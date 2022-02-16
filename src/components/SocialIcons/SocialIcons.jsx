import react from 'react';
import Facebook2 from './Facebook2.png';
import Insta2 from './Insta2.png';
import Linkedin2 from './Linkedin2.png';
import Twitter2 from './Twitter2.png';
import Youtube2 from './Youtube2.png';
import ExternalLink from './ExternalLink.png';

import './SocialIcons.css';

import { Grid } from '@mui/material';

// this component is called in the users profile page and the profiles of other users
  // the icons are center justified and will only display if a value is given

export default function SocialIcons({ profile }) {

  return (
    <Grid container justifyContent='center' sx={{ textAlign: 'center', padding: '10px 0px 0px' }}>
      {profile.portfolio &&
        <Grid item xs={2} mt="10px">
          <a href={profile.portfolio}>
            <img className='socialIcons' src={ExternalLink} />
          </a>
        </Grid>
      }
      {profile.linkedin &&
        <Grid item xs={2} mt="10px">
          <a href={profile.linkedin}>
            <img className='socialIcons' src={Linkedin2} />
          </a>
        </Grid>
      }
      {profile.instagram &&
        <Grid item xs={2} mt="10px">
          <a href={profile.instagram}>
            <img className='socialIcons' src={Insta2} />
          </a>
        </Grid>
      }
      {profile.facebook &&
        <Grid item xs={2} mt="10px">
          <a href={profile.facebook}>
            <img className='socialIcons' src={Facebook2} />
          </a>
        </Grid>
      }
      {profile.twitter &&
        <Grid item xs={2} mt="10px">
          <a href={profile.twitter}>
            <img className='socialIcons' src={Twitter2} />
          </a>
        </Grid>
      }
      {profile.youtube &&
        <Grid item xs={2} mt="10px">
          <a href={profile.youtube}>
            <img className='socialIcons' src={Youtube2} />
          </a>
        </Grid>
      }
    </Grid>
  )
};