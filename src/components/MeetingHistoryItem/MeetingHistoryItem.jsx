import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
// MUI imports
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
// MUI dialog imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

  useEffect(() => {
    dispatch({ type: 'GET_MEETINGS' });
    displayProfileImage();
  }, [dispatch]);

  const handleGoToMeetingDetails = () => {
    history.push(`/meeting/${item.id}`);
  }

  const displayProfileImage = () => {
    for (let profile of allProfiles) {
      if (profile.user_id === item.participant_id) {
        setCurrentProfile(profile);
      }
    }
  }

  const handleDeleteMeeting = () => {
    dispatch({
      type: 'DELETE_MEETING',
      payload: item
    })
    toast.success(`${item.meeting_title} deleted!`)
  }


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
            >
            </Avatar>
          }
          title={item.meeting_title}
          subheader={item.date}
        />
        <CardActions
          disableSpacing
          onClick={handleExpandClick}
        >
          <ExpandMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ padding: '0px' }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography>{item.summary}</Typography><br />
            <Button
              variant='contained'
              size='small'
              aria-label='go to meeting details'
              onClick={() => handleGoToMeetingDetails()}
            >
              Details
            </Button>
            <IconButton
              color='error'
              aria-label='delete'
              sx={{ float: 'right' }}
              onClick={handleClickOpen}
            >
              <DeleteIcon />
            </IconButton>
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
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleDeleteMeeting()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MeetingHistoryItem;