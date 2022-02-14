import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography, IconButton, InputAdornment, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SelectedMeetingEdit from '../SelectedMeetingEdit/SelectedMeetingEdit';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';
import EventIcon from '@mui/icons-material/Event';



function SelectedMeeting() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const meetings = useSelector(store => store.meetings);
  const singleMeeting = useSelector(store => store.meetingDetailsReducer);

  useEffect(() => {
    dispatch({
      type: 'GET_SINGLE_MEETING',
      payload: params.id
    })
  }, [params.id]);

  const fixedDate = (meeting) => {
    let theDate = meeting?.date;
    let cleanTime = new Date(theDate);
    let bestTime = cleanTime.toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    return bestTime;
  }

  return (

    <div>
      <MeetingNavBar prop={"details"} />
      <Box display="flex"
        justifyContent="center"
        alignItems="center">
          <Typography
            variant="h4"
            component="h4"
            sx={{
              alignItems: "center",
              paddingTop: "10%",
              paddingBottom: "10%",
            }}
            key={singleMeeting.id}
          >
            {singleMeeting.meeting_title}
          </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: "100vw",
        }}
      >
          <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={3}>
              <TextField
                sx={{ mt: 1, width: 250 }}
                label={<span style={{ fontSize: 21 }}>Location</span>}
                value={singleMeeting.meetup_location}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

            <Grid item xs={3}>
            <TextField
              label={<span style={{ fontSize: 21 }}>Time</span>}
              sx={{ mt: 5, width: 250, fontsize: 30}}
              value={fixedDate(singleMeeting)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              variant="standard"
            />
            </Grid>

            <Grid item xs={3}>
            <Typography
              variant="body2"
              sx={{
                display: "inline-block",
                backgroundColor: "#EBEEEE",
                transform: "translate(-120px, 180%)",
                color: "gray",
              }}
            >
              Summary
            </Typography>
            </Grid>

            <Grid item xs={3}>
            <Box
              sx={{
                outline: "rgb(169,169,169) solid 1px",
                minHeight: "15vh",
                width: "82vw",
                borderRadius: "5px",
                mt: 5,
                backgroundColor: 'white'
              }}
            >

              <Typography
                variant="body1"
                sx={{
                  padding: "7px 10px 10px 10px",
                  overflow: "auto",
                }}
              >
                {singleMeeting.summary}
              </Typography>
            </Box>
            </Grid>
          </Grid>
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
          sx={{ mt: 4, color: 'white' }}
          variant="contained"
          onClick={() => history.push(`/meeting/edit/${params.id}`)}
        >
          Edit Details
        </Button>
      </Box>
    </div>
  );
};


export default SelectedMeeting;