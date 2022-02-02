import react, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessagesMsg from '../MessagesMsg/MessagesMsg';
import MessageSendModal from '../MessageSendModal/MessageSendModal';

import { Box, List } from '@mui/material';

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
    <>
    <List>
      {userConvo[0].messages.map((msg) => {
        return <MessagesMsg key={msg.id} timestamp={msg.timestamp} message={msg.content} />
      })}
    </List>
    
    <MessageSendModal buttonText={"Reply"} sendTo={convoWithUserID}/>

    {/* <Box>
    <input 
      value = {message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button
      onClick={handleSendMessage}>
      Send
    </button>
    </Box> */}
    </>
  )
}