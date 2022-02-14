import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// MUI imports
import { AppBar, Box, IconButton, Grid, Toolbar, Typography } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

function BottomNavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  // reducer that stores where a user currently is in the app based on hash in url
  const whereReducer = useSelector((store) => store.whereReducer);

  // UPDATE THIS IF YOU CHANGE YOUR ROUTE NAMES
    // AS WELL AS THE PROPS BEING PASSED ONCLICK FROM THE BUTTONS BELOW
    // AND THE COLOR CONDITIONAL ON THE BUTTONS
  const updateWhereReducer = (prop) => {
    switch (prop) {
      case 'meeting':
        dispatch({ type: 'GET_MEETINGS' });
        dispatch({ type: 'CLEAR_PROFILES' });
        history.push('/meeting');
        break;
      case 'searchProfiles':
        history.push('/searchProfiles');
        break;
      case 'messages':
        dispatch({ type: 'CLEAR_PROFILES' });
        history.push('/messages');
        break;
      case 'user':
        dispatch({ type: 'CLEAR_PROFILES' });
        history.push('/user');
        break;
      default:
        history.push('/');
    }
    dispatch({
      type: 'SET_WHERE',
      payload: prop
    })
  }

  return (
    <div className="navBar">
      <Toolbar sx={{ height: '9vh' }} />
      <AppBar
        position="fixed"
        color="info"
        sx={{
          top: 'auto',
          bottom: 0,
          height: '9%',
          minHeight: '66px'
        }}
      >
        <Box sx={{ flexGrow: 1 }} >
          <Grid
            container
            spacing={1}
            sx={{
              margin: 'auto',
              paddingLeft: '10px'
            }}
          >
            <Grid item xs={3}>
              <IconButton
                onClick={() => updateWhereReducer('meeting')}
                size="large"
                sx={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  display: 'block'
                }}
                // checks if the string from the reducer has any / in it, if it does that means it has params
                // if it has params it will slice the word starting at the index of 0 to the index of / - 1
                // will turn meeting/17 into meeting and then render colors based on that
                color={
                  whereReducer.includes('/') ?
                    whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'meeting' ? 'secondary' : 'inherit'
                    :
                    whereReducer === 'meeting' ? 'secondary' : 'inherit'
                }
              >
                <CalendarTodayOutlinedIcon fontSize="large" />
              </IconButton>
              <Typography
                fontSize={11}
                color={
                  whereReducer.includes('/') ?
                    whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'meeting' ? 'secondary' : 'inherit'
                    :
                    whereReducer === 'meeting' ? 'secondary' : 'inherit'
                }
                sx={{
                  paddingLeft: '7px'
                }}
              >
                Meetings
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                onClick={() => updateWhereReducer('searchProfiles')}
                size="large"
                sx={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  display: 'block'
                }}
                color={
                  whereReducer.includes('/') ?
                    whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'searchProfiles' ? 'secondary' : 'inherit'
                    :
                    whereReducer === 'searchProfiles' ? 'secondary' : 'inherit'
                }
              >
                <MapOutlinedIcon fontSize="large" />
              </IconButton>
              <Typography
                fontSize={11}
                color={
                  whereReducer.includes('/') ?
                    whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'searchProfiles' ? 'secondary' : 'inherit'
                    :
                    whereReducer === 'searchProfiles' ? 'secondary' : 'inherit'
                }
                sx={{
                  paddingLeft: '12px'
                }}
              >
                Search
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                onClick={() => updateWhereReducer('messages')}
                size="large"
                sx={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  display: 'block'
                }}
                color={
                  whereReducer.includes('/') ?
                    whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'messages' ? 'secondary' : 'inherit'
                    :
                    whereReducer === 'messages' ? 'secondary' : 'inherit'
                }
              >
                <ForumOutlinedIcon fontSize="large" />
              </IconButton>
              <Typography
                fontSize={11}
                sx={{
                  paddingLeft: '4px'
                }}
                color={
                  whereReducer.includes('/') ?
                    whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'messages' ? 'secondary' : 'inherit'
                    :
                    whereReducer === 'messages' ? 'secondary' : 'inherit'
                }
              >
                Messages
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => updateWhereReducer('user')}
                size="large"
                sx={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  display: 'block'
                }}
                color={
                  whereReducer.includes('/') ?
                    whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'user' ? 'secondary' : 'inherit'
                    :
                    whereReducer === 'user' ? 'secondary' : 'inherit'
                }
              >
                <AccountCircleOutlinedIcon fontSize="large" />
              </IconButton>
              <Typography
                fontSize={11}
                sx={{
                  paddingLeft: '13px'
                }}
                color={
                  whereReducer.includes('/') ?
                    whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'user' ? 'secondary' : 'inherit'
                    :
                    whereReducer === 'user' ? 'secondary' : 'inherit'
                }
              >
                Profile
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </AppBar>
    </div>
  );
}

export default BottomNavBar;