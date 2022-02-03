import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { useSelector } from 'react-redux';
import MeetingHistoryItem from '../MeetingHistoryItem/MeetingHistoryItem';

function MeetingHistory() {
  const meetings = useSelector((store) => store.meetings);

  return (
    <div>
      <div 
        style={{
          backgroundColor: 'grey',
          padding: '19px 0px',
          marginBottom: '7px',
          boxShadow: '0px 3px 5px rgba(0, 0, 0, .3)'
        }}
      >
        <Typography
          variant='h4'
          sx={{
            textAlign: 'center',
            color: grey[50]
          }}
        >
          Meeting History
        </Typography>
      </div>
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