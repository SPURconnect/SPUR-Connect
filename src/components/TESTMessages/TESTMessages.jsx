import react, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import TESTMsgCompon from '../TESTMsgCompon/TESTMsgCompon';

// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import { MessageBox } from 'react-chat-elements';

export default function TESTMessages() {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch({
        type: "FETCH_MESSAGES"
      })
    }, [])


  return(
    <>
    
    <TESTMsgCompon timestamp={timestamp} message={message}/>
    <p>Test messages!</p>
    </>
  )
}