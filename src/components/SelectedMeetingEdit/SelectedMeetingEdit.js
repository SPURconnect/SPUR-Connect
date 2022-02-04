import * as React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, IconButton } from '@mui/material';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';



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


    
console.log('meeting reducer')
  const saveMeetingDeatils = (e) => {
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


   console.log('reducer data', meetings)

  
  return (

    //map this out, research stack
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
       <MeetingNavBar prop={'details'} />
      
      <div style={{marginTop: '86px'}}>
     
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h6"
          component="h6"
        >
          Meeting Details
        </Typography>
        
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >

          <TextField
          multiline={true} //Allows changing height of TextField.
          rows={1} //Change height of TextField here.
          placeholder='Location'
          value={meetingDetailsReducer.meetup_location}
          onChange={handleMeetupLocation}
          sx={{mt: 1, width: 250,}} //Change width of TextField here.
        />
      </Box>
        
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
         <DateTimePicker
              label="Date&Time of Meeting"
              value={meetingDetailsReducer.date}
              onChange={handleSetDate}
              renderInput={(params) => <TextField {...params} />}
            />
     
    </Box>
    
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >

         <TextField
          multiline={true} //Allows changing height of TextField.
          rows={5} //Change height of TextField here.
          placeholder='summary'
          value={meetingDetailsReducer.summary}
          onChange={handleSummary}
          sx={{mt: 1, width: 250,}} //Change width of TextField here.
        /><br></br>

</Box>
       
       <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >


              <Button
               variant="contained"
               style={{ backgroundColor: '#0583f2', color: 'White' }}               
               onClick={saveMeetingDeatils}>Add</Button>        
              
      </Box>
     </div>
     
       


       
     </LocalizationProvider>
       
    
    </div>
  )
};

export default SelectedMeetingEdit;