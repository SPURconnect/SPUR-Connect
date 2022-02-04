import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {Box, Button, TextField, Typography} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from '@mui/material';

function AddMeeting(){

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const singleProfileReducer = useSelector((store) => store.singleProfileReducer);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date()); 

  useEffect(() => {
    
    dispatch({
      type: 'FETCH_SINGLE_PROFILE',
      payload: params.id
    })
  }, [params.id])

  function handleSetMeetingTitle(event){
    setMeetingTitle(event.target.value);
  };

  function handleSetLocation(event){
    setLocation(event.target.value);
  };
  function handleSummary(event) {
    setSummary(event.target.value);
  };

  function handleSetDate(newValue){
    let cleanTime = newValue.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
    console.log(newValue);
    console.log(cleanTime);
    setDate(cleanTime);
  };

  function goToProfile(){
    history.push(`/searchProfiles/${params.id}`);
  };

  function addMeeting(){
      console.log(meetingTitle, location, date)
      dispatch({
        type: 'ADD_MEETING',
        payload: {meetingTitle: meetingTitle, summary: summary, location: location, date: date, participant: params.id}// 
      });
      setMeetingTitle('');
      setLocation('');
      // goToProfile(); //Will send you back to the profile you came from once params are setup.
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
            variant="h5"
            component="div"
          >
            Schedule a meeting with: 
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // minHeight="0vh"
          sx={{ mt: 3 }}
        >
        <Typography
          variant="h5"
          component="div"
        >
            {singleProfileReducer.first_name} {singleProfileReducer.last_name}
        </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // minHeight="0vh"
          sx={{ mt: 3 }}
        >
          <ListItemAvatar>
            <Avatar 
            sx={{ width: 100, height: 100 }}
            src={singleProfileReducer.photo}/>
          </ListItemAvatar>
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
          sx={{ mt: 3 }}
        >
          <TextField
            placeholder="Add a Summary"
            value={summary}
            onChange={handleSummary}
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