import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// MUI imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Grid from '@mui/material/Grid';
import { green, grey } from '@mui/material/colors';
import { Typography } from '@mui/material';
// MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: grey[600],
    },
    secondary: {
      main: green[300],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function MeetingNavBar({prop}) {
  const history = useHistory();
  const params = useParams();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{
            bottom: 'auto',
            top: 0,
            height: '9%',
          }}
        >
          <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2} style={{ margin: 'auto' }}>
              <Grid item xs={3}>
                <IconButton
                  onClick={() => history.push('/meeting')}
                  size="large"
                  color='inherit'
                  sx={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    display: 'block'
                  }}
                >
                  <ArrowBackOutlinedIcon />
                </IconButton>
                <Typography
                  fontSize={11}
                  color='inherit'
                  sx={{
                    paddingLeft: '12px'
                  }}
                >
                  Back
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <IconButton
                  onClick={() => history.push(`/meeting/details/${params.id}`)}
                  size="large"
                  color='inherit'
                  sx={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    display: 'block'
                  }}
                  color={
                    prop === 'details' ?
                      'secondary'
                      : 
                      'inherit'
                  }
                >
                  <GridViewOutlinedIcon />
                </IconButton>
                <Typography
                  fontSize={11}
                  color={
                    prop === 'details' ?
                      'secondary'
                      : 
                      'inherit'
                  }
                  sx={{
                    paddingLeft: '7px'
                  }}
                >
                  Details
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <IconButton
                  onClick={() => history.push(`/meeting/notes/${params.id}`)}
                  size="large"
                  sx={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    display: 'block'
                  }}
                  color={
                    prop === 'notes' ?
                      'secondary'
                      : 
                      'inherit'
                  }
                >
                  <TextSnippetOutlinedIcon />
                </IconButton>
                <Typography
                  fontSize={11}
                  color={
                    prop === 'notes' ?
                      'secondary'
                      : 
                      'inherit'
                  }
                  sx={{
                    paddingLeft: '9px'
                  }}
                >
                  Notes
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => history.push(`/meeting/photos/${params.id}`)}
                  size="large"
                  color='inherit'
                  sx={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    display: 'block'
                  }}
                  color={
                    prop === 'photos' ?
                      'secondary'
                      : 
                      'inherit'
                  }
                >
                  <CameraAltOutlinedIcon />
                </IconButton>
                <Typography
                  fontSize={11}
                  color={
                    prop === 'photos' ?
                      'secondary'
                      : 
                      'inherit'
                  }
                  sx={{
                    paddingLeft: '7px'
                  }}
                >
                  Photos
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AppBar>
      </ThemeProvider>
    </div >
  )
}

export default MeetingNavBar;