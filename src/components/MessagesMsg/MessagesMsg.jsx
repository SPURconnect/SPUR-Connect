import react from 'react';
import { Box, Typography } from '@mui/material';

export default function MessagesMsg({timestamp, message}) {

  return(
    <Box>
      <p>{message}</p>
      <p>{timestamp}</p>
    </Box>
  )
}