import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MeetingHistoryItem from '../MeetingHistoryItem/MeetingHistoryItem';

function MeetingHistory() {
  const meetings = useSelector((store) => store.meetings);
  const dispatch = useDispatch();

  const locationToSend = window.location.hash.replace('#/', '');

  useEffect(() => {
    dispatch({
      type: 'SET_WHERE',
      payload: locationToSend
    })
  }, [dispatch]);

  return (
    <>
      {/* Grid Body Container */}
      <Grid 
        container 
        maxHeight="85%" 
        sx={{
          paddingTop: '2vh'
        }}
      >
        <Grid item xs={.5} />
        <Grid item xs={11}>
          {meetings?.length > 0 ?
            meetings?.map((item) => {
              return (
                <>
                  <MeetingHistoryItem key={item.id} item={item} />
                </>
              )
            })
            :
            <Typography
              sx={{ padding: '30vh 20vw', opacity: '60%' }}
            >
              There are no meetings to display.
            </Typography>
          }
        </Grid>
        <Grid item xs={.5} />
      </Grid>
    </>
  )
}

export default MeetingHistory;