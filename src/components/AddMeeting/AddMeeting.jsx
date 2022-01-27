import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Box, Button, TextField} from '@mui/material';

function AddMeeting(){

  const history = useHistory();
  const dispatch = useDispatch();
  const [meetingTitle, setMeetingTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  function handleSetMeetingTitle(event){
    setMeetingTitle(event.target.value);
  };

  function handleSetLocation(event){
    setLocation(event.target.value);
  };

  function goToProfile(){
    //history.push(`/profiles/${params.id}`);
  };

  function addMeeting(){
    if((meetingTitle, location, date) != ''){
      dispatch({
        type: 'ADD_MEETING',
        payload: {meetingTitle: meetingTitle, location: location, date: date}
      });
      setMeetingTitle('');
      setLocation('');
      setDate('');
    }
  }

  return(
    <div>
      <Button
        onClick={goToProfile}
      >
        Back
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        // sx={{mt: 9}}
      >
        <Typography
          variant="h2"
          component="div"
        >
          Schedule a Meeting
        </Typography>
        <TextField
          placeholder="Add a Title"
          value={meetingTitle}
          onChange={handleSetMeetingTitle}
        />
        <TextField
          placeholder="Add a Location"
          value={location}
          onChange={handleSetLocation}
        />
        <Button
          onClick={addMeeting}
        >
          Add
        </Button>
      </Box>
    </div>
  )
};

export default AddMeeting;