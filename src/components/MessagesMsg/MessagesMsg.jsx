import { TableCell, TableRow, List, ListItem, ListItemText } from '@mui/material';

// component that is imported and given props on how to display it, if its from the sender
  // it will look different than if its from the receiver
export default function MessagesMsg({ timestamp, message, alignment, user }) {

  return (
    <>
      {user === 'receiver' ?
        <TableRow
          width="95%"
        >
          <TableCell
            sx={{ mx: 0, my: 0, py: 0, px: 0, width: "95%" }}
            align={alignment}
          >
            <List><ListItem>
              <ListItemText
                sx={{
                  mx: 0,
                  my: 0,
                  paddingx: 0,
                  paddingy: 0,
                  marginLeft: '15%',
                  border: '2px solid rgb(133,162,179)',
                  backgroundColor: 'rgb(184,199,209, 0.5)',
                  borderRadius: '15px',
                  padding: "10px",
                }}
                align={alignment}
                primary={message}
                secondary={timestamp.slice(0, 10)}
              />
            </ListItem></List>
          </TableCell>
        </TableRow>
        :
        <TableRow
          width="95%"
        >
          <TableCell
            sx={{ mx: 0, my: 0, py: 0, px: 0, width: "95%" }}
            align={alignment}
          >
            <List><ListItem sx={{ width: '80%' }}>
              <ListItemText
                sx={{
                  mx: 0,
                  my: 0,
                  paddingx: 0,
                  paddingy: 0,
                  border: '2px solid rgb(242,97,66)',
                  backgroundColor: 'rgb(242,97,66, 0.25)',
                  borderRadius: '15px',
                  padding: "10px",
                  width: '75%'
                }}
                align={alignment}
                primary={message}
                secondary={timestamp.slice(0, 10)}
              />
            </ListItem></List>
          </TableCell>
        </TableRow>
      }
    </>
  )
}

