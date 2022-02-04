import { Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import MeetingHistoryItem from '../MeetingHistoryItem/MeetingHistoryItem';

function MeetingHistory() {
  const meetings = useSelector((store) => store.meetings);

  return (
    <div>
        <Box
          sx={{
            position: 'fixed',
            width: '100%',
            height: '7vh',
            backgroundColor: 'grey',
            padding: '9px 0px',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, .3)'
          }}
          zIndex={1500}
        >
          <Typography
            variant='h4'
            sx={{
              textAlign: 'center',
              color: grey[50],
              paddingTop: '9px'
            }}
          >
            Meeting History
          </Typography>
        </Box>
      <Toolbar sx={{ height: '9vh' }} />
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