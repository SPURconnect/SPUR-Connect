import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Grid, Typography } from '@mui/material';

import './Nav.css';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
      {user.id ?
        <></>
        :
        <div className="nav">
          <h2 className="nav-title">SPUR Connect</h2>
          <AppBar
            position="fixed"
            color="info"
            sx={{
              bottom: 'auto',
              top: 0,
              height: '9%',
              minHeight: '70px'
            }}
          >
            <Grid
              container
              spacing={1}
              style={{
                margin: 'auto',
                paddingLeft: '10px'
              }}
            >
              <Grid item xs={6}>
                <Typography
                  variant='h5'
                  color='secondary'
                  sx={{
                    padding: '10px 0px'
                  }}
                >
                  SPUR Connect
                </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item
                xs={5}
                sx={{
                  float: 'right'
                }}
              >
              </Grid>
            </Grid>
          </AppBar>
        </div>
      }
    </>
  );
}

export default Nav;
