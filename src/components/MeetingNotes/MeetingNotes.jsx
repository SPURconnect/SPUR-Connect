import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';
// MUI imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Grid from '@mui/material/Grid';
import { green, grey } from '@mui/material/colors';
// MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: grey[600],
    },
    secondary: {
      main: green[500],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function MeetingNotes() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const notes = useSelector(store => store.notes);
  const meetings = useSelector(store => store.meetings);

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    dispatch({
      type: 'FETCH_NOTES',
      payload: params.id
    })
  };

  const handleNoteChange = (e) => {
    dispatch({
      type: 'EDIT_NOTES',
      payload: e.target.value
    })
  }

  // sets current meeting for toast notification
  let currentMeeting;
  for (let meeting of meetings) {
    console.log(params.id)
    if (Number(params.id) === meeting.id) {
      currentMeeting = meeting;
    }
  }

  const handleSaveNotes = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_NOTES',
      payload: {
        id: params.id,
        notes: notes.notes !== null ? notes.notes : ''
      }
    })
    toast.success(`${currentMeeting.meeting_title} updated!`)
    history.push(`/meeting/details/${params.id}`);
  };

  function handleClearNotes() {
    dispatch({
      type: 'CLEAR_EDIT_NOTES',
    })
    //TODO: Save notes after??
  };

  return (
    <div>
      {/* have to give it a prop that matches the logic in the MeetingNavBar component */}
      <MeetingNavBar prop={'notes'} />
      <div style={{ marginTop: '12vh' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h6"
            component="h6"
          >
            Notes
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
            placeholder='Notes'
            value={notes.notes || ''}
            onChange={handleNoteChange}
            sx={{ mt: 1, width: 250, }} //Change width of TextField here.
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant=""
            onClick={handleClearNotes}
            sx={{ mt: 2, mr: 2 }}
          >
            Clear
          </Button>
          <Button //TODO: Add sweetalerts or something to notify changes saved.
            variant="contained"
            onClick={handleSaveNotes}
            sx={{ mt: 2, ml: 10 }}
          >
            Save
          </Button>
        </Box>
      </div>
    </div>
  )
};

export default MeetingNotes;