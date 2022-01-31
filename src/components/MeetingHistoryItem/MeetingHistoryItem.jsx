import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

  const participant = useSelector((store) => store.participantMeeting);

  // handles whether the card is expanded or not
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch({ type: 'GET_MEETINGS' });
    getParticipantDetails();
  }, [dispatch]);

  const getParticipantDetails = () => {
    dispatch({
      type: 'GET_PARTICIPANT',
      payload: item.participant_id
    })
  }

  const handleGoToMeetingDetails = () => {
    history.push(`/meeting/notes/${item.id}`);
  }

  const handleDeleteMeeting = () => {

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
              src={item.img}
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
              onClick={() => handleDeleteMeeting()}
            >
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}

export default MeetingHistoryItem;