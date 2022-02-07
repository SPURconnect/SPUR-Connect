import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SelectedMeetingEdit from '../SelectedMeetingEdit/SelectedMeetingEdit';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';
import { ListItemAvatar, Avatar } from '@mui/material';


function SelectedMeeting() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const meetings = useSelector(store => store.meetings);
  const singleProfileReducer = useSelector((store) => store.singleProfileReducer);

   useEffect(() => {
    
    dispatch({      
      type: 'GET_SINGLE_MEETING',
      payload: params.id
    }),
    dispatch({      
      type: 'FETCH_SINGLE_PROFILE',
      payload: meetings[0].participant_id
    })

  }, [params.id, meetings[0].participant_id]);

   console.log('reducer data', meetings)
/* const backpage = (e) =>  {
    history.push('/meetinghistory');
  
  }

const edit = (e) =>  {
    history.push('/meetingdetails');
  
  }   */
  const fixTheTime = (param) => {
    let theDate = param.date;
    let cleanTime = new Date(param.date);
    let bestTime = cleanTime.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    return bestTime;
  }

  
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
              <h5>You're meeting with:</h5>
              <p>{singleProfileReducer.first_name + ' ' + singleProfileReducer.last_name}</p>
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
                    src={singleProfileReducer.photo} />
                </ListItemAvatar>
              </Box>
              <h5>Meeting Location</h5>
              <p>{meetings.meetup_location}</p> 
              <h5>Schedule</h5>
              <p>{fixTheTime(meetings.date)}</p> 
              <h5>Summary</h5>
              <p>{meetings.summary}</p>
            </Stack>)
            )}
      </Box>
    </div>
  )
};

export default SelectedMeeting;