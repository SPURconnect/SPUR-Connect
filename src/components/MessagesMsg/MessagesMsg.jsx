import react from 'react';
import { TableCell, TableRow, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function MessagesMsg({timestamp, message, alignment}) {

  return(
    <Box>
      <TableRow>
        <TableCell
          width="95%"
          align={alignment}
          sx={{}}
        >
          {message}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          width="95%"
          sx={{}}
          align={alignment}
        >
          {timestamp}
        </TableCell>
      </TableRow>
    </Box>
  )
}


          // <ListItemText
            
          //   primary={message}
          //   secondary={timestamp.slice(0, 10)}
          // />