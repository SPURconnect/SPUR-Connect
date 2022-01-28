import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Box, Button, TextField, Typography} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';


function AddMeeting(){

  const history = useHistory();
  const dispatch = useDispatch();
  const [meetingTitle, setMeetingTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date('2014-08-18T21:11:54'));

  function handleSetMeetingTitle(event){
    setMeetingTitle(event.target.value);
  };

  function handleSetLocation(event){
    setLocation(event.target.value);
  };

  function handleSetDate(newValue){
    console.log(newValue);
    setDate(newValue);
  };

  function goToProfile(){
    //history.push(`/profiles/${params.id}`);
  };

  function addMeeting(){
      console.log(meetingTitle, location, date)
      dispatch({
        type: 'ADD_MEETING',
        payload: {meetingTitle: meetingTitle, location: location, date: date, participant: '5'}//Useparams for Participant
      });
      setMeetingTitle('');
      setLocation('');
  }

  return(
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        sx={{mt: 3}}
      >
        <Typography
          variant="h3"
          component="div"
        >
          Schedule a Meeting
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{mt: 3}}
      >
        <TextField
          placeholder="Add a Title"
          value={meetingTitle}
          onChange={handleSetMeetingTitle}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{mt: 3}}
      >
        <TextField
          placeholder="Add a Location"
          value={location}
          onChange={handleSetLocation}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{mt: 3}}
      >
          <DateTimePicker
            label="Date&Time of Meeting"
            value={date}
            onChange={handleSetDate}
            renderInput={(params) => <TextField {...params} />}
          />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="0vh"
        sx={{mt: 3}}
      >
        <Button
          variant="contained"
          onClick={addMeeting}
        >
          Schedule
        </Button>
      </Box>
      </LocalizationProvider>
    </div>
  )
};

export default AddMeeting;