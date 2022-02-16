import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
// MUI imports
import {
  Button, Card, CardHeader, CardContent, CardActions, Collapse, Avatar, IconButton,
  Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
// MUI expand styler
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function MeetingHistoryItem({ item }) {
  // hooks being used
  const dispatch = useDispatch();
  const history = useHistory();
  // reducer for all the profiles
  const allProfiles = useSelector((store) => store.allProfilesReducer);
  // piece of state for current profile being displayed
  const [currentProfile, setCurrentProfile] = useState('');
  // handles whether the card is expanded or not
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // handles the state of MUI dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // on page load gets all of the meeting history the logged in user has
  useEffect(() => {
    dispatch({ type: 'GET_MEETINGS' });
    displayProfileImage();
  }, [dispatch]);

  // when a meeting is clicked on pushes the user to the meeting details view
  const handleGoToMeetingDetails = () => {
    history.push(`/meeting/${item.id}`);
  }

  // handles the filtering of the profiles reducer to get the profile picture
  const displayProfileImage = () => {
    for (let profile of allProfiles) {
      if (profile.user_id === item.participant_id) {
        setCurrentProfile(profile);
      }
    }
  }

  // sends a dispatch to the server when the meeting is deleted
  const handleDeleteMeeting = () => {
    dispatch({
      type: 'DELETE_MEETING',
      payload: item
    })
    toast.success(`${item.meeting_title} deleted!`)
  }

  // sends the user to the other participants profile when their profile picture is
    // clicked on
  const handleGoToProfile = () => {
    dispatch({
      type: 'SET_WHERE',
      payload: 'searchProfiles'
    });
    history.push(`/searchProfiles/${currentProfile.user_id}`);
  }
 
  // cleans up the time for displaying on the cards
  let cleanTime = new Date(item.date);
  let bestTime = cleanTime.toLocaleTimeString([], 
    {
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    }
  );

  return (
    <div style={{ paddingBottom: '4px' }}>
      <Card sx={{ maxWidth: '100%', boxShadow: 3 }} >
        <CardHeader
          sx={{ paddingBottom: '0px' }}
          onClick={handleExpandClick}
          avatar={
            <Avatar
              sx={{ bgcolor: grey[500], width: '75px', height: '75px' }}
              aria-label="profile image"
              src={currentProfile.photo}
              onClick={handleGoToProfile}
            >
            </Avatar>
          }
          title={item.meeting_title}
          subheader={bestTime}
        />
        <CardActions
          disableSpacing
          onClick={handleExpandClick}
          sx={{
            padding: 0
          }}
        >
          <ExpandMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ padding: '0px 5px' }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ textAlign: 'center', padding: '0px' }}>
            <Typography sx={{ margin: '0px 0px 10px 0px' }}>{item.summary}</Typography>
            <Box sx={{padding: '10px 15px 0px 45px'}}>
              <Button
                variant='contained'
                size='small'
                aria-label='go to meeting details'
                onClick={() => handleGoToMeetingDetails()}
                sx={{
                  color: 'white',
                }}
              >
                Details
              </Button>
              <IconButton
                color='error'
                aria-label='delete'
                sx={{ float: 'right', padding: '0px 15px' }}
                onClick={handleClickOpen}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Meeting?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this meeting?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleDeleteMeeting()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MeetingHistoryItem;