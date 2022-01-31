import react, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TESTMsgCompon from '../TESTMsgCompon/TESTMsgCompon';



export default function TESTMessages() {
  //alias HOOKs
  const dispatch = useDispatch();
  //REDUX store
  const userMessages = useSelector((store) => store.messagesReducer);

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
    {userMessages.map((msg) => {
      return <TESTMsgCompon key={msg.id} timestamp={msg.timestamp} message={msg.content} />
    })}
    
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