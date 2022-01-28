import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Box, Button, TextField, Typography} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { ParameterStatusMessage } from 'pg-protocol/dist/messages';


function MeetingNotes(){

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const notes = useSelector(store => store.notes);

  useEffect(() =>{
    fetchNotes();
  }, []);

  function fetchNotes(){
    dispatch({
      type: 'FETCH_NOTES',
      payload: params.id
    })
  };

  return(
    <div>
      
    </div>
  )
};

export default MeetingNotes;