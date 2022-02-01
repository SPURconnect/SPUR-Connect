import react from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function MessagesMsg({timestamp, message}) {

  return(
    <Box>
        <ListItem>
          <ListItemText
            primary={message}
            secondary={timestamp.slice(0, 10)}
          />
        </ListItem>
    </Box>
  )
}