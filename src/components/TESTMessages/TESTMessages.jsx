import react, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import TESTMsgCompon from '../TESTMsgCompon/TESTMsgCompon';

// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import { MessageBox } from 'react-chat-elements';

export default function TESTMessages() {
  const dispatch = useDispatch();

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
      recipient_id: 4 //TODO: useParams to capture target recipient
      // sender_id: req.user.id on serverside
    }
    dispatch({
      type: "POST_MESSAGE",
      payload: outboundMessage
    })
  };

  return(
    <>
    
    {/* <TESTMsgCompon timestamp={timestamp} message={message}/> */}
    <p>Test messages!</p>
    <input 
      value = {message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button
      onClick={handleSendMessage}>
      Send
    </button>
    </>
  )
}