import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { ListItemAvatar, Avatar } from '@mui/material';

function AddMeeting() {
  // hooks being used in this component
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  // reducers being used in this components
  const singleProfileReducer = useSelector((store) => store.singleProfileReducer);
  // various pieces of state being used in this component
  const [meetingTitle, setMeetingTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());

  // on page load fetches a single profile based on params
    // also listens for if the params changes 
    // fetches single profile again if the params does change
  useEffect(() => {
    dispatch({
      type: 'FETCH_SINGLE_PROFILE',
      payload: params.id
    })
  }, [params.id])

  // next three handle the user input for title, location, and summary
  function handleSetMeetingTitle(event) {
    setMeetingTitle(event.target.value);
  };
  function handleSetLocation(event) {
    setLocation(event.target.value);
  };
  function handleSummary(event) {
    setSummary(event.target.value);
  };

  // changes the input of time to a cleaned up time 
    // displayed as '12/12/2022 10:54 AM'
  function handleSetDate(newValue) {
    let cleanTime = newValue.toLocaleTimeString([],
      {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    )
    setDate(cleanTime);
  };

  // pushes the user to the profile when you click the back button
  function goToProfile() {
    history.push(`/searchProfiles/${params.id}`);
  };

  // when the schedule button is clicked sends a dispatch to add that meeting 
    // to the server as well as clearing the pieces of state, the profiles, and
    // changing the where reducer to meeting after pushing the user to meetings
  function addMeeting() {
    console.log(meetingTitle, location, date)
    dispatch({
      type: 'ADD_MEETING',
      payload: {
        meetingTitle: meetingTitle,
        summary: summary,
        location: location,
        date: date,
        participant: params.id
      }
    });
    setMeetingTitle('');
    setLocation('');
    dispatch({
      type: 'CLEAR_PROFILES'
    });
    dispatch({
      type: 'SET_WHERE',
      payload: 'meeting'
    });
    history.push('/meeting');
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Button
          onClick={goToProfile}
        >
          <ArrowBackOutlinedIcon sx={{ padding: '10px' }} /> Back
        </Button>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3 }}
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
          sx={{ mt: 3 }}
        >
          <ListItemAvatar>
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={singleProfileReducer.photo} />
          </ListItemAvatar>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3 }}
        >
          <TextField
            placeholder="Add a Title"
            value={meetingTitle}
            onChange={handleSetMeetingTitle}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3 }}
        >
          <TextField
            placeholder="Add a Location"
            value={location}
            onChange={handleSetLocation}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3 }}
        >
          <TextField
            placeholder="Add a Summary"
            value={summary}
            onChange={handleSummary}
            sx={{
              backgroundColor: 'white'
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3 }}
        >
          <DateTimePicker
            label="Date&Time of Meeting"
            value={date}
            onChange={handleSetDate}
            renderInput={(params) =>
              <TextField
                {...params}
                sx={{ backgroundColor: 'white' }}
              />}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3 }}
        >
          <Button
            variant="contained"
            onClick={addMeeting}
            sx={{
              color: 'white'
            }}
          >
            Schedule
          </Button>
        </Box>
      </LocalizationProvider>
    </div>
  )
};

export default AddMeeting;