import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
// MUI imports
import { AppBar, Box, IconButton } from '@mui/material';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Grid from '@mui/material/Grid';
import { Toolbar, Typography } from '@mui/material';

function MeetingNavBar({ prop }) {
  // hooks being used
  const history = useHistory();
  const params = useParams();

  // this component works by being imported into the various meeting views, then having 
    // props passed along with it. it will change the icon colors depending on the name
    // of the prop being passed 'details' or 'notes' are examples

  return (
    <div>
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
        <Box sx={{ flexGrow: 1 }} >
          <Grid
            container
            spacing={1}
            style={{
              margin: 'auto',
              paddingLeft: '10px'
            }}
          >
            <Grid item xs={3}>
              <IconButton
                onClick={() => history.push('/meeting')}
                size="large"
                color='inherit'
                sx={{
                  paddingBottom: 0,
                  paddingTop: 0,
                  display: 'block',
                }}
              >
                <ArrowBackOutlinedIcon fontSize="large" />
              </IconButton>
              <Typography
                fontSize={11}
                color='inherit'
                sx={{
                  paddingLeft: '18px'
                }}
              >
                Back
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                onClick={() => history.push(`/meeting/${params.id}`)}
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
                <GridViewOutlinedIcon fontSize="large" />
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
                  paddingLeft: '13px'
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
                <TextSnippetOutlinedIcon fontSize="large" />
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
                  paddingLeft: '14px'
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
                <CameraAltOutlinedIcon fontSize="large" />
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
                  paddingLeft: '12px'
                }}
              >
                Photos
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </AppBar>
      <Toolbar sx={{ height: '10vh' }} />
    </div >
  )
}

export default MeetingNavBar;