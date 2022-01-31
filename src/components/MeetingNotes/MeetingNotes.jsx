import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';


function MeetingNotes() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const notes = useSelector(store => store.notes);

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

  const handleSaveNotes = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_NOTES',
      payload: {
        id: params.id,
        notes: notes.notes
      }
    })
  };

  function handleClearNotes(){
    dispatch({
      type: 'CLEAR_EDIT_NOTES',
    })
    //TODO: Save notes after??
  };

  return (
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
          sx={{mt: 1, width: 250,}} //Change width of TextField here.
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
          sx={{mt: 2, mr: 2}}
        >
          Clear
        </Button>
        <Button //TODO: Add sweetalerts or something to notify changes saved.
          variant="contained"
          onClick={handleSaveNotes}
          sx={{mt: 2, ml: 10}}
        >
          Save
        </Button>
      </Box>
    </div>
  )
};

export default MeetingNotes;