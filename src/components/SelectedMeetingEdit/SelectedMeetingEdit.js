import * as React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, IconButton, InputAdornment, Grid } from '@mui/material';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';



function SelectedMeetingEdit() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const meetings = useSelector(store => store.meetings);
  const meetingDetailsReducer = useSelector(store => store.meetingDetailsReducer);
  const [date, setDate] = useState(new Date()); 



  useEffect(() => {
    dispatch({
      type: 'FETCH_MEETING_DETAILS',
      payload: params.id
    })
  }, [params.id]);

  
  function handleSetDate(newValue){
    let cleanTime = newValue.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
    console.log(newValue);
    console.log(cleanTime);
    setDate(cleanTime);
    
    dispatch({
      type: 'SET_DATE',
      payload: cleanTime
    })


  }; 


  

  const handleMeetupLocation = (e) => {
    dispatch({
      type: 'SET_MEETINGUP_LOCATION',
      payload: e.target.value
    })
  }

   /* const handleDate = (e) => {
    dispatch({
      type: 'SET_DATE',
      payload: e.target.value
    })
   
  }  */

  const handleSummary = (e) => {
    dispatch({
      type: 'SET_SUMMARY',
      payload: e.target.value
    })
  }


    

  const saveMeetingDetails = (e) => {
    e.preventDefault();
      dispatch({
        type: 'SAVE_MEETING_DETAILS',
        payload: {
          meetup_location: meetingDetailsReducer.meetup_location,
          date: meetingDetailsReducer.date,
          summary:meetingDetailsReducer.summary,
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
              mt: 12,
              }}
              >
            <TextField
              label={<span style={{ fontSize: 21 }}>Location</span>}
              value={meetingDetailsReducer.meetup_location || ''}
              onChange={handleMeetupLocation}
              sx={{ mt: 5, width: 250, }} 
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
              renderInput={(params) => <TextField {...params} />}
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
                sx={{ mt: 1, width: '82vw', mt: 4 }}
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
                  backgroundColor: "#0583f2",
                  color: "White",
                  marginRight: "5%",
                }}
                onClick={saveMeetingDetails}
              >
                Update
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#0583f2",
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