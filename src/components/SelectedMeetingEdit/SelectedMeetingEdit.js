import * as React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, IconButton } from '@mui/material';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';



function SelectedMeetingEdit() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const meetings = useSelector(store => store.meetings);


  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [summary, setSummary] = useState('');
    
console.log('meeting reducer')
  const editDeatils = (e) => {
   e.preventDefault();
      dispatch({
        type: 'EDIT_MEETING_DETAILS',
        payload: {
          meetup_location: location,
          date: date,
          summary: summary,
          id: params.id,
        }
    
      })
    }


   console.log('reducer data', meetings)

  
  return (

    //map this out, research stack
    <div>
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
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{mt: 1, width: 250,}} //Change width of TextField here.
        />
      </Box>
        
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Meeting Date"
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
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
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
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
               onClick={(e) => { editDeatils(e) }}>Add</Button>        
              
      </Box>
     </div>
     
       


       
       
       
    
    </div>
  )
};

export default SelectedMeetingEdit;