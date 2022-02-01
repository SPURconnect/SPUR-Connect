import react, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessagesMsg from '../MessagesMsg/MessagesMsg';
import MessagesConvo from '../MessagesConvo/MessagesConvo';

//MUI
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FaceIcon from '@mui/icons-material/Face';
///// End MUI Stuff


export default function TESTMsgConvo() {
  //alias HOOKs
  const dispatch = useDispatch();
  const history = useHistory();
  //REDUX store
  const conversations = useSelector((store) => store.messagesReducer);
  // const profiles = useSelector((store) => store.profileReducer);


  useEffect(() => {
    dispatch({
      type: "FETCH_MESSAGES"
    })
  }, [])

  return(
    <>
      <List>
        {conversations.map(convo => {
          return <ListItem
                  key={convo.uniqUser}
                  onClick={(e) => {history.push(`/messages/convo/${convo.uniqUser}`)}}
                  secondaryAction={
                  <IconButton edge="end" aria-label="options">
                    <MoreVertIcon />
                  </IconButton>
                }>
              <ListItemAvatar>
                <Avatar>
                  <FaceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={convo.uniqUser}
                secondary={convo.messages[0].content}
              />
            </ListItem>
          })}

      </List>
    </>
  )
}