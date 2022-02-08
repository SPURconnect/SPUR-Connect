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
      type: 'GET_SINGLE_MEETING',
      payload: params.id
    })
  }, [params.id]);

   console.log('reducer data', meetings)
/* const backpage = (e) =>  {
    history.push('/meetinghistory');
  }

const edit = (e) =>  {
    history.push('/meetingdetails');
  
  }   */
  const fixedDate = (params) => {
    let theDate = params.date;
    let cleanTime = new Date(theDate);
    let bestTime = cleanTime.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    return bestTime;
  }

  
  return (
    //map this out, research stack
    <div>
      <MeetingNavBar prop={"details"} />
      <Box display="flex" justifyContent="center" alignItems="center">
        {meetings.map((meetings) => (
          <Typography
            variant="h4"
            component="h4"
            sx={{
              alignItems: "center",
              paddingTop: "10%",
              paddingBottom: "10%",
            }}
            key={meetings.id}
          >
            {meetings.meeting_title}
          </Typography>
        ))}
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: "100vw",
        }}
      >
        {meetings.map((meetings) => (
          <Stack key={meetings.id}>
            <TextField
              multiline={true}
              rows={2}
              sx={{ mt: 1, width: 250 }}
              label={<span style={{ fontSize: 25 }}>Location</span>}
              defaultValue={meetings.meetup_location}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <TextField
              label={<span style={{ fontSize: 25 }}>Time</span>}
              sx={{ mt: 5, fontsize: 30 }}
              defaultValue={fixedDate(meetings)}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <Typography variant="h6" component="h6" sx={{ mt: 5 }}>
              Summary
            </Typography>
            <TextField
              multiline={true}
              rows={8}
              sx={{ width: 250, border: 1, padding: "3%" }}
              defaultValue={meetings.summary}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </Stack>
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: "100vw",
        }}
      >
        <Button
          variant="contained"
          onClick={() => history.push(`/meeting/edit/${params.id}`)}
        >
          Update Details
        </Button>
      </Box>
    </div>
  );
};


export default SelectedMeeting;