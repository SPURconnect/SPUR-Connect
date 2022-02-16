import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import MeetingNavBar from '../MeetingNavBar/MeetingNavBar';

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
    history.push(`/meeting/${params.id}`);
  };

  function handleClearNotes() {
    dispatch({
      type: 'CLEAR_EDIT_NOTES',
    })
  };

  return (
    <div>
      {/* have to give it a prop that matches the logic in the MeetingNavBar component */}
      <MeetingNavBar prop={'notes'} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          paddingTop: '5vh'
        }}
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
          sx={{ mt: 1, width: 250, backgroundColor: 'white' }} //Change width of TextField here.
          inputProps={{
            maxLength: 1000
          }}
          FormHelperTextProps={{ style: { backgroundColor: '#EBEEEE', margin: 0, padding: '5px' }}}
          helperText={notes.notes?.length > 0 ? `${notes.notes?.length}/1000` : '0/1000'}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          onClick={handleClearNotes}
          sx={{ mt: 2, mr: 2 }}
          color='error'
        >
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveNotes}
          sx={{ mt: 2, ml: 10, color: 'white' }}
        >
          Save
        </Button>
      </Box>
    </div>
  )
};

export default MeetingNotes;
