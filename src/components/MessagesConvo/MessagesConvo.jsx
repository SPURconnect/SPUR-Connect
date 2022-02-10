import react, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessagesMsg from '../MessagesMsg/MessagesMsg';


import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import { TableContainer, Table, TableBody, Grid, TextField, Button, Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function MessagesConvo() {
  //alias HOOKs
  const dispatch = useDispatch();
  const history = useHistory();
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
      recipient_id: convoWithUserID.id
      // sender_id: req.user.id on serverside
    }
    dispatch({
      type: "POST_MESSAGE",
      payload: outboundMessage
    })
    setMessage('');
  };

  return (
    <>
      <Button
        onClick={() => history.push('/messages')}
      // color='secondary'
      >
        <ArrowBackOutlinedIcon sx={{ padding: '10px' }} /> Back
      </Button>

      {userConvo.length > 0 ?
        <Grid container maxHeight="88%">
        {/*  */}
        <Grid item xs={.5} />

        <Grid item xs={11}>
          <TableContainer
            width="95%"
            sx={{
              paddingBottom: "20%"
            }}
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
        </Grid>

        <Grid item xs={.5} />
        {/*  */}
      </Grid>
      :
      <Typography
        sx={{ padding: '30vh 20vw', opacity: '60%' }}
      >
        There is no conversation to display. Start one below!
      </Typography>
      }

      <Box
        position="fixed"
        sx={{
          top: 'auto',
          bottom: '9%',
          width: '100%',
          display: 'inline-block',
          backgroundColor: '#ebeeee',
          paddingBottom: '2%'
        }}
      >
        <TextField
          sx={{ width: '75%', marginLeft: '4%', backgroundColor: 'white' }}
          multiline
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            color: 'white',
            margin: '9px 6px'
          }}
          onClick={handleSendMessage}
        > <SendIcon />
        </Button>
      </Box>
    </>
  )
}