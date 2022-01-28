import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// MUI imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Grid from '@mui/material/Grid';
import { green, grey } from '@mui/material/colors';
// imported styles
import './BottomNavBar.css';
// MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: grey[600],
    },
    secondary: {
      main: green[500],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

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
      case 'addMeeting':
        history.push('/addMeeting');
        break;
      case 'searchProfiles':
        history.push('/searchProfiles');
        break;
      case 'messages':
        history.push('/messages');
        break;
      case 'user':
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
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{
            top: 'auto',
            bottom: 0,
            height: '9%',
          }}
        >
          <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2} style={{ margin: 'auto' }}>
              <Grid item xs={3}>
                <IconButton
                  onClick={() => updateWhereReducer('addMeeting')}
                  size="large"
                  // checks if the string from the reducer has any / in it, if it does that means it has params
                    // if it has params it will slice the word starting at the index of 0 to the index of / - 1
                    // will turn addMeeting/17 into addMeeting and then render colors based on that
                  color={
                    whereReducer.includes('/') ? 
                      whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'addMeeting' ? 'secondary' : 'inherit' 
                      : 
                      whereReducer === 'addMeeting' ? 'secondary' : 'inherit'
                  }
                >
                  <CalendarTodayOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton
                  onClick={() => updateWhereReducer('searchProfiles')}
                  size="large"
                  color={
                    whereReducer.includes('/') ? 
                      whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'searchProfiles' ? 'secondary' : 'inherit' 
                      : 
                      whereReducer === 'searchProfiles' ? 'secondary' : 'inherit'
                  }
                >
                  <MapOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton
                  onClick={() => updateWhereReducer('messages')}
                  size="large"
                  color={
                    whereReducer.includes('/') ? 
                      whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'messages' ? 'secondary' : 'inherit' 
                      : 
                      whereReducer === 'messages' ? 'secondary' : 'inherit'
                  }
                >
                  <ForumOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => updateWhereReducer('user')}
                  size="large"
                  color={
                    whereReducer.includes('/') ? 
                      whereReducer.slice(0, whereReducer.indexOf('/', - 1)) == 'user' ? 'secondary' : 'inherit' 
                      : 
                      whereReducer === 'user' ? 'secondary' : 'inherit'
                  }
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default BottomNavBar;