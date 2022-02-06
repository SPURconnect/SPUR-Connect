import react, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessagesMsg from '../MessagesMsg/MessagesMsg';
import MessageSendModal from '../MessageSendModal/MessageSendModal';

import { TableContainer, Table, TableBody, Grid, TextField, Button, Box, List } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function MessagesConvo() {
  //alias HOOKs
  const dispatch = useDispatch();
  const convoWithUserID = useParams();
  //REDUX store
  const userMessages = useSelector((store) => store.messagesReducer);
  //filter for specific messages
  const userConvo = userMessages.filter((convo) => (convo.uniqUser == convoWithUserID.id));

  const [message, setMessage] = useState('');

    useEffect(() => {
      dispatch({
        type: "FETCH_MESSAGES"
      })
    }, [])

  const handleSendMessage = () => {
    let outboundMessage = {
      content: message,
      timestamp: new Date(),
      recipient_id: convoWithUserID
      // sender_id: req.user.id on serverside
    }
    dispatch({
      type: "POST_MESSAGE",
      payload: outboundMessage
    })
    setMessage('');
  };

  return(
    <Grid container maxHeight="88%">
      <Grid item xs={.5}/>
      
      <Grid item xs={11}>
    <Box container flex
      sx={{width: '100%'}}
    >
    {/* conditionally send align prop  */}
    <Box>
    <TableContainer
      width="95%"
    >
    <Table>
      <TableBody>
        {userConvo[0].messages.map((msg) => {
          return msg.sender_id == convoWithUserID.id ?
            <MessagesMsg 
              key={msg.id} 
              timestamp={msg.timestamp} 
              message={msg.content} 
              alignment={'left'}
            />
          :
            <MessagesMsg 
              key={msg.id} 
              timestamp={msg.timestamp} 
              message={msg.content} 
              alignment={'right'}  
            />
        })}
      </TableBody>
    </Table>
    </TableContainer>
    </Box>

    <MessageSendModal buttonText={"Reply"} sendTo={convoWithUserID}/>



    <Box
      display="flex"
      position="fixed" 
      color="primary" 
      sx={{top: 'auto', bottom: '10%'}}
    >
      <Grid container>
        <Grid item xs={11}>
          <TextField
            fullWidth
            value = {message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            onClick={handleSendMessage}
          >  <SendIcon/>
          </Button>
        </Grid>
      </Grid>
      
    </Box>
    </Box>

    </Grid>
      <Grid item xs={.5}/>
    </Grid>
  )
}