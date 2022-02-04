import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SelectedMeetingEdit from '../SelectedMeetingEdit/SelectedMeetingEdit';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';



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

    //map this out, research stack
    <div>
       <MeetingNavBar prop={'details'}/>
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
        <IconButton
        size='large'
        sx={{width: '10%', margin: 'auto', paddingTop: '2vh'}}
        onClick={() => history.push(`/meeting/edit/${params.id}`)}
      >
        <EditIcon 
          fontSize='inherit'
        />
      </IconButton>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: '100vw'
        }}
      >

         
         {
           meetings.map(meetings => 
            (<Stack key={meetings.id}> 
             <h5>Meeting Title</h5>
              <p>{meetings.meeting_title}</p>
              <h5>Meeting Location</h5>
              <p>{meetings.meetup_location}</p> 
              <h5>Schedule</h5>
              <p>{meetings.date}</p> 
              <h5>Summary</h5>
              <p>{meetings.summary}</p>
            

            </Stack>)
           )}
                            
              
      </Box>
    </div>
  )
};

export default SelectedMeeting;