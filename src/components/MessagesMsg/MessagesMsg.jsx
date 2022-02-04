import react from 'react';
import { TableCell, TableRow, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function MessagesMsg({timestamp, message, alignment}) {

  return(
    <>
      <TableRow
        width="95%"
      >
        <TableCell
          sx={{mx: 0, my: 0, py: 0, px: 0, width: "95%"}}
          align={alignment}
        >
        <List><ListItem>
          <ListItemText
            sx={{mx: 0, my: 0, paddingx: 0, paddingy: 0}}
            align={alignment}
            primary={message}
            secondary={timestamp.slice(0, 10)}
          />
        </ListItem></List>
        </TableCell>
      </TableRow>
     
    </>
  )
}

//        <TableRow
//         width="100%"
//       >
//         <TableCell
//           width="95%"
//           sx={{}}
//           align={alignment}
//         >
//           {timestamp}
//         </TableCell>
//       </TableRow>
          