import * as React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, TextField, InputAdornment, Grid } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';

function SelectedMeetingEdit() {
  // hooks being used
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  // reducers being used
  const meetingDetailsReducer = useSelector(store => store.meetingDetailsReducer);
  // pieces of state being used
  const [date, setDate] = useState(new Date()); 

  // gets the meeting details based on params again, also listens to the params
    // if it changes will update the info on the page
  useEffect(() => {
    dispatch({
      type: 'FETCH_MEETING_DETAILS',
      payload: params.id
    })
  }, [params.id]);

  // cleans the date being dispatched
    // ex: '12/12/2022 10:54 AM'
    // dispatches the cleaned up date to the meetingDetailsReducer
  function handleSetDate(newValue){
    let cleanTime = newValue.toLocaleTimeString([], 
      {year: 'numeric', 
      month: 'numeric', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'}
    )
    setDate(cleanTime);
    
    dispatch({
      type: 'SET_DATE',
      payload: cleanTime
    })
  }; 

  // dispatches the updated meeting location to the meetingDetailsReducer
  const handleMeetupLocation = (e) => {
    dispatch({
      type: 'SET_MEETINGUP_LOCATION',
      payload: e.target.value
    })
  }

  // dispatches the updated meeting summary to the meetingDetailsReducer
  const handleSummary = (e) => {
    dispatch({
      type: 'SET_SUMMARY',
      payload: e.target.value
    })
  }

  //  dispatches the updated reducer information to the server
  const saveMeetingDetails = () => {
      dispatch({
        type: 'SAVE_MEETING_DETAILS',
        payload: {
          meetup_location: meetingDetailsReducer.meetup_location,
          date: meetingDetailsReducer.date,
          summary: meetingDetailsReducer.summary,
          id: params.id
        }
      })
      history.push(`/meeting/${params.id}`);
    }

  return (
    
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MeetingNavBar prop={"details"} />
        
        <Grid container direction="row" alignItems="center" justifyContent="center">
          
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              maxWidth: "100vw",
              mt: 5,
              }}
              >
            <TextField
              label={<span style={{ fontSize: 21 }}>Location</span>}
              value={meetingDetailsReducer.meetup_location || ''}
              onChange={handleMeetupLocation}
              sx={{ mt: 5, width: 250, backgroundColor: 'white' }} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
            </Box>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              maxWidth: "100vw",
              mt: 5,
              }}
              >
            <DateTimePicker
              label="Time"
              value={meetingDetailsReducer.date}
              onChange={handleSetDate}
              sx={{ mt: 1, width: 250 }}
              renderInput={(params) => <TextField {...params} sx={{backgroundColor: 'white'}} />}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
            />
            </Box>
            
            <Box 
             display="flex"
             justifyContent="center"
             alignItems="center"
             sx={{ mt: 2 }}
             >
              <TextField
                label={
                  <span style={{ fontSize: 21, textAlign: "center" }}>
                    Summary
                  </span>
                }
                multiline={true}
                rows={8}
                placeholder="Notes"
                value={meetingDetailsReducer.summary || ""}
                onChange={handleSummary}
                sx={{ mt: 1, width: '82vw', mt: 4, backgroundColor: 'white' }}
                inputProps={{
                  maxLength: 255
                }}
                FormHelperTextProps={{ style: { backgroundColor: '#EBEEEE', margin: 0, padding: '5px' }}}
                helperText={`${meetingDetailsReducer.summary?.length}/255`}
              />
            </Box>
            </Grid>
            
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                style={{
                  color: "White",
                  marginRight: "5%",
                }}
                onClick={() => saveMeetingDetails()}
              >
                Update
              </Button>
              <Button
                color='error'
                variant="contained"
                style={{
                  color: "White",
                  marginLeft: "5%",
                }}
                onClick={() => history.push(`/meeting/${params.id}`)}
              >
                Cancel
              </Button>
          </Box>
        
      </LocalizationProvider>
    </div>
  );
};



export default SelectedMeetingEdit;