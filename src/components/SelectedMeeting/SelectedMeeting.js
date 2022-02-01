import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';


function SelectedMeeting() {

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const selectmeetingsReducer = useSelector(store => store.selectmeetingsReducer);

   useEffect(() => {
    fetchSelectMeeting();
  }, []);


/* const backpage = (e) =>  {
    history.push('/meetinghistory');
  
  }

const edit = (e) =>  {
    history.push('/meetingdetails');
  
  }   */

  function fetchSelectMeeting() {
    dispatch({
      type: 'GET_SELECTED_MEETINGS',
      payload: params.id
    })
  };

  /*const handleNoteChange = (e) => {
    dispatch({
      type: 'EDIT_NOTES',
      payload: e.target.value
    })
  } */

  /* const handleSaveNotes = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_NOTES',
      payload: {
        id: params.id,
        notes: notes.notes
      }
    })
  }; */

 /*  function handleClearNotes(){
    dispatch({
      type: 'CLEAR_EDIT_NOTES',
    })
    //TODO: Save notes after??
  }; */

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
          placeholder='Notes'
          value={selectmeetingsReducer.summary}
          sx={{mt: 1, width: 250,}} //Change width of TextField here.
        />
      </Box>
     
      
    </div>
  )
};

export default SelectedMeeting;