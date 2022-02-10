import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar, Button, Grid, Typography } from '@mui/material';

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
                {/* If no user is logged in, show these links */}
                {/* {!user.id && (
                  // If there's no user, show login/registration links
                  <Button 
                    to="/login" 
                    size='small' 
                    sx={{ 
                      color: '#e3e9e9', 
                      margin: '10px 10px 0px 0px'
                    }}
                  >
                    Login / Register
                  </Button>
                )} */}
              </Grid>
            </Grid>
          </AppBar>
        </div>
      }
    </>
  );
}

export default Nav;
