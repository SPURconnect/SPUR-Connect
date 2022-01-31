import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
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

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      // minHeight="15vh"
      >
        <Typography
          variant="subtitle1"
          component="div"
        >
          Notes
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      // minHeight="0vh"
      >
          <TextField
            placeholder='Notes'
            value={notes.notes || ''}
            onChange={handleNoteChange}
            sx={{ mr: 3, width: 250 }}
          />
          <Button
            variant="contained"
            onClick={handleSaveNotes}
          >
            Save
          </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      // minHeight="20vh"
      >
      </Box>
    </div>
  )
};

export default MeetingNotes;