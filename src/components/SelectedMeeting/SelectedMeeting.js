import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';


function SelectedMeeting() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const meetings = useSelector(store => store.meetings);

   useEffect(() => {
    
    dispatch({      
      type: 'GET_MEETINGS',
      payload: params.id
    })
  }, []);

   console.log('reducer data', meetings)
/* const backpage = (e) =>  {
    history.push('/meetinghistory');
  
  }

const edit = (e) =>  {
    history.push('/meetingdetails');
  
  }   */


  
  return (

    //map this out
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
          {meetings.map(meetings => 
           
           (<TextField key={meetings.id} value={meetings.meeting_title}></TextField>)
           
          )}

          {meetings.map(meetings => 
           
           (<TextField key={meetings.id} value={meetings.meetup_location} sx={{mt: 1, width: 350,}} multiline={true} //Allows changing height of TextField.
            rows={1}> //Chang>Location</TextField>)
           
          )}

          {meetings.map(meetings => 
           
           (<TextField key={meetings.id} value={meetings.date} sx={{mt: 1, width: 250,}}></TextField>)
           
          )}
        {meetings.map(meetings => 
           
           (<TextField key={meetings.id} value={meetings.summary} sx={{mt: 1, width: 250,}}></TextField>)
           
          )}<br></br>

          
           
              
      </Box>
     
      
    </div>
  )
};

export default SelectedMeeting;