import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';



function SelectedMeetingEdit() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const meetings = useSelector(store => store.meetings);


  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [summary, setSummary] = useState('');
  const [notes, setNotes] = useState('');

  /*  useEffect(() => {
    
    dispatch({      
      type: 'GET_MEETINGS',
      payload: params.id
    })
  }, []); */

  

  const editDeatils = (e) => {
   e.preventDefault();
      dispatch({
        type: 'EDIT_MEETING_DETAILS',
        payload: {
          meetup_location: location,
          date: date,
          summary: summary,
          notes: notes,
          id: params.id,
        }
    
      })
    }


   console.log('reducer data', meetings)

  
  return (

    //map this out, research stack
    <div>
       
     
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h6"
          component="h6"
        >
          Selected Meeting Details
        </Typography>
        
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >

          <TextField
          multiline={true} //Allows changing height of TextField.
          rows={15} //Change height of TextField here.
          placeholder='Location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{mt: 1, width: 250,}} //Change width of TextField here.
        />

<TextField
          multiline={true} //Allows changing height of TextField.
          rows={15} //Change height of TextField here.
          placeholder='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{mt: 1, width: 250,}} //Change width of TextField here.
        /><br></br>


<TextField
          multiline={true} //Allows changing height of TextField.
          rows={15} //Change height of TextField here.
          placeholder='summary'
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          sx={{mt: 1, width: 250,}} //Change width of TextField here.
        /><br></br>
        <TextField
          multiline={true} //Allows changing height of TextField.
          rows={15} //Change height of TextField here.
          placeholder='notes'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{mt: 1, width: 250,}} //Change width of TextField here.
        /><br></br>

              <Button
               variant="contained"
               style={{ backgroundColor: '#A663CC', color: 'White' }}               
               onClick={(e) => { editDeatils(e) }}>Add</Button>        
              
      </Box>
     
      
    </div>
  )
};

export default SelectedMeetingEdit;