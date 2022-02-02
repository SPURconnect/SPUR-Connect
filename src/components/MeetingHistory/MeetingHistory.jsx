import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import MeetingHistoryItem from '../MeetingHistoryItem/MeetingHistoryItem';

function MeetingHistory() {
  const meetings = useSelector((store) => store.meetings);

  return (
    <div>
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
    </div>
  )
}

export default MeetingHistory;